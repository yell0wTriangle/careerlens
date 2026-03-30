import { z } from "zod";

const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z.coerce.number().int().positive().default(3000),
    CORS_ORIGIN: z.string().default("http://localhost:5173"),
    MONGO_URI: z.string().min(1, "MONGO_URI is required"),
    ACCESS_TOKEN_SECRET: z.string().min(1, "ACCESS_TOKEN_SECRET is required"),
    REFRESH_TOKEN_SECRET: z.string().min(1, "REFRESH_TOKEN_SECRET is required"),
    ACCESS_TOKEN_EXPIRY: z.string().default("15m"),
    REFRESH_TOKEN_EXPIRY: z.string().default("7d"),
    EMAIL_VERIFICATION_TOKEN_TTL_MINUTES: z.coerce.number().int().positive().default(15),
    EMAIL_TRANSPORT: z.enum(["console", "smtp"]).default("console"),
    EMAIL_QUEUE_ENABLED: z
      .enum(["true", "false"])
      .transform((value) => value === "true")
      .default("true"),
    EMAIL_FROM: z.string().email().default("no-reply@careerlens.local"),
    SMTP_HOST: z.string().optional(),
    SMTP_PORT: z.coerce.number().int().positive().optional(),
    SMTP_USER: z.string().optional(),
    SMTP_PASS: z.string().optional(),
    SMTP_SECURE: z
      .enum(["true", "false"])
      .transform((value) => value === "true")
      .optional(),
    REDIS_ENABLED: z
      .enum(["true", "false"])
      .transform((value) => value === "true")
      .default("true"),
    REDIS_URL: z.string().default("redis://127.0.0.1:6379"),
    SUPABASE_URL: z.string().url("SUPABASE_URL must be a valid URL"),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, "SUPABASE_SERVICE_ROLE_KEY is required"),
    SUPABASE_RESUME_BUCKET: z.string().min(1, "SUPABASE_RESUME_BUCKET is required"),
  })
  .superRefine((value, ctx) => {
    if (value.EMAIL_TRANSPORT !== "smtp") {
      return;
    }

    if (!value.SMTP_HOST) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "SMTP_HOST is required when EMAIL_TRANSPORT=smtp",
        path: ["SMTP_HOST"],
      });
    }

    if (!value.SMTP_PORT) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "SMTP_PORT is required when EMAIL_TRANSPORT=smtp",
        path: ["SMTP_PORT"],
      });
    }

    if (!value.SMTP_USER) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "SMTP_USER is required when EMAIL_TRANSPORT=smtp",
        path: ["SMTP_USER"],
      });
    }

    if (!value.SMTP_PASS) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "SMTP_PASS is required when EMAIL_TRANSPORT=smtp",
        path: ["SMTP_PASS"],
      });
    }
  });

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const formatted = parsed.error.flatten().fieldErrors;
  throw new Error(`Invalid environment variables: ${JSON.stringify(formatted)}`);
}

const env = parsed.data;

export default env;
