"use client";
import {
  GameField,
  GameWithKey,
} from "@/@types";
import HybridView from "@/components/HybridView/HybridView";
import { useParams, useSearchParams } from "next/navigation";

import api from "@/lib/api";
import { useEffect, useState } from "react";

export default function BacklogPage() {
  const [games, setGames] = useState<any[]>([]);
  const { id } = useParams();
  const page = useSearchParams()?.get("page") || "";

  async function fetchGames() {
    try {
      const res = await api.get(`/backlog?categoryId=${id}`);
      setGames(res?.data?.data || []);
    } catch (error) {
      console.log("Error fetching backlog games: ", error);
    }
  }

  useEffect(() => {
    fetchGames();
  }, [id]);

  const fields: GameField[] = [
    { title: "Nome", dataIndex: "name", key: "name" },
    { title: "Plataforma", dataIndex: "platform", key: "platform" },
    { title: "Gênero", dataIndex: "genre", key: "genre" },
  ];

  // adapta os dados vindos do backend para o formato esperado (com key)
  const data: GameWithKey[] = (games || []).map((item: any) => ({
    ...(item?.igdb_data || {}),
    key: item?.id ?? item?.igdb_data?.id ?? Math.random(),
  }));

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl mt-5">{page}</h1>
      <hr />
      <HybridView
        data={data}
        fields={fields}
        // renderContextMenu: cada page pode definir seu menu.
        renderContextMenu={(game, selectedKeys, toggleSelection) => [
          {
            key: `toggle-${game.key}`,
            label: selectedKeys.includes(game.key)
              ? "Remover seleção"
              : "Selecionar",
            onClick: () => toggleSelection(game),
          },
          {
            key: `details-${game.key}`,
            label: "Ver detalhes (console)",
            onClick: () => {
              // exemplo simples — você pode abrir um DrawerModal por aqui
              console.log("Ver detalhes:", game);
              alert(`Ver detalhes: ${game.name}`);
            },
          },
          // Exemplo de submenu (se tiver categorias você pode preencher aqui)
          {
            key: `more-${game.key}`,
            label: "Mais ações",
            children: [
              {
                key: `open-link-${game.key}`,
                label: "Abrir página externa",
                onClick: () => {
                  if (game?.url) window.open(game.url, "_blank");
                  else alert("Sem URL disponível");
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}
