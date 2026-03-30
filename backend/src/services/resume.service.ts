import path from "node:path";

import env from "../config/env.js";
import supabase from "../config/supabase.js";
import {
  createResume,
  deleteResumeByIdAndUserId,
  findResumeByIdAndUserId,
  findResumesByUserId,
  updateResumeDisplayNameByIdAndUserId,
} from "../repositories/index.js";
import ApiError from "../utils/api-error.js";

const sanitizeFilenameSegment = (filename: string) => {
  return filename.replace(/[^a-zA-Z0-9._-]/g, "_");
};

const getFileExtension = (filename: string) => {
  const extension = path.extname(filename).toLowerCase();
  if (extension === ".pdf" || extension === ".doc" || extension === ".docx") {
    return extension;
  }
  return ".pdf";
};

const buildStoragePath = (userId: string, originalName: string) => {
  const extension = getFileExtension(originalName);
  const baseName = sanitizeFilenameSegment(path.basename(originalName, path.extname(originalName)));
  const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  return `${userId}/${baseName}-${unique}${extension}`;
};

const uploadResumeService = async (userId: string, file: Express.Multer.File) => {
  const storagePath = buildStoragePath(userId, file.originalname);
  const { error } = await supabase.storage
    .from(env.SUPABASE_RESUME_BUCKET)
    .upload(storagePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    throw new ApiError(500, "Failed to upload resume to storage.", error.message);
  }

  return createResume({
    user: userId,
    storagePath,
    originalName: file.originalname,
    displayName: file.originalname,
    mimeType: file.mimetype,
    sizeBytes: file.size,
  });
};

const listResumesService = async (userId: string) => {
  return findResumesByUserId(userId);
};

const renameResumeService = async (userId: string, resumeId: string, displayName: string) => {
  const normalized = displayName.trim();
  const updated = await updateResumeDisplayNameByIdAndUserId(resumeId, userId, normalized);

  if (!updated) {
    throw new ApiError(404, "Resume not found.");
  }

  return updated;
};

const deleteResumeService = async (userId: string, resumeId: string) => {
  const resume = await findResumeByIdAndUserId(resumeId, userId);

  if (!resume) {
    throw new ApiError(404, "Resume not found.");
  }

  const { error } = await supabase.storage
    .from(env.SUPABASE_RESUME_BUCKET)
    .remove([resume.storagePath]);

  if (error) {
    throw new ApiError(500, "Failed to delete resume from storage.", error.message);
  }

  await deleteResumeByIdAndUserId(resumeId, userId);
};

const createResumeViewUrlService = async (userId: string, resumeId: string) => {
  const resume = await findResumeByIdAndUserId(resumeId, userId);

  if (!resume) {
    throw new ApiError(404, "Resume not found.");
  }

  const { data, error } = await supabase.storage
    .from(env.SUPABASE_RESUME_BUCKET)
    .createSignedUrl(resume.storagePath, 60 * 10);

  if (error || !data?.signedUrl) {
    throw new ApiError(500, "Failed to create resume view link.", error?.message);
  }

  return {
    signedUrl: data.signedUrl,
    expiresInSeconds: 60 * 10,
  };
};

export {
  createResumeViewUrlService,
  deleteResumeService,
  listResumesService,
  renameResumeService,
  uploadResumeService,
};
