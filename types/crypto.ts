export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  total_supply: number;
  circulating_supply: number;
  max_supply: number;
  ath: number;
  atl: number;
  last_updated: string;
}

export interface CoinDetails extends Coin {
  description: {
    en: string;
  };
  links: {
    homepage: string[];
    blockchain_site: string[];
  };
  market_data: {
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
    high_24h: {
      usd: number;
    };
    low_24h: {
      usd: number;
    };
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
  };
}

export interface ChartData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export interface FilterOptions {
  sortBy: 'market_cap' | 'price' | 'volume' | 'price_change_24h';
  sortOrder: 'asc' | 'desc';
  priceRange: {
    min: number | null;
    max: number | null;
  };
  marketCapRange: {
    min: number | null;
    max: number | null;
  };
}