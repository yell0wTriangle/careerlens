import type { CookieOptions } from "express";
import crypto from "node:crypto";
import jwt, { type JwtPayload } from "jsonwebtoken";

import type { UserDocument } from "../models/user.model.js";
import {
  clearRefreshTokenByUserId,
  createUser,
  findSafeUserFromDocument,
  findUserByEmail,
  findUserById,
  findUserByIdSafe,
  setRefreshToken,
  updateUserPreferencesById,
} from "../repositories/index.js";
import ApiError from "../utils/api-error.js";
import env from "../config/env.js";
import { sendVerificationEmail } from "./email.service.js";
import {
  getCurrentUserCacheKey,
  getResendCooldownKey,
  getRevokedAccessTokenKey,
  getVerifyAttemptsKey,
} from "./cache-keys.service.js";
import {
  deleteCacheValues,
  getCacheValue,
  getTtlSeconds,
  incrementWithWindow,
  setCacheValue,
  setIfAbsentWithTtl,
} from "./kv-store.service.js";

interface RefreshTokenPayload extends JwtPayload {
  _id: string;
}

interface AccessTokenPayload extends JwtPayload {
  _id: string;
  jti?: string;
}

const accessTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 15 * 60 * 1000,
};

const refreshTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const buildEmailVerificationToken = () => {
  const token = crypto.randomInt(100000, 1000000).toString();
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  return { token, tokenHash };
};

const getVerificationExpiryDate = () => {
  const ttlMinutes = Number(env.EMAIL_VERIFICATION_TOKEN_TTL_MINUTES || 15);
  return new Date(Date.now() + ttlMinutes * 60 * 1000);
};

const invalidateUserReadCache = async (userId: string) => {
  await deleteCacheValues(getCurrentUserCacheKey(userId));
};

const generateAccessAndRefreshTokens = async (userId: string) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  await setRefreshToken(user, refreshToken);

  return { accessToken, refreshToken };
};

const registerUserService = async (payload: { username: string; email: string; password: string }) => {
  const normalizedEmail = payload.email.trim().toLowerCase();
  const existingUser = await findUserByEmail(normalizedEmail);

  if (existingUser) {
    throw new ApiError(409, "User with this email already exists.");
  }

  const { token, tokenHash } = buildEmailVerificationToken();

  const user = await createUser({
    username: payload.username.trim(),
    email: normalizedEmail,
    password: payload.password,
  });

  user.emailVerificationTokenHash = tokenHash;
  user.emailVerificationExpiresAt = getVerificationExpiryDate();
  user.emailVerified = false;
  await user.save({ validateBeforeSave: false });

  await sendVerificationEmail({
    to: normalizedEmail,
    username: payload.username.trim(),
    code: token,
    expiresInMinutes: env.EMAIL_VERIFICATION_TOKEN_TTL_MINUTES,
  });
  await setIfAbsentWithTtl(
    getResendCooldownKey(normalizedEmail),
    "1",
    Math.min(60, env.EMAIL_VERIFICATION_TOKEN_TTL_MINUTES * 60),
  );

  const createdUser = await findUserByIdSafe(user._id.toString());

  if (!createdUser) {
    throw new ApiError(500, "Failed to create user.");
  }

  return {
    user: createdUser,
    verificationRequired: true,
  };
};

const loginUserService = async (payload: { email: string; password: string }) => {
  const normalizedEmail = payload.email.trim().toLowerCase();
  const user = (await findUserByEmail(normalizedEmail)) as UserDocument | null;

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  const isPasswordValid = await user.isPasswordCorrect(payload.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials.");
  }

  if (!user.emailVerified) {
    throw new ApiError(403, "Please verify your email before logging in.");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id.toString());
  const loggedInUser = await findSafeUserFromDocument(user);

  return { accessToken, refreshToken, loggedInUser };
};

const refreshAccessTokenService = async (incomingRefreshToken?: string) => {
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Refresh token is required.");
  }

  let decodedToken: RefreshTokenPayload;

  try {
    decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
    ) as RefreshTokenPayload;
  } catch {
    throw new ApiError(401, "Invalid or expired refresh token.");
  }

  const user = (await findUserById(decodedToken._id)) as UserDocument | null;

  if (!user || !user.refreshToken) {
    throw new ApiError(401, "Invalid refresh token.");
  }

  if (user.refreshToken !== incomingRefreshToken) {
    throw new ApiError(401, "Refresh token does not match.");
  }

  return generateAccessAndRefreshTokens(user._id.toString());
};

const logoutUserService = async (userId?: string) => {
  if (!userId) {
    return;
  }

  await clearRefreshTokenByUserId(userId);
  await invalidateUserReadCache(userId);
};

