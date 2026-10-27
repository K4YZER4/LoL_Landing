import { Global, Module } from '@nestjs/common';
import { DdragonService } from './ddragon.service.js';

@Global()
@Module({
  providers: [DdragonService],
  exports: [DdragonService],
})
export class DdragonModule {}
