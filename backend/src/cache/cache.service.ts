import { Injectable, Logger } from '@nestjs/common';
import { mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import type { CacheEntry, CacheFile } from './cache.types.js';
import { BlobCacheStore } from './blob-cache.store.js';

@Injectable()
export class CacheService {
  private readonly logger = new Logger(CacheService.name);
  private readonly filePath = resolve(
    process.env.CACHE_FILE_PATH ?? 'data/cache.json',
  );
  private readonly ready: Promise<void>;
  private data: CacheFile = {};
  private writeQueue: Promise<void> = Promise.resolve();

  constructor(private readonly blob: BlobCacheStore) {
    this.ready = this.load();
  }

  async read<T>(key: string): Promise<T | null> {
    await this.ready;
    const entry = this.data[key] as CacheEntry<T> | undefined;

    if (entry && Date.parse(entry.expiresAt) > Date.now()) {
      return entry.value;
    }

    const persistentEntry = await this.blob.read<T>(key);
    if (persistentEntry) {
      this.data[key] = persistentEntry as CacheEntry<unknown>;

      if (Date.parse(persistentEntry.expiresAt) > Date.now()) {
        return persistentEntry.value;
      }
    }

    if (!entry) {
      return null;
    }

    return Date.parse(entry.expiresAt) > Date.now() ? entry.value : null;
  }

  async readStale<T>(key: string): Promise<T | null> {
    await this.ready;
    const localEntry = this.data[key] as CacheEntry<T> | undefined;
    const persistentEntry = await this.blob.read<T>(key);

    if (persistentEntry) {
      this.data[key] = persistentEntry as CacheEntry<unknown>;
      return persistentEntry.value;
    }

    return localEntry?.value ?? null;
  }

  async write<T>(key: string, value: T, ttlMs: number): Promise<void> {
    await this.ready;
    const now = Date.now();

    const entry: CacheEntry<T> = {
      value,
      updatedAt: new Date(now).toISOString(),
      expiresAt: new Date(now + ttlMs).toISOString(),
    };
    this.data[key] = entry as CacheEntry<unknown>;

    this.writeQueue = this.writeQueue
      .catch(() => undefined)
      .then(async () => {
        await Promise.allSettled([
          this.persist(),
          this.blob.write(key, entry),
        ]);
      });

    await this.writeQueue.catch((error: unknown) => {
      this.logger.warn(`No se pudo persistir el caché para ${key}.`);
      this.logger.debug(error instanceof Error ? error.message : String(error));
    });
  }

  private async load(): Promise<void> {
    try {
      const contents = await readFile(this.filePath, 'utf8');
      const parsed = JSON.parse(contents) as CacheFile;
      this.data = parsed && typeof parsed === 'object' ? parsed : {};
    } catch (error: unknown) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        this.logger.warn('No se pudo leer el caché; se iniciará vacío.');
      }
      this.data = {};
    }
  }

  private async persist(): Promise<void> {
    const directory = dirname(this.filePath);
    const temporaryPath = `${this.filePath}.tmp`;
    const contents = JSON.stringify(this.data, null, 2);

    await mkdir(directory, { recursive: true });
    await writeFile(temporaryPath, contents, 'utf8');

    try {
      await rename(temporaryPath, this.filePath);
    } catch {
      await rm(this.filePath, { force: true });
      await rename(temporaryPath, this.filePath);
    }
  }
}
