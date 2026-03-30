import Resume from "../models/resume.model.js";

const createResume = (payload: {
  user: string;
  storagePath: string;
  originalName: string;
  displayName: string;
  mimeType: string;
  sizeBytes: number;
}) => {
  return Resume.create(payload);
};

const findResumesByUserId = (userId: string) => {
  return Resume.find({ user: userId }).sort({ createdAt: -1 });
};

const findResumeByIdAndUserId = (resumeId: string, userId: string) => {
  return Resume.findOne({ _id: resumeId, user: userId });
};

const updateResumeDisplayNameByIdAndUserId = (resumeId: string, userId: string, displayName: string) => {
  return Resume.findOneAndUpdate(
    { _id: resumeId, user: userId },
    { $set: { displayName } },
    { new: true },
  );
};

const deleteResumeByIdAndUserId = (resumeId: string, userId: string) => {
  return Resume.findOneAndDelete({ _id: resumeId, user: userId });
};

export {
  createResume,
  deleteResumeByIdAndUserId,
  findResumeByIdAndUserId,
  findResumesByUserId,
  updateResumeDisplayNameByIdAndUserId,
};
