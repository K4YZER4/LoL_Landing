export interface CacheEntry<T> {
  value: T;
  updatedAt: string;
  expiresAt: string;
}

export type CacheFile = Record<string, CacheEntry<unknown>>;
