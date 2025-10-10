"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CustomContextMenu, { ContextMenuItemType } from "./ContextMenu";

interface GridViewProps<T> {
  data: T[];
  selectedKeys: React.Key[];
  toggleSelection: (item: T) => void;
  renderContextMenu?: (
    item: T,
    selectedKeys: React.Key[],
    toggleSelection: (item: T) => void
  ) => ContextMenuItemType[];
}

export default function GridView<T extends { key: React.Key; title?: string; cover: { url: string } }>({
  data,
  selectedKeys,
  toggleSelection,
  renderContextMenu,
}: GridViewProps<T>) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {data.map((game) => {
        const isSelected = selectedKeys.includes(game.key);

        return (
          <CustomContextMenu
            key={game.key}
            items={renderContextMenu?.(game, selectedKeys, toggleSelection) ?? []}
          >
            <div
              className={`relative rounded-lg overflow-hidden border cursor-pointer group transition-transform duration-200 ${isSelected
                ? "border-primary scale-105"
                : "border-muted hover:scale-[1.02]"
              }`}
              onClick={() => toggleSelection(game)}
            >
              {game.cover && (
                <Image
                  src={game.cover?.url?.startsWith("//") ? `https:${game.cover.url}` : game.cover.url}
                  alt={game.title ?? "Game Cover"}
                  width={400}
                  height={400}
                  className="w-full aspect-[3/4] object-cover"
                />


              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                <p className="text-white text-sm font-medium truncate">{game.title}</p>
              </div>
              <Button
                size="icon"
                variant={isSelected ? "secondary" : "ghost"}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {isSelected ? "✓" : "+"}
              </Button>
            </div>
          </CustomContextMenu>
        );
      })}
    </div>
  );
}
