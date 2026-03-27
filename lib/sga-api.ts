const SGA_BASE = "https://production-superbet-bmb.freetls.fastly.net/betbuilder";
// Belgium events — matches the Offer API (en-BE)
const TARGET = "NG_BE";
const LANG = "en-BE";

export type SgaLeg = {
  name: string;
  status: string;
  marketUuid: string;
  marketName: string;
  oddUuid: string;
  oddName: string;
  superAdvantageEligible: boolean;
};

export type SgaPriceResponse = {
  sgaUuid: string;
  price: number;
  status: string; // "ACTIVE" | "BLOCKED" | "UNAVAILABLE"
  combinationBettingStatus: string;
  marketId: string;
  outcomeId: string;
  legs: SgaLeg[];
};

export type PreviewLeg = {
  uuid: string;
  name: string;
  status: string;
};

export type PreviewResponse = {
  summary: {
    price: number;
    status: string;
    legs: PreviewLeg[];
  };
  unavailableOddsUuids: string[];
};

function sgaParams(matchId: string, selectedOddUuids: string[]): URLSearchParams {
  const sorted = [...selectedOddUuids].sort();
  return new URLSearchParams({
    match_id: matchId,
    selected_odds_uuids: sorted.join(","),
    target: TARGET,
    lang: LANG,
  });
}

export async function fetchSgaOddPrice(
  matchId: string,
  selectedOddUuids: string[]
): Promise<SgaPriceResponse> {
  const url = `${SGA_BASE}/v2/getSgaOddPrice?${sgaParams(matchId, selectedOddUuids)}`;
  const res = await fetch(url, {
    headers: { accept: "application/json" },
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`SGA API error: ${res.status}`);
  return res.json();
}

// Returns the current preview for a combination — including which odds are
// blocked from being combined with the already-selected UUIDs.
export async function fetchPreviewBetbuilderOdd(
  matchId: string,
  selectedOddUuids: string[]
): Promise<PreviewResponse> {
  const url = `${SGA_BASE}/v2/previewBetbuilderOdd?${sgaParams(matchId, selectedOddUuids)}`;
  const res = await fetch(url, {
    headers: { accept: "application/json" },
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`Preview API error: ${res.status}`);
  return res.json();
}

export type SgaMarketOdd = {
  uuid: string;
  name: string;
  price: number;
  status: string;
  superSubEligible: boolean;
  superAdvantageEligible: boolean;
  specifiers?: Record<string, string>;
};

export type SgaMarket = {
  id: number;
  name: string;
  odds: SgaMarketOdd[];
};

export type SgaMarketsResponse = {
  matchId: string;
  markets: SgaMarket[];
};

export async function fetchSgaMarkets(matchId: string): Promise<SgaMarketsResponse> {
  const params = new URLSearchParams({ match_id: matchId, target: TARGET, lang: LANG });
  const url = `${SGA_BASE}/v2/getBetbuilderMarketsForMatch?${params}`;
  const res = await fetch(url, {
    headers: { accept: "application/json" },
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`SGA API error: ${res.status}`);
  return res.json();
}
