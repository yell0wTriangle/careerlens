import mongoose, { Schema, type InferSchemaType, model } from "mongoose";

const experienceItemSchema = new Schema(
  {
    name: { type: String, default: "", trim: true },
    position: { type: String, default: "", trim: true },
    url: { type: String, default: "", trim: true },
    startDate: { type: String, default: "", trim: true },
    endDate: { type: String, default: "", trim: true },
    summary: { type: String, default: "", trim: true },
    highlights: { type: [String], default: [] },
  },
  { _id: false },
);

const projectItemSchema = new Schema(
  {
    name: { type: String, default: "", trim: true },
    url: { type: String, default: "", trim: true },
    startDate: { type: String, default: "", trim: true },
    endDate: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true },
    highlights: { type: [String], default: [] },
  },
  { _id: false },
);

const certificateItemSchema = new Schema(
  {
    name: { type: String, default: "", trim: true },
    issuer: { type: String, default: "", trim: true },
    date: { type: String, default: "", trim: true },
    url: { type: String, default: "", trim: true },
  },
  { _id: false },
);

const onboardingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    avatar: {
      type: String,
      default: "",
      trim: true,
    },
    name: {
      type: String,
      default: "",
      trim: true,
    },
    location: {
      type: String,
      default: "",
      trim: true,
    },
    relocate: {
      type: String,
      default: "No",
      trim: true,
    },
    relocationDestinations: {
      type: [String],
      default: [],
    },
    workPreference: {
      type: String,
      default: "Hybrid",
      trim: true,
    },
    visaSponsorship: {
      type: String,
      default: "No",
      trim: true,
    },
    expectedSalary: {
      type: String,
      default: "",
      trim: true,
    },
    noticePeriod: {
      type: String,
      default: "",
      trim: true,
    },
    yearsOfExperience: {
      type: Number,
      default: 0,
      min: 0,
    },
    educationLevel: {
      type: String,
      default: "",
      trim: true,
    },
    languages: {
      type: [String],
      default: [],
    },
    github: {
      type: String,
      default: "",
      trim: true,
    },
    portfolio: {
      type: String,
      default: "",
      trim: true,
    },
    linkedin: {
      type: String,
      default: "",
      trim: true,
    },
    targetRoles: {
      type: [String],
      default: [],
    },
    techSkills: {
      type: [String],
      default: [],
    },
    softSkills: {
      type: [String],
      default: [],
    },
    techDomain: {
      type: String,
      default: "",
      trim: true,
    },
    improvementArea: {
      type: String,
      default: "",
      trim: true,
    },
    companySize: {
      type: String,
      default: "Any",
      trim: true,
    },
    work: {
      type: [experienceItemSchema],
      default: [],
    },
    projects: {
      type: [projectItemSchema],
      default: [],
    },
    certificates: {
      type: [certificateItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

type OnboardingSchemaType = InferSchemaType<typeof onboardingSchema>;
type IOnboarding = OnboardingSchemaType & { _id: mongoose.Types.ObjectId };

const Onboarding = model<IOnboarding>("Onboarding", onboardingSchema);

export type { IOnboarding };
export default Onboarding;
