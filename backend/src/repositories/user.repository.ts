import type { UserDocument } from "../models/user.model.js";
import User from "../models/user.model.js";

const findUserByEmail = (email: string) => {
  return User.findOne({ email });
};

const createUser = (payload: { username: string; email: string; password: string }) => {
  return User.create(payload);
};

const findUserById = (userId: string) => {
  return User.findById(userId);
};

const findUserByIdSafe = (userId: string) => {
  return User.findById(userId).select("-password -refreshToken -emailVerificationTokenHash -emailVerificationExpiresAt");
};

const findSafeUserFromDocument = (user: UserDocument) => {
  return User.findById(user._id).select("-password -refreshToken -emailVerificationTokenHash -emailVerificationExpiresAt");
};

const setRefreshToken = async (user: UserDocument, refreshToken: string) => {
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
};

const clearRefreshTokenByUserId = async (userId: string) => {
  await User.findByIdAndUpdate(userId, { $unset: { refreshToken: 1 } });
};

const markUserAsOnboarded = async (userId: string) => {
  await User.findByIdAndUpdate(userId, { isOnboarded: true });
};

const updateUserPreferencesById = (userId: string, preferences: { theme?: "light" | "dark" }) => {
  return User.findByIdAndUpdate(
    userId,
    {
      $set: {
        ...(preferences.theme ? { "preferences.theme": preferences.theme } : {}),
      },
    },
    { new: true },
  ).select("-password -refreshToken -emailVerificationTokenHash -emailVerificationExpiresAt");
};

export {
  clearRefreshTokenByUserId,
  createUser,
  findSafeUserFromDocument,
  findUserByEmail,
  findUserById,
  findUserByIdSafe,
  markUserAsOnboarded,
  setRefreshToken,
  updateUserPreferencesById,
};
