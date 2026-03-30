import { Router } from "express";

import {
  deleteResume,
  getResumeViewUrl,
  listResumes,
  renameResume,
  uploadResume,
} from "../controllers/resume.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { uploadResumeFile } from "../middlewares/upload.middleware.js";
import { validateBody, validateParams } from "../middlewares/validate.middleware.js";
import { renameResumeValidation, resumeIdParamsValidation } from "../validators/resume.validator.js";

const router = Router();

router.get("/", verifyJWT, listResumes);
router.post("/upload", verifyJWT, uploadResumeFile.single("file"), uploadResume);
router.patch(
  "/:resumeId",
  verifyJWT,
  validateParams(resumeIdParamsValidation),
  validateBody(renameResumeValidation),
  renameResume,
);
router.delete("/:resumeId", verifyJWT, validateParams(resumeIdParamsValidation), deleteResume);
router.get("/:resumeId/view-url", verifyJWT, validateParams(resumeIdParamsValidation), getResumeViewUrl);

export default router;
