//app/search/list/page.tsx
"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import HybridView from "@/components/HybridView";
import { ContextMenuItemType } from "@/components/HybridView/ContextMenu";
import { GameField, GameWithKey } from "@/@types";
import LoadingOverlay from "@/components/LayoutElements/LoadingOverlay";
import { ToastContainer } from "react-toastify";
import toaster from "@/components/LayoutElements/Toaster";
import { useCategoriesStore } from "@/store/useCategoriesStore";
import { useGamesStore } from "@/store/useGamesStore";
import { useSearchParams } from "next/navigation";
export default function GamesList() {
const search = useSearchParams();
const collection = search.get("collection");
const id = search.get("id");
  const { categories, fetchCategories } = useCategoriesStore();

  // usa o store unificado
  const {
    games,
    loading,
    hasMore,
    fetchCollectionGames,
    addGameToBacklog,
    clearGames,
  } = useGamesStore();

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const addGameHandler = (game, cat) => {
    addGameToBacklog(game, cat)
    fetchCategories()

  }

  // quando a id muda: clear + novo fetch
  useEffect(() => {
    fetchCategories();

    // resetar resultados anteriores ao trocar a id
    clearGames();

    if (id) {
      console.log("id to fetchCollectionGames ==> ", decodeURIComponent(id));

      fetchCollectionGames(collection,id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

    console.log(games)
  const fields: GameField[] = [
    { title: "Nome", dataIndex: "name", key: "name" },
    { title: "Plataforma", dataIndex: "platform", key: "platform" },
    { title: "Gênero", dataIndex: "genre", key: "genre" },
  ];

  function renderContextMenu(
    game: GameWithKey,
    selectedKeys: React.Key[],
    toggleSelection: (item: GameWithKey) => void
  ): ContextMenuItemType[] {
    return [
      {
        key: `toggle-${game.key}`,
        label: selectedKeys.includes(game.key) ? "Remover seleção" : "Selecionar",
        onClick: () => toggleSelection(game),
      },
      {
        key: `details-${game.key}`,
        label: "Ver detalhes",
        onClick: () => alert(`Detalhes: ${game.name}`),
      },
      {
        key: `actions-${game.key}`,
        label: "Adicionar à lista...",
        children: categories
          .filter((cat) => cat.name !== "Sem categoria")
          .map((cat) => ({
            key: `cat-${cat._id}-${game.key}`,
            label: cat.name,
            onClick: () => addGameHandler(game, cat),
          })),
      },
      {
        key: `review-${game.key}`,
        label: "Avaliar e adicionar à lista...",
        onClick: () => toaster("info", "Funcionalidade futura: avaliar antes de adicionar"),
      },
    ];
  }

  return (
    <>
      {loading ? (
        <LoadingOverlay show={loading} />
      ) : (
        <div className="games-container pt-4 w-full overflow-hidden z-1">
        
          <HybridView data={games} fields={fields} renderContextMenu={renderContextMenu} />
    
          <ToastContainer />
        </div>
      )}
    </>
  );
}
