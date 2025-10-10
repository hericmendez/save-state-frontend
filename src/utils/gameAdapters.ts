import { GameWithKey } from "@/@types";

// 🔹 Adapta jogos vindos da API interna (backlog)
export function adaptBacklogGames(raw: any[]): GameWithKey[] {
  if (!Array.isArray(raw)) return [];

  return raw.map((item) => ({
    ...(item?.igdb_data || {}),
    key: item?._id,
    dbId: item?._id,
    categories: item?.categories || [],
    player_data: item?.player_data || {},
    createdAt: item?.createdAt,
    updatedAt: item?.updatedAt,
  }));
}

// 🔹 Adapta jogos vindos da busca da IGDB
export function adaptIgdbGames(raw: any[]): GameWithKey[] {
  if (!Array.isArray(raw)) return [];

  return raw.map((item) => ({
    ...item,
    key: item?.id,
    dbId: null, // ainda não salvo no backlog
  }));
}
 