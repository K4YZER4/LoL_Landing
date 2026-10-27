import { Injectable } from '@nestjs/common';
import {
  DdragonChampion,
  DdragonChampionResponse,
  DdragonSpell,
  DdragonSpellResponse,
} from './ddragon.types.js';

const DDRAGON_CDN = 'https://ddragon.leagueoflegends.com/cdn';
const DDRAGON_API = 'https://ddragon.leagueoflegends.com/api';

@Injectable()
export class DdragonService {
  private versionPromise?: Promise<string>;
  private championMapPromise?: Promise<Map<number, DdragonChampion>>;
  private spellMapPromise?: Promise<Map<number, DdragonSpell>>;

  getVersion(): Promise<string> {
    this.versionPromise ??= this.fetchVersion().catch((error: unknown) => {
      this.versionPromise = undefined;
      throw error;
    });

    return this.versionPromise;
  }

  async championIconUrl(championName: string): Promise<string> {
    const version = await this.getVersion();
    return `${DDRAGON_CDN}/${version}/img/champion/${championName}.png`;
  }

  async itemIconUrl(itemId: number): Promise<string | null> {
    if (!itemId) {
      return null;
    }

    const version = await this.getVersion();
    return `${DDRAGON_CDN}/${version}/img/item/${itemId}.png`;
  }

  async profileIconUrl(profileIconId: number): Promise<string> {
    const version = await this.getVersion();
    return `${DDRAGON_CDN}/${version}/img/profileicon/${profileIconId}.png`;
  }

  async spellIconUrl(spellId: number): Promise<string | null> {
    const spells = await this.getSpellMap();
    const spell = spells.get(spellId);

    if (!spell) {
      return null;
    }

    const version = await this.getVersion();
    return `${DDRAGON_CDN}/${version}/img/spell/${spell.id}.png`;
  }

  getChampionMap(): Promise<Map<number, DdragonChampion>> {
    this.championMapPromise ??= this.fetchChampionMap().catch((error: unknown) => {
      this.championMapPromise = undefined;
      throw error;
    });

    return this.championMapPromise;
  }

  getSpellMap(): Promise<Map<number, DdragonSpell>> {
    this.spellMapPromise ??= this.fetchSpellMap().catch((error: unknown) => {
      this.spellMapPromise = undefined;
      throw error;
    });

    return this.spellMapPromise;
  }

  private async fetchVersion(): Promise<string> {
    const response = await fetch(`${DDRAGON_API}/versions.json`);

    if (!response.ok) {
      throw new Error(`No se pudo obtener la versión de DDragon: ${response.status}`);
    }

    const versions = (await response.json()) as string[];
    const version = versions[0];

    if (!version) {
      throw new Error('DDragon no devolvió ninguna versión');
    }

    return version;
  }

  private async fetchChampionMap(): Promise<Map<number, DdragonChampion>> {
    const version = await this.getVersion();
    const response = await fetch(`${DDRAGON_CDN}/${version}/data/en_US/champion.json`);

    if (!response.ok) {
      throw new Error(`No se pudo obtener champion.json: ${response.status}`);
    }

    const data = (await response.json()) as DdragonChampionResponse;

    return new Map<number, DdragonChampion>(
      Object.values(data.data).map(
        (champion) => [Number(champion.key), champion] as [number, DdragonChampion],
      ),
    );
  }

  private async fetchSpellMap(): Promise<Map<number, DdragonSpell>> {
    const version = await this.getVersion();
    const response = await fetch(`${DDRAGON_CDN}/${version}/data/en_US/summoner.json`);

    if (!response.ok) {
      throw new Error(`No se pudo obtener summoner.json: ${response.status}`);
    }

    const data = (await response.json()) as DdragonSpellResponse;

    return new Map<number, DdragonSpell>(
      Object.values(data.data).map(
        (spell) => [Number(spell.key), spell] as [number, DdragonSpell],
      ),
    );
  }
}
