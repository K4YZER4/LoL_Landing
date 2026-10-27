import { Global, Module } from '@nestjs/common';
import { RiotHttpService } from './riot-http.service.js';

@Global()
@Module({
  providers: [RiotHttpService],
  exports: [RiotHttpService],
})
export class RiotModule {}
