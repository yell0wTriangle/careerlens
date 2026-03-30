import type { Request, Response } from "express";

import {
  createOnboardingService,
  getOnboardingService,
  updateOnboardingService,
} from "../services/onboarding.service.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import asyncHandler from "../utils/async-handler.js";
import { getOnboardingCacheKey } from "../services/cache-keys.service.js";
import { deleteCacheValues, getCacheValue, setCacheValue } from "../services/kv-store.service.js";

const ensureAuthenticatedUserId = (req: Request): string => {
  if (!req.user?._id) {
    throw new ApiError(401, "Unauthorized request.");
  }

  return req.user._id.toString();
};

const createOnboarding = asyncHandler(async (req: Request, res: Response) => {
  const userId = ensureAuthenticatedUserId(req);
  const onboarding = await createOnboardingService(userId, req.body);
  await deleteCacheValues(getOnboardingCacheKey(userId));

  return res.status(201).json(new ApiResponse(201, onboarding, "Onboarding created successfully."));
});

const getOnboarding = asyncHandler(async (req: Request, res: Response) => {
  const userId = ensureAuthenticatedUserId(req);
  const cacheKey = getOnboardingCacheKey(userId);
  const cached = await getCacheValue(cacheKey);

  if (cached) {
    return res.status(200).json(JSON.parse(cached));
  }

  const onboarding = await getOnboardingService(userId);
  const response = new ApiResponse(200, onboarding, "Onboarding fetched successfully.");
  await setCacheValue(cacheKey, JSON.stringify(response), 120);

  return res.status(200).json(response);
});

const updateOnboarding = asyncHandler(async (req: Request, res: Response) => {
  const userId = ensureAuthenticatedUserId(req);
  const onboarding = await updateOnboardingService(userId, req.body);
  await deleteCacheValues(getOnboardingCacheKey(userId));

  return res.status(200).json(new ApiResponse(200, onboarding, "Onboarding updated successfully."));
});

export { createOnboarding, getOnboarding, updateOnboarding };
