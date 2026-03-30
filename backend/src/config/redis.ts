import { Redis } from "ioredis";

import env from "./env.js";

const isRedisEnabled = env.REDIS_ENABLED;

let sharedClient: Redis | null = null;
let redisConnectionFailed = false;

const createRedisConnection = (): Redis | null => {
  if (!isRedisEnabled) {
    return null;
  }

  return new Redis(env.REDIS_URL, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    lazyConnect: true,
  });
};

const getRedisClient = async (): Promise<Redis | null> => {
  if (!isRedisEnabled || redisConnectionFailed) {
    return null;
  }

  if (!sharedClient) {
    sharedClient = createRedisConnection();
  }

  if (!sharedClient) {
    return null;
  }

  try {
    if (sharedClient.status !== "ready") {
      await sharedClient.connect();
    }
    return sharedClient;
  } catch (error) {
    redisConnectionFailed = true;
    console.warn("[Redis] Falling back to in-memory mode:", error);
    return null;
  }
};

export { createRedisConnection, getRedisClient, isRedisEnabled };
