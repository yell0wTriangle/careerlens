import type { Request, Response } from "express";

import ApiResponse from "../utils/api-response.js";
import asyncHandler from "../utils/async-handler.js";
import {
  accessTokenCookieOptions,
  loginUserService,
  logoutUserService,
  revokeAccessTokenService,
  refreshAccessTokenService,
  refreshTokenCookieOptions,
  resendVerificationService,
  registerUserService,
  updatePreferencesService,
  verifyEmailService,
} from "../services/index.js";
import ApiError from "../utils/api-error.js";
import { getCurrentUserCacheKey } from "../services/cache-keys.service.js";
import { getCacheValue, setCacheValue } from "../services/kv-store.service.js";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body as { username: string; email: string; password: string };
  const result = await registerUserService({ username, email, password });

  return res.status(201).json(new ApiResponse(201, result, "User registered. Verification required."));
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };
  const { accessToken, refreshToken, loggedInUser } = await loginUserService({ email, password });

  return res
    .status(200)
    .cookie("accessToken", accessToken, accessTokenCookieOptions)
    .cookie("refreshToken", refreshToken, refreshTokenCookieOptions)
    .json(new ApiResponse(200, { user: loggedInUser }, "User logged in successfully."));
});

const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id?.toString();

  if (!userId) {
    throw new ApiError(401, "Unauthorized request.");
  }

  const cacheKey = getCurrentUserCacheKey(userId);
  const cached = await getCacheValue(cacheKey);

  if (cached) {
    return res.status(200).json(JSON.parse(cached));
  }

  const response = new ApiResponse(200, req.user, "Current user fetched successfully.");
  await setCacheValue(cacheKey, JSON.stringify(response), 60);
  return res.status(200).json(response);
});

const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
  const incomingRefreshToken = req.cookies?.refreshToken || (req.body as { refreshToken?: string }).refreshToken;
  const { accessToken, refreshToken } = await refreshAccessTokenService(incomingRefreshToken);

  return res
    .status(200)
    .cookie("accessToken", accessToken, accessTokenCookieOptions)
    .cookie("refreshToken", refreshToken, refreshTokenCookieOptions)
    .json(new ApiResponse(200, { accessToken }, "Access token refreshed successfully."));
});

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "").trim();

  await logoutUserService(req.user?._id?.toString());
  await revokeAccessTokenService(accessToken);

  return res
    .status(200)
    .clearCookie("accessToken", accessTokenCookieOptions)
    .clearCookie("refreshToken", refreshTokenCookieOptions)
    .json(new ApiResponse(200, {}, "User logged out successfully."));
});

const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const { email, token } = req.body as { email: string; token: string };
  const result = await verifyEmailService({ email, token });

  return res.status(200).json(new ApiResponse(200, result, "Email verified successfully."));
});

const resendVerification = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body as { email: string };
  const result = await resendVerificationService({ email });

  return res.status(200).json(new ApiResponse(200, result, "Verification code sent."));
});

const updatePreferences = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id?.toString();

  if (!userId) {
    throw new ApiError(401, "Unauthorized request.");
  }

  const { theme } = req.body as { theme: "light" | "dark" };
  const updatedUser = await updatePreferencesService(userId, { theme });

  return res.status(200).json(new ApiResponse(200, updatedUser, "Preferences updated successfully."));
});

export {
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resendVerification,
  updatePreferences,
  verifyEmail,
};