const revokeAccessTokenService = async (accessToken?: string) => {
  if (!accessToken) {
    return;
  }

  let decodedToken: AccessTokenPayload;

  try {
    decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as AccessTokenPayload;
  } catch {
    return;
  }

  const tokenId = decodedToken.jti;
  const expiresAtUnix = decodedToken.exp;

  if (!tokenId || !expiresAtUnix) {
    return;
  }

  const ttlSeconds = Math.max(1, expiresAtUnix - Math.floor(Date.now() / 1000));
  await setCacheValue(getRevokedAccessTokenKey(tokenId), "1", ttlSeconds);
};

const isAccessTokenRevokedService = async (jti?: string): Promise<boolean> => {
  if (!jti) {
    return false;
  }

  const value = await getCacheValue(getRevokedAccessTokenKey(jti));
  return value !== null;
};

const verifyEmailService = async (payload: { email: string; token: string }) => {
  const normalizedEmail = payload.email.trim().toLowerCase();
  const verifyAttemptsKey = getVerifyAttemptsKey(normalizedEmail);
  const verifyAttempts = await incrementWithWindow(
    verifyAttemptsKey,
    env.EMAIL_VERIFICATION_TOKEN_TTL_MINUTES * 60,
  );

  if (verifyAttempts > 5) {
    const retryAfterSeconds = await getTtlSeconds(verifyAttemptsKey);
    throw new ApiError(429, "Too many verification attempts. Try again shortly.", {
      retryAfterSeconds,
    });
  }

  const submittedTokenHash = crypto.createHash("sha256").update(payload.token.trim()).digest("hex");
  const user = (await findUserByEmail(normalizedEmail)) as UserDocument | null;

  if (!user) {
    throw new ApiError(400, "Invalid verification request.");
  }

  if (user.emailVerified) {
    return { alreadyVerified: true };
  }

  const verificationExpiresAt = user.emailVerificationExpiresAt?.getTime() ?? 0;
  const isTokenValid =
    Boolean(user.emailVerificationTokenHash) &&
    user.emailVerificationTokenHash === submittedTokenHash &&
    verificationExpiresAt > Date.now();

  if (!isTokenValid) {
    throw new ApiError(400, "Invalid or expired verification code.");
  }

  user.emailVerified = true;
  user.emailVerificationTokenHash = null;
  user.emailVerificationExpiresAt = null;
  await user.save({ validateBeforeSave: false });
  await deleteCacheValues(verifyAttemptsKey);

  return { verified: true };
};

const resendVerificationService = async (payload: { email: string }) => {
  const normalizedEmail = payload.email.trim().toLowerCase();
  const resendCooldownKey = getResendCooldownKey(normalizedEmail);
  const canResend = await setIfAbsentWithTtl(resendCooldownKey, "1", 60);

  if (!canResend) {
    const retryAfterSeconds = await getTtlSeconds(resendCooldownKey);
    throw new ApiError(429, "Please wait before requesting another verification code.", {
      retryAfterSeconds,
    });
  }

  const user = (await findUserByEmail(normalizedEmail)) as UserDocument | null;

  if (!user) {
    await deleteCacheValues(resendCooldownKey);
    throw new ApiError(400, "Invalid request.");
  }

  if (user.emailVerified) {
    await deleteCacheValues(resendCooldownKey);
    throw new ApiError(400, "Email is already verified.");
  }

  const { token, tokenHash } = buildEmailVerificationToken();
  user.emailVerificationTokenHash = tokenHash;
  user.emailVerificationExpiresAt = getVerificationExpiryDate();
  await user.save({ validateBeforeSave: false });

  await sendVerificationEmail({
    to: normalizedEmail,
    username: user.username,
    code: token,
    expiresInMinutes: env.EMAIL_VERIFICATION_TOKEN_TTL_MINUTES,
  });

  return {
    resent: true,
  };
};

const updatePreferencesService = async (
  userId: string,
  payload: { theme?: "light" | "dark" },
) => {
  const updatedUser = await updateUserPreferencesById(userId, payload);

  if (!updatedUser) {
    throw new ApiError(404, "User not found.");
  }

  await invalidateUserReadCache(userId);

  return updatedUser;
};

export {
  accessTokenCookieOptions,
  loginUserService,
  logoutUserService,
  revokeAccessTokenService,
  refreshAccessTokenService,
  refreshTokenCookieOptions,
  resendVerificationService,
  registerUserService,
  updatePreferencesService,
  isAccessTokenRevokedService,
  verifyEmailService,
};
