import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { RiotModule } from './riot/riot.module.js';
import { DdragonModule } from './ddragon/ddragon.module.js';
import { AccountModule } from './account/account.module.js';
import { SummonerModule } from './summoner/summoner.module.js';
import { LeagueModule } from './league/league.module.js';
import { MasteryModule } from './mastery/mastery.module.js';
import { MatchesModule } from './matches/matches.module.js';
import { ProfileModule } from './profile/profile.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RiotModule,
    DdragonModule,
    AccountModule,
    SummonerModule,
    LeagueModule,
    MasteryModule,
    MatchesModule,
    ProfileModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
