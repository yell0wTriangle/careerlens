import nodemailer from "nodemailer";
import { Queue, Worker } from "bullmq";

import env from "../config/env.js";
import { createRedisConnection, isRedisEnabled } from "../config/redis.js";

interface SendVerificationEmailPayload {
  to: string;
  username: string;
  code: string;
  expiresInMinutes: number;
}

interface VerificationEmailJob {
  payload: SendVerificationEmailPayload;
}

const EMAIL_QUEUE_NAME = "email.verification";

let verificationEmailQueue: Queue<VerificationEmailJob> | null = null;
let verificationEmailWorker: Worker<VerificationEmailJob> | null = null;

const deliverVerificationEmail = async (payload: SendVerificationEmailPayload): Promise<void> => {
  const subject = "Verify your CareerLens email";
  const text = `Hi ${payload.username},

Your verification code is: ${payload.code}

This code expires in ${payload.expiresInMinutes} minutes.

If you did not create an account, you can ignore this email.
`;

  if (env.EMAIL_TRANSPORT === "console") {
    console.log(`[Email:console] To=${payload.to} Subject="${subject}" Code=${payload.code}`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE ?? false,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: env.EMAIL_FROM,
    to: payload.to,
    subject,
    text,
  });
};

const getVerificationEmailQueue = (): Queue<VerificationEmailJob> | null => {
  if (!env.EMAIL_QUEUE_ENABLED || !isRedisEnabled) {
    return null;
  }

  if (!verificationEmailQueue) {
    const connection = createRedisConnection();

    if (!connection) {
      return null;
    }

    verificationEmailQueue = new Queue<VerificationEmailJob>(EMAIL_QUEUE_NAME, { connection });
  }

  return verificationEmailQueue;
};

const sendVerificationEmail = async (payload: SendVerificationEmailPayload): Promise<void> => {
  const queue = getVerificationEmailQueue();

  if (!queue) {
    await deliverVerificationEmail(payload);
    return;
  }

  try {
    await queue.add(
      "send-verification-email",
      { payload },
      {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 1500,
        },
        removeOnComplete: true,
        removeOnFail: 100,
      },
    );
  } catch (error) {
    console.warn("[EmailQueue] Falling back to direct send:", error);
    await deliverVerificationEmail(payload);
  }
};

const startEmailWorker = () => {
  if (!env.EMAIL_QUEUE_ENABLED || !isRedisEnabled || verificationEmailWorker) {
    return;
  }

  const connection = createRedisConnection();

  if (!connection) {
    return;
  }

  verificationEmailWorker = new Worker<VerificationEmailJob>(
    EMAIL_QUEUE_NAME,
    async (job) => {
      await deliverVerificationEmail(job.data.payload);
    },
    {
      connection,
      concurrency: 3,
    },
  );

  verificationEmailWorker.on("failed", (job, error) => {
    const jobId = job?.id ?? "unknown";
    console.error(`[EmailQueue] Job failed (${String(jobId)}):`, error);
  });
};

export { sendVerificationEmail, startEmailWorker };
