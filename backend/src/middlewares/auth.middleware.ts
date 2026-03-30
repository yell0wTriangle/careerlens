import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

import User from "../models/user.model.js";
import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/async-handler.js";
import { isAccessTokenRevokedService } from "../services/auth.service.js";

interface AccessTokenPayload extends JwtPayload {
  _id: string;
  email: string;
  jti?: string;
}

const verifyJWT = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  const token =
    req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "").trim();

  if (!token) {
    throw new ApiError(401, "Unauthorized request.");
  }

  let decodedToken: AccessTokenPayload;

  try {
    decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as AccessTokenPayload;
  } catch {
    throw new ApiError(401, "Invalid or expired access token.");
  }

  const isRevoked = await isAccessTokenRevokedService(decodedToken.jti);
  if (isRevoked) {
    throw new ApiError(401, "Access token has been revoked.");
  }

  const user = await User.findById(decodedToken._id).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(401, "Invalid access token.");
  }

  req.user = user;
  next();
});

export { verifyJWT };
