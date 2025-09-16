"use client";

import React from "react";
import { Checkbox } from "@/context/ui/checkbox";
import imgPlaceholder from "@/assets/images/game_cover_placholder.png";
import type { GameWithKey } from "@/@types";

interface GridViewProps {
  data: GameWithKey[];
  selectedKeys: number[];
  onSelectionChange: (keys: number[]) => void;
  onContextMenu?: (e: React.MouseEvent, game: GameWithKey) => void;
}

const GridView: React.FC<GridViewProps> = ({
  data,
  selectedKeys,
  onSelectionChange,
  onContextMenu,
}) => {
  const handleCheckboxChange = (key: number, checked: boolean) => {
    const newSelectedKeys = checked
      ? [...selectedKeys, key]
      : selectedKeys.filter((k) => k !== key);
    onSelectionChange(newSelectedKeys);
  };

  const toggleSelection = (game: GameWithKey) => {
    const isSelected = selectedKeys.includes(game?.key as number);
    handleCheckboxChange(game?.key as number, !isSelected);
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-8 gap-4">
        {data?.map((game, index) => {
          const isSelected = selectedKeys.includes(game?.key as number);
          const key = `grid-${game?.key ?? index}`;
          return (
            <div
              key={key}
              className={`relative rounded-lg overflow-hidden border transition-transform duration-300 ease-in-out cursor-pointer group ${
                isSelected ? "border-primary scale-105" : "border-muted hover:scale-[1.02]"
              }`}
              onClick={() => toggleSelection(game)}
              onContextMenu={(e) => onContextMenu?.(e, game)}
            >
              <Checkbox
                className="absolute z-20 left-2 top-2"
                style={{ display: "none" }}
                checked={isSelected}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(game?.key as number, !!checked)
                }
                onClick={(e) => e.stopPropagation()}
              />

              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                <div className="p-4 text-lg relative z-20 bg-background rounded">
                  <h3 className="font-bold">{game.name}</h3>
                  <p className="text-slate-400">
                    {game.genres?.map((g) => g.name).join(", ")}
                  </p>
                  {game.platforms && (
                    <p>Plataformas: {game.platforms.map((p) => p.name).join(", ")}</p>
                  )}
                </div>
              </div>

              {!game.cover && (
                <span className="absolute text-center font-bold top-1/2 z-20 w-full text-white">
                  {game.name}
                </span>
              )}
              <img src={(game.cover && game.cover.url) || imgPlaceholder.src} alt="cover" className="w-full object-cover" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GridView;
