import mongoose, { Schema, type InferSchemaType, model } from "mongoose";

const resumeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    storagePath: {
      type: String,
      required: true,
      trim: true,
    },
    originalName: {
      type: String,
      required: true,
      trim: true,
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
    mimeType: {
      type: String,
      required: true,
      trim: true,
    },
    sizeBytes: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

resumeSchema.index({ user: 1, createdAt: -1 });

type ResumeSchemaType = InferSchemaType<typeof resumeSchema>;
type IResume = ResumeSchemaType & { _id: mongoose.Types.ObjectId };

const Resume = model<IResume>("Resume", resumeSchema);

export type { IResume };
export default Resume;
