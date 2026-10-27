import { Module } from '@nestjs/common';
import { SummonerController } from './summoner.controller.js';
import { SummonerService } from './summoner.service.js';

@Module({
  controllers: [SummonerController],
  providers: [SummonerService],
  exports: [SummonerService],
})
export class SummonerModule {}
