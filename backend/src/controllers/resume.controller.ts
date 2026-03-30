import type { Request, Response } from "express";

import {
  createResumeViewUrlService,
  deleteResumeService,
  listResumesService,
  renameResumeService,
  uploadResumeService,
} from "../services/resume.service.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import asyncHandler from "../utils/async-handler.js";

const ensureAuthenticatedUserId = (req: Request): string => {
  if (!req.user?._id) {
    throw new ApiError(401, "Unauthorized request.");
  }

  return req.user._id.toString();
};

const serializeResume = (resume: {
  _id: { toString(): string };
  displayName: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  createdAt?: Date;
  updatedAt?: Date;
}) => ({
  id: resume._id.toString(),
  displayName: resume.displayName,
  originalName: resume.originalName,
  mimeType: resume.mimeType,
  sizeBytes: resume.sizeBytes,
  createdAt: resume.createdAt ?? null,
  updatedAt: resume.updatedAt ?? null,
});

const uploadResume = asyncHandler(async (req: Request, res: Response) => {
  const userId = ensureAuthenticatedUserId(req);
  const file = req.file;

  if (!file) {
    throw new ApiError(400, "Resume file is required.");
  }

  const resume = await uploadResumeService(userId, file);

  return res
    .status(201)
    .json(new ApiResponse(201, serializeResume(resume), "Resume uploaded successfully."));
});

const listResumes = asyncHandler(async (req: Request, res: Response) => {
  const userId = ensureAuthenticatedUserId(req);
  const resumes = await listResumesService(userId);

  return res.status(200).json(
    new ApiResponse(
      200,
      resumes.map((resume) => serializeResume(resume)),
      "Resumes fetched successfully.",
    ),
  );
});

const renameResume = asyncHandler(async (req: Request, res: Response) => {
  const userId = ensureAuthenticatedUserId(req);
  const { resumeId } = req.params as { resumeId: string };
  const { displayName } = req.body as { displayName: string };

  const resume = await renameResumeService(userId, resumeId, displayName);

  return res
    .status(200)
    .json(new ApiResponse(200, serializeResume(resume), "Resume renamed successfully."));
});

const deleteResume = asyncHandler(async (req: Request, res: Response) => {
  const userId = ensureAuthenticatedUserId(req);
  const { resumeId } = req.params as { resumeId: string };

  await deleteResumeService(userId, resumeId);

  return res.status(200).json(new ApiResponse(200, {}, "Resume deleted successfully."));
});

const getResumeViewUrl = asyncHandler(async (req: Request, res: Response) => {
  const userId = ensureAuthenticatedUserId(req);
  const { resumeId } = req.params as { resumeId: string };

  const payload = await createResumeViewUrlService(userId, resumeId);

  return res.status(200).json(new ApiResponse(200, payload, "Resume view link created successfully."));
});

export { deleteResume, getResumeViewUrl, listResumes, renameResume, uploadResume };
