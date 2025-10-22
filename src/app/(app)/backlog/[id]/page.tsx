"use client";

import { SetStateAction, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { ToastContainer } from "react-toastify";

import HybridView from "@/components/HybridView";
import { ContextMenuItemType } from "@/components/HybridView/ContextMenu";
import { GameField, GameWithKey } from "@/@types";
import toaster from "@/components/LayoutElements/Toaster";

// importa o store
import ResponsiveDialogDrawer from "@/components/ResponsiveDialogDrawer";
import { useGameDialogStore } from "@/store/useGameDialogStore"
import { useGamesStore } from "@/store/useGamesStore"; // ajuste o caminho conforme seu projeto

export default function BacklogPage() {
  const [open, setOpen] = useState(false);
  const [game, setGame] = useState<SetStateAction<GameWithKey>>();
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const rawPageName = searchParams.get("page");
  const formattedPageName = rawPageName
    ? decodeURIComponent(rawPageName.replace(/\+/g, " "))
    : "";
  const { openDialog } = useGameDialogStore()

  // estados e actions do store
  const {
    games,
    fetchBacklogGames,
    removeGameFromCategory,
  } = useGamesStore();

  // carrega backlog da categoria ao montar
  useEffect(() => {
    if (id) fetchBacklogGames(id);
  }, [id, fetchBacklogGames]);

  // campos da tabela
  const fields: GameField[] = [
    { title: "Nome", dataIndex: "name", key: "name" },
    { title: "Plataforma", dataIndex: "platform", key: "platform" },
    { title: "Gênero", dataIndex: "genre", key: "genre" },
  ];



  // menu contextual
  function renderContextMenu(
    game: GameWithKey,
    selectedKeys: React.Key[],
    toggleSelection: (item: GameWithKey) => void
  ): ContextMenuItemType[] {
    return [
      {
        key: `toggle-${game.key}`,
        label: selectedKeys.includes(game.key)
          ? "Remover seleção"
          : "Selecionar",
        onClick: () => toggleSelection(game),
      },
      {
        key: `details-${game.key}`,
        label: "Ver detalhes",
        onClick: () => openDialog(game),

      },
      {
        key: `actions-${game.key}`,
        label: `Remover jogo ${formattedPageName ? "de " + formattedPageName : "da lista"
          }`,
        onClick: async () => {
          await removeGameFromCategory(id, game);
          toaster("success", `${game.name} removido com sucesso!`);
        },
      },
    ];
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">
          {formattedPageName || "Minha Biblioteca"}
        </h1>
        <hr />
      </header>

      <HybridView data={games} fields={fields} renderContextMenu={renderContextMenu} />
      <ToastContainer />
      <ResponsiveDialogDrawer />
    </div>
  );
}
