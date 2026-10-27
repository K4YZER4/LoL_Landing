import { Injectable } from '@nestjs/common';
import { getQueueName } from '../common/queues.js';
import { DdragonService } from '../ddragon/ddragon.service.js';
import { MatchViewModel, RiotMatchDto } from './match.types.js';

@Injectable()
export class MatchMapper {
  constructor(private readonly ddragon: DdragonService) {}

  async toViewModel(match: RiotMatchDto, puuid: string): Promise<MatchViewModel> {
    const participant = match.info.participants.find((item) => item.puuid === puuid);

    if (!participant) {
      throw new Error(`El PUUID no aparece en la partida ${match.metadata.matchId}`);
    }

    const championIconUrl = await this.ddragon.championIconUrl(
      participant.championName,
    );

    const itemUrls = await Promise.all(
      [
        participant.item0,
        participant.item1,
        participant.item2,
        participant.item3,
        participant.item4,
        participant.item5,
        participant.item6,
      ].map((itemId) => this.ddragon.itemIconUrl(itemId)),
    );

    const spellUrls = await Promise.all(
      [participant.summoner1Id, participant.summoner2Id].map((spellId) =>
        this.ddragon.spellIconUrl(spellId),
      ),
    );

    return {
      matchId: match.metadata.matchId,
      queueId: match.info.queueId,
      queueName: getQueueName(match.info.queueId),
      playedAt: match.info.gameStartTimestamp,
      durationSeconds: match.info.gameDuration,
      win: participant.win,
      championName: participant.championName,
      championIconUrl,
      role: participant.teamPosition || participant.individualPosition || 'UNKNOWN',
      kills: participant.kills,
      deaths: participant.deaths,
      assists: participant.assists,
      itemUrls,
      spellUrls,
    };
  }
}
