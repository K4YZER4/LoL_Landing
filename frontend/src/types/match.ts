export type ItemOrSpellUrl = string | null;

export interface MatchHistoryViewModel {
  cardVariant: string;
  avatarVariant: string;
  resultVariant: string;
  result: string;
  queue: string;
  ratioVariant: string;
  ratio: string;
  spellUrls: [ItemOrSpellUrl, ItemOrSpellUrl];
  itemUrls: [
    ItemOrSpellUrl,
    ItemOrSpellUrl,
    ItemOrSpellUrl,
    ItemOrSpellUrl,
    ItemOrSpellUrl,
    ItemOrSpellUrl,
    ItemOrSpellUrl
  ];
}
