import { Router } from "express";

import {
  createOnboarding,
  getOnboarding,
  updateOnboarding,
} from "../controllers/onboarding.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import {
  createOnboardingValidation,
  updateOnboardingValidation,
} from "../validators/onboarding.validator.js";

const router = Router();

router.post("/", verifyJWT, validateBody(createOnboardingValidation), createOnboarding);
router.get("/", verifyJWT, getOnboarding);
router.put("/", verifyJWT, validateBody(updateOnboardingValidation), updateOnboarding);

export default router;
