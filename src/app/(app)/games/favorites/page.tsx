"use client";
import {
  DataItem,
  DataItemWithKey,
  Field,
  GameField,
  GameWithKey,
} from "@/@types";
import HybridView from "@/components/Antd/HybridView";
import { columns } from "@/components/DataTable/Columns";
import { DataTable } from "@/components/DataTable/DataTable";
import { useGameContext } from "@/context/GameContext";
import { games } from "@/data";
export default function FavoritesPage() {
  const { favorites } = useGameContext();

  console.log("favorites ==> ", favorites);

  const fields: GameField[] = [
    { title: "Nome", dataIndex: "name", key: "name" },
    { title: "Idade", dataIndex: "platform", key: "platform" },
    { title: "Cidade", dataIndex: "genre", key: "genre" },
  ];

  const data: GameWithKey[] = games.map((item) => ({
    ...item,
    key: item.id,
  }));

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl  mt-5">Lista de Favoritos</h1>
      <hr className="" />
      <HybridView data={data} fields={fields} />
    </div>
  );
}
