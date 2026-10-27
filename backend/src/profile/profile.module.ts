import { Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module.js';
import { LeagueModule } from '../league/league.module.js';
import { MasteryModule } from '../mastery/mastery.module.js';
import { MatchesModule } from '../matches/matches.module.js';
import { SummonerModule } from '../summoner/summoner.module.js';
import { ProfileController } from './profile.controller.js';
import { ProfileService } from './profile.service.js';

@Module({
  imports: [
    AccountModule,
    SummonerModule,
    LeagueModule,
    MasteryModule,
    MatchesModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
