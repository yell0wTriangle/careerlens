import {
  createOnboarding,
  findOnboardingByUserId,
  markUserAsOnboarded,
  updateOnboardingByUserId,
} from "../repositories/index.js";
import ApiError from "../utils/api-error.js";

interface ComplexExperienceItem {
  name?: string;
  position?: string;
  url?: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
}

interface ComplexProjectItem {
  name?: string;
  url?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  highlights?: string[];
}

interface ComplexCertificateItem {
  name?: string;
  issuer?: string;
  date?: string;
  url?: string;
}

interface OnboardingPayload {
  avatar?: string;
  name?: string;
  location?: string;
  relocate?: string;
  relocationDestinations?: string[];
  workPreference?: string;
  visaSponsorship?: string;
  expectedSalary?: string;
  noticePeriod?: string;
  yearsOfExperience?: number;
  educationLevel?: string;
  languages?: string[];
  github?: string;
  portfolio?: string;
  linkedin?: string;
  targetRoles?: string[];
  techSkills?: string[];
  softSkills?: string[];
  techDomain?: string;
  improvementArea?: string;
  companySize?: string;
  work?: ComplexExperienceItem[];
  projects?: ComplexProjectItem[];
  certificates?: ComplexCertificateItem[];
}

const normalizeString = (value: unknown, fallback = ""): string => {
  return typeof value === "string" ? value.trim() : fallback;
};

const normalizeStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
};

const normalizeExperience = (value: unknown): ComplexExperienceItem[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is ComplexExperienceItem => typeof item === "object" && item !== null)
    .map((item) => ({
      name: normalizeString(item.name),
      position: normalizeString(item.position),
      url: normalizeString(item.url),
      startDate: normalizeString(item.startDate),
      endDate: normalizeString(item.endDate),
      summary: normalizeString(item.summary),
      highlights: normalizeStringArray(item.highlights),
    }))
    .filter((item) => item.name || item.position || item.summary || item.highlights.length > 0);
};

const normalizeProjects = (value: unknown): ComplexProjectItem[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is ComplexProjectItem => typeof item === "object" && item !== null)
    .map((item) => ({
      name: normalizeString(item.name),
      url: normalizeString(item.url),
      startDate: normalizeString(item.startDate),
      endDate: normalizeString(item.endDate),
      description: normalizeString(item.description),
      highlights: normalizeStringArray(item.highlights),
    }))
    .filter((item) => item.name || item.description || item.highlights.length > 0);
};

const normalizeCertificates = (value: unknown): ComplexCertificateItem[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is ComplexCertificateItem => typeof item === "object" && item !== null)
    .map((item) => ({
      name: normalizeString(item.name),
      issuer: normalizeString(item.issuer),
      date: normalizeString(item.date),
      url: normalizeString(item.url),
    }))
    .filter((item) => item.name || item.issuer || item.date);
};

const normalizeOnboardingPayload = (payload: OnboardingPayload) => ({
  avatar: normalizeString(payload.avatar),
  name: normalizeString(payload.name),
  location: normalizeString(payload.location),
  relocate: normalizeString(payload.relocate, "No"),
  relocationDestinations: normalizeStringArray(payload.relocationDestinations),
  workPreference: normalizeString(payload.workPreference, "Hybrid"),
  visaSponsorship: normalizeString(payload.visaSponsorship, "No"),
  expectedSalary: normalizeString(payload.expectedSalary),
  noticePeriod: normalizeString(payload.noticePeriod),
  yearsOfExperience:
    typeof payload.yearsOfExperience === "number" && Number.isFinite(payload.yearsOfExperience)
      ? Math.max(payload.yearsOfExperience, 0)
      : 0,
  educationLevel: normalizeString(payload.educationLevel),
  languages: normalizeStringArray(payload.languages),
  github: normalizeString(payload.github),
  portfolio: normalizeString(payload.portfolio),
  linkedin: normalizeString(payload.linkedin),
  targetRoles: normalizeStringArray(payload.targetRoles),
  techSkills: normalizeStringArray(payload.techSkills),
  softSkills: normalizeStringArray(payload.softSkills),
  techDomain: normalizeString(payload.techDomain),
  improvementArea: normalizeString(payload.improvementArea),
  companySize: normalizeString(payload.companySize, "Any"),
  work: normalizeExperience(payload.work),
  projects: normalizeProjects(payload.projects),
  certificates: normalizeCertificates(payload.certificates),
});

const createOnboardingService = async (userId: string, payload: OnboardingPayload) => {
  const existingOnboarding = await findOnboardingByUserId(userId);

  if (existingOnboarding) {
    throw new ApiError(409, "Onboarding already exists for this user.");
  }

  const onboarding = await createOnboarding({
    user: userId,
    ...normalizeOnboardingPayload(payload),
  });

  await markUserAsOnboarded(userId);

  return onboarding;
};

const getOnboardingService = async (userId: string) => {
  const onboarding = await findOnboardingByUserId(userId);

  if (!onboarding) {
    throw new ApiError(404, "Onboarding not found.");
  }

  return onboarding;
};

const updateOnboardingService = async (userId: string, payload: OnboardingPayload) => {
  const onboarding = await updateOnboardingByUserId(userId, normalizeOnboardingPayload(payload));

  if (!onboarding) {
    throw new ApiError(404, "Onboarding not found.");
  }

  await markUserAsOnboarded(userId);

  return onboarding;
};

export { createOnboardingService, getOnboardingService, updateOnboardingService };
