import Onboarding from "../models/onboarding.model.js";

const findOnboardingByUserId = (userId: string) => {
  return Onboarding.findOne({ user: userId });
};

const createOnboarding = (payload: Record<string, unknown>) => {
  return Onboarding.create(payload);
};

const updateOnboardingByUserId = (userId: string, payload: Record<string, unknown>) => {
  return Onboarding.findOneAndUpdate({ user: userId }, payload, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
  });
};

export { createOnboarding, findOnboardingByUserId, updateOnboardingByUserId };
