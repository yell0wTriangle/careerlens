import { z } from "zod";

const registerUserValidation = z.object({
  username: z.string().trim().min(2).max(50),
  email: z.string().trim().email(),
  password: z.string().min(8).max(128),
});

const loginUserValidation = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

const verifyEmailValidation = z.object({
  email: z.string().trim().email(),
  token: z.string().trim().min(4).max(64),
});

const resendVerificationValidation = z.object({
  email: z.string().trim().email(),
});

const updatePreferencesValidation = z.object({
  theme: z.enum(["light", "dark"]),
});

export {
  loginUserValidation,
  registerUserValidation,
  resendVerificationValidation,
  updatePreferencesValidation,
  verifyEmailValidation,
};
