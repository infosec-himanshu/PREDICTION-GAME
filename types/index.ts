export interface GameCard {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
}

export interface LootResult {
  win: boolean;
  itemType: number;
}

export interface MarketResult {
  win: boolean;
}

export interface BattleStakes {
  playerStakes: string;
  aiStakes: string;
}

