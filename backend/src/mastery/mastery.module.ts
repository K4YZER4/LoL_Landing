import { Module } from '@nestjs/common';
import { MasteryController } from './mastery.controller.js';
import { MasteryService } from './mastery.service.js';

@Module({
  controllers: [MasteryController],
  providers: [MasteryService],
  exports: [MasteryService],
})
export class MasteryModule {}
