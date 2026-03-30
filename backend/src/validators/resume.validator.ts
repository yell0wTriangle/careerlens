import { z } from "zod";

const mongoObjectIdRegex = /^[a-f\d]{24}$/i;

const resumeIdParamsValidation = z.object({
  resumeId: z.string().regex(mongoObjectIdRegex, "Invalid resume id."),
});

const renameResumeValidation = z.object({
  displayName: z.string().trim().min(1, "displayName is required.").max(180, "displayName is too long."),
});

export { renameResumeValidation, resumeIdParamsValidation };
