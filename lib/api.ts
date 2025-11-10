const API_BASE_URL = 'https://api.coingecko.com/api/v3';
const API_KEY_HEADER = 'x-cg-demo-api-key';

const API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY || '';

interface ApiOptions {
  headers?: Record<string, string>;
}

async function fetchFromAPI(endpoint: string, options: ApiOptions = {}) {
  const headers = {
    'Accept': 'application/json',
    ...(API_KEY && { [API_KEY_HEADER]: API_KEY }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers,
    cache: 'force-cache',
  });

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function getCoinsMarkets(
  page = 1,
  perPage = 50,
  sortBy = 'market_cap_desc'
) {
  const endpoint = `/coins/markets?vs_currency=usd&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=24h`;
  return fetchFromAPI(endpoint);
}

export async function getCoinDetails(coinId: string) {
  const endpoint = `/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
  return fetchFromAPI(endpoint);
}

export async function getCoinChart(
  coinId: string,
  days: number = 7,
  interval: string = 'daily'
) {
  const endpoint = `/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=${interval}`;
  return fetchFromAPI(endpoint);
}

export async function searchCoins(query: string) {
  const endpoint = `/search?query=${encodeURIComponent(query)}`;
  return fetchFromAPI(endpoint);
}