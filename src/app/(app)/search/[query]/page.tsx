"use client";

import { useParams } from "next/navigation"
import axios from "axios";
import { useState, useEffect, useRef, useCallback } from "react";
import { GameField, GameWithKey } from "@/@types";
import HybridView from "@/components/HybridView/HybridView";

interface Game {
  id: number;
  name: string;
  summary?: string;
  cover?: { url: string };
  genres?: { name: string }[];
  platforms?: { name: string }[];
}

interface Meta {
  mode: "scroll" | "paginated";
  limit: number;
  offset?: number;
  nextOffset?: number;
  hasMore?: boolean;
  page?: number;
  nextPage?: number;
}

interface ApiResult {
  data: Game[];  
  meta: Meta;
}

export default function GamesList() {
  const [games, setGames] = useState<Game[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const fetchedIds = useRef<Set<number>>(new Set()); // Para evitar duplicados

  const { query } = useParams()

  const fetchGames = useCallback(async () => {




    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/games?title=${query}&`
      );
      

      const apiResult: ApiResult = result.data;
      console.log("apiResult ==> ", apiResult);
      const newGames = (apiResult.data || []).filter((g) => !fetchedIds.current.has(g.id));

      // Atualiza o set de IDs
      newGames.forEach((g) => fetchedIds.current.add(g.id));

  

      setGames((prev) => [...prev, ...newGames]);


    } catch (err) {
      console.error("Falha na API:", err);
      setHasMore(false);
    }
  }, [offset]);

  // Carrega a primeira página
  useEffect(() => {
    fetchGames();
  }, []);
  const fields: GameField[] = [
    { title: "Nome", dataIndex: "name", key: "name" },
    { title: "Plataforma", dataIndex: "platform", key: "platform" },
    { title: "Gênero", dataIndex: "genre", key: "genre" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchGames();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [fetchGames, hasMore]);
  const data: GameWithKey[] = games.map((item) => ({

    ...item,
    key: item.id,
  }));
  return (
    <div className="games-container pt-4 w-full overflow-hidden z-1" >


      <HybridView data={data} fields={fields}/>
    </div>
  );
}
