import { Injectable, Logger } from '@nestjs/common';
import { get, put } from '@vercel/blob';
import type { CacheEntry } from './cache.types.js';

const BLOB_PREFIX = 'lol-landing/cache/';

@Injectable()
export class BlobCacheStore {
  private readonly logger = new Logger(BlobCacheStore.name);
  private readonly enabled = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  async read<T>(key: string): Promise<CacheEntry<T> | null> {
    if (!this.enabled) return null;

    try {
      const result = await get(this.pathFor(key), {
        access: 'private',
        useCache: false,
      });

      if (!result || result.statusCode !== 200) return null;

      const contents = await new Response(result.stream).text();
      return JSON.parse(contents) as CacheEntry<T>;
    } catch {
      this.logger.warn(`No se pudo leer Blob para ${key}; se usará el caché local.`);
      return null;
    }
  }

  async write<T>(key: string, entry: CacheEntry<T>): Promise<void> {
    if (!this.enabled) return;

    try {
      await put(this.pathFor(key), JSON.stringify(entry), {
        access: 'private',
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'application/json',
        cacheControlMaxAge: 60,
      });
    } catch {
      this.logger.warn(`No se pudo guardar Blob para ${key}; se conservará RAM/local.`);
    }
  }

  private pathFor(key: string): string {
    return `${BLOB_PREFIX}${encodeURIComponent(key)}.json`;
  }
}
