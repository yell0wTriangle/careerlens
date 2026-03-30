import { getRedisClient } from "../config/redis.js";

interface MemoryEntry {
  value: string;
  expiresAt: number | null;
}

const memoryStore = new Map<string, MemoryEntry>();

const now = () => Date.now();

const isExpired = (entry?: MemoryEntry) => {
  if (!entry) {
    return true;
  }

  if (entry.expiresAt === null) {
    return false;
  }

  return entry.expiresAt <= now();
};

const getMemoryValue = (key: string): string | null => {
  const entry = memoryStore.get(key);

  if (!entry || isExpired(entry)) {
    memoryStore.delete(key);
    return null;
  }

  return entry.value;
};

const setMemoryValue = (key: string, value: string, ttlSeconds?: number) => {
  const expiresAt = ttlSeconds ? now() + ttlSeconds * 1000 : null;
  memoryStore.set(key, { value, expiresAt });
};

const getCacheValue = async (key: string): Promise<string | null> => {
  const redis = await getRedisClient();

  if (redis) {
    try {
      return await redis.get(key);
    } catch {
      // fall back to in-memory
    }
  }

  return getMemoryValue(key);
};

const setCacheValue = async (key: string, value: string, ttlSeconds?: number): Promise<void> => {
  const redis = await getRedisClient();

  if (redis) {
    try {
      if (ttlSeconds && ttlSeconds > 0) {
        await redis.set(key, value, "EX", ttlSeconds);
      } else {
        await redis.set(key, value);
      }
      return;
    } catch {
      // fall back to in-memory
    }
  }

  setMemoryValue(key, value, ttlSeconds);
};

const deleteCacheValues = async (...keys: string[]): Promise<void> => {
  if (keys.length === 0) {
    return;
  }

  const redis = await getRedisClient();

  if (redis) {
    try {
      await redis.del(...keys);
      return;
    } catch {
      // fall back to in-memory
    }
  }

  for (const key of keys) {
    memoryStore.delete(key);
  }
};

const incrementWithWindow = async (key: string, windowSeconds: number): Promise<number> => {
  const redis = await getRedisClient();

  if (redis) {
    try {
      const count = await redis.incr(key);
      if (count === 1) {
        await redis.expire(key, windowSeconds);
      }
      return count;
    } catch {
      // fall back to in-memory
    }
  }

  const existing = getMemoryValue(key);
  const current = Number(existing ?? "0");
  const next = current + 1;
  setMemoryValue(key, String(next), windowSeconds);
  return next;
};

const setIfAbsentWithTtl = async (key: string, value: string, ttlSeconds: number): Promise<boolean> => {
  const redis = await getRedisClient();

  if (redis) {
    try {
      const result = await redis.set(key, value, "EX", ttlSeconds, "NX");
      return result === "OK";
    } catch {
      // fall back to in-memory
    }
  }

  const existing = getMemoryValue(key);
  if (existing !== null) {
    return false;
  }

  setMemoryValue(key, value, ttlSeconds);
  return true;
};

const getTtlSeconds = async (key: string): Promise<number> => {
  const redis = await getRedisClient();

  if (redis) {
    try {
      const ttl = await redis.ttl(key);
      return ttl > 0 ? ttl : 0;
    } catch {
      // fall back to in-memory
    }
  }

  const entry = memoryStore.get(key);
  if (!entry || entry.expiresAt === null) {
    return 0;
  }

  return Math.max(0, Math.ceil((entry.expiresAt - now()) / 1000));
};

export {
  deleteCacheValues,
  getCacheValue,
  getTtlSeconds,
  incrementWithWindow,
  setCacheValue,
  setIfAbsentWithTtl,
};
