import { Router } from "express";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  resendVerification,
  registerUser,
  updatePreferences,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createRateLimiter } from "../middlewares/rate-limit.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import {
  loginUserValidation,
  registerUserValidation,
  resendVerificationValidation,
  updatePreferencesValidation,
  verifyEmailValidation,
} from "../validators/auth.validator.js";

const router = Router();

const registerRateLimit = createRateLimiter({
  keyPrefix: "auth-register",
  maxRequests: 3,
  windowSeconds: 60 * 60,
  message: "Too many registration attempts. Please try again later.",
});

const loginRateLimit = createRateLimiter({
  keyPrefix: "auth-login",
  maxRequests: 10,
  windowSeconds: 15 * 60,
  message: "Too many login attempts. Please wait and try again.",
});

const refreshRateLimit = createRateLimiter({
  keyPrefix: "auth-refresh",
  maxRequests: 60,
  windowSeconds: 15 * 60,
  message: "Too many refresh requests. Please try again shortly.",
});

const verifyEmailRateLimit = createRateLimiter({
  keyPrefix: "auth-verify-email",
  maxRequests: 20,
  windowSeconds: 15 * 60,
  message: "Too many verification attempts. Please try again later.",
});

const resendVerificationRateLimit = createRateLimiter({
  keyPrefix: "auth-resend-verification",
  maxRequests: 5,
  windowSeconds: 15 * 60,
  message: "Too many resend requests. Please wait before trying again.",
});

router.post("/register", registerRateLimit, validateBody(registerUserValidation), registerUser);
router.post("/verify-email", verifyEmailRateLimit, validateBody(verifyEmailValidation), verifyEmail);
router.post(
  "/resend-verification",
  resendVerificationRateLimit,
  validateBody(resendVerificationValidation),
  resendVerification,
);
router.post("/login", loginRateLimit, validateBody(loginUserValidation), loginUser);
router.post("/refresh-token", refreshRateLimit, refreshAccessToken);
router.post("/logout", verifyJWT, logoutUser);
router.get("/me", verifyJWT, getCurrentUser);
router.patch("/preferences", verifyJWT, validateBody(updatePreferencesValidation), updatePreferences);

export default router;
