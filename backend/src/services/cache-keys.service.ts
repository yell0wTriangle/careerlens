const ME_CACHE_PREFIX = "cache:me";
const ONBOARDING_CACHE_PREFIX = "cache:onboarding";
const REVOKED_ACCESS_TOKEN_PREFIX = "auth:revoked-access-token";
const VERIFY_ATTEMPTS_PREFIX = "auth:verify-attempts";
const RESEND_COOLDOWN_PREFIX = "auth:resend-cooldown";

const getCurrentUserCacheKey = (userId: string) => `${ME_CACHE_PREFIX}:${userId}`;
const getOnboardingCacheKey = (userId: string) => `${ONBOARDING_CACHE_PREFIX}:${userId}`;
const getRevokedAccessTokenKey = (jti: string) => `${REVOKED_ACCESS_TOKEN_PREFIX}:${jti}`;
const getVerifyAttemptsKey = (email: string) => `${VERIFY_ATTEMPTS_PREFIX}:${email}`;
const getResendCooldownKey = (email: string) => `${RESEND_COOLDOWN_PREFIX}:${email}`;

export {
  getCurrentUserCacheKey,
  getOnboardingCacheKey,
  getResendCooldownKey,
  getRevokedAccessTokenKey,
  getVerifyAttemptsKey,
};
