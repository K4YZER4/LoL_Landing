import { Module } from '@nestjs/common';
import { LeagueController } from './league.controller.js';
import { LeagueService } from './league.service.js';

@Module({
  controllers: [LeagueController],
  providers: [LeagueService],
  exports: [LeagueService],
})
export class LeagueModule {}
