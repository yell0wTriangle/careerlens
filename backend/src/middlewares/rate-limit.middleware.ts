import type { Request } from "express";

import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/async-handler.js";
import { getTtlSeconds, incrementWithWindow } from "../services/kv-store.service.js";

interface RateLimitOptions {
  keyPrefix: string;
  maxRequests: number;
  windowSeconds: number;
  message?: string;
  keyGenerator?: (req: Request) => string;
}

const getRequestIp = (req: Request): string => {
  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string" && xff.trim().length > 0) {
    return xff.split(",")[0].trim();
  }
  return req.ip || "unknown";
};

const createRateLimiter = (options: RateLimitOptions) =>
  asyncHandler(async (req, _res, next) => {
    const subject = options.keyGenerator ? options.keyGenerator(req) : getRequestIp(req);
    const key = `ratelimit:${options.keyPrefix}:${subject}`;

    const currentCount = await incrementWithWindow(key, options.windowSeconds);

    if (currentCount > options.maxRequests) {
      const retryAfterSeconds = await getTtlSeconds(key);
      throw new ApiError(
        429,
        options.message || "Too many requests. Please try again later.",
        retryAfterSeconds > 0 ? { retryAfterSeconds } : undefined,
      );
    }

    next();
  });

export { createRateLimiter };
