import { z } from "zod";

const complexExperienceItemSchema = z.object({
  name: z.string().trim().optional(),
  position: z.string().trim().optional(),
  url: z.string().trim().optional(),
  startDate: z.string().trim().optional(),
  endDate: z.string().trim().optional(),
  summary: z.string().trim().optional(),
  highlights: z.array(z.string().trim()).optional(),
});

const complexProjectItemSchema = z.object({
  name: z.string().trim().optional(),
  url: z.string().trim().optional(),
  startDate: z.string().trim().optional(),
  endDate: z.string().trim().optional(),
  description: z.string().trim().optional(),
  highlights: z.array(z.string().trim()).optional(),
});

const complexCertificateItemSchema = z.object({
  name: z.string().trim().optional(),
  issuer: z.string().trim().optional(),
  date: z.string().trim().optional(),
  url: z.string().trim().optional(),
});

const onboardingPayloadSchema = z.object({
  avatar: z.string().nullable().optional(),
  name: z.string().trim().optional(),
  location: z.string().trim().optional(),
  relocate: z.string().trim().optional(),
  relocationDestinations: z.array(z.string().trim()).optional(),
  workPreference: z.string().trim().optional(),
  visaSponsorship: z.string().trim().optional(),
  expectedSalary: z.string().trim().optional(),
  noticePeriod: z.string().trim().optional(),
  yearsOfExperience: z.number().min(0).max(60).optional(),
  educationLevel: z.string().trim().optional(),
  languages: z.array(z.string().trim()).optional(),
  github: z.string().trim().optional(),
  portfolio: z.string().trim().optional(),
  linkedin: z.string().trim().optional(),
  targetRoles: z.array(z.string().trim()).optional(),
  techSkills: z.array(z.string().trim()).optional(),
  softSkills: z.array(z.string().trim()).optional(),
  techDomain: z.string().trim().optional(),
  improvementArea: z.string().trim().optional(),
  companySize: z.string().trim().optional(),
  work: z.array(complexExperienceItemSchema).optional(),
  projects: z.array(complexProjectItemSchema).optional(),
  certificates: z.array(complexCertificateItemSchema).optional(),
});

const createOnboardingValidation = onboardingPayloadSchema;
const updateOnboardingValidation = onboardingPayloadSchema;

export { createOnboardingValidation, updateOnboardingValidation };
