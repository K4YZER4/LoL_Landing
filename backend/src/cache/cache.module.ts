import { Global, Module } from '@nestjs/common';
import { CacheService } from './cache.service.js';
import { BlobCacheStore } from './blob-cache.store.js';

@Global()
@Module({
  providers: [CacheService, BlobCacheStore],
  exports: [CacheService, BlobCacheStore],
})
export class CacheModule {}
