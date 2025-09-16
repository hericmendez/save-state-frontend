"use client";

import React, { useState } from "react";
import { Input } from "@/context/ui/input";
import { Button } from "@/context/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/context/ui/select";
import { Switch } from "@/context/ui/switch";

import GridView from "./GridView";
import TableView from "./TableView";
import type { GameWithKey, GameField } from "@/@types";
import ContextMenu, { ContextMenuItem } from "./ContextMenu";

interface HybridViewProps {
  data: GameWithKey[];
  fields: GameField[];
  renderContextMenu?: (
    game: GameWithKey,
    selectedKeys: number[],
    toggleSelection: (game: GameWithKey) => void
  ) => ContextMenuItem[];
}

const HybridView: React.FC<HybridViewProps> = ({
  data,
  fields,
  renderContextMenu,
}) => {
  const [isGrid, setIsGrid] = useState(true);
  const [selectedKeys, setSelectedKeys] = useState<number[]>([]);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Context menu state (dono do posicionamento)
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    game: GameWithKey | null;
  }>({ visible: false, x: 0, y: 0, game: null });

  const handleSelectionChange = (keys: number[]) => {
    setSelectedKeys(keys);
  };

  const toggleSelection = (game: GameWithKey) => {
    const isSelected = selectedKeys.includes(game?.key as number);
    setSelectedKeys((prev) =>
      isSelected ? prev.filter((k) => k !== game.key) : [...prev, game.key]
    );
  };

  const handleContextMenu = (e: React.MouseEvent, game: GameWithKey) => {
    e.preventDefault();
    e.stopPropagation();
    // abre o menu usando posição do cursor
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      game,
    });
  };

  const closeContextMenu = () =>
    setContextMenu({ visible: false, x: 0, y: 0, game: null });

  // filtragem, ordenação e paginação
  const filteredData = data
    .filter((item) =>
      (item?.name || "").toString().toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? (a?.name || "").toString().localeCompare((b?.name || "").toString())
        : (b?.name || "").toString().localeCompare((a?.name || "").toString())
    );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="p-4 space-y-4 relative">
      <div className="flex flex-wrap gap-4 items-center">
        <Input
          className="w-full sm:w-1/2"
          placeholder="Buscar por nome"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <Select
          value={sortOrder}
          onValueChange={(v) => setSortOrder(v as "asc" | "desc")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascendente</SelectItem>
            <SelectItem value="desc">Descendente</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={pageSize.toString()}
          onValueChange={(v) => setPageSize(Number(v))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 por página</SelectItem>
            <SelectItem value="20">20 por página</SelectItem>
            <SelectItem value="30">30 por página</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <Switch checked={isGrid} onCheckedChange={setIsGrid} />
          <span>{isGrid ? "Grid" : "Tabela"}</span>
        </div>

        <Button
          onClick={() =>
            console.log(
              "Exportar:",
              data.filter((item) => selectedKeys.includes(item.key as number))
            )
          }
        >
          Exportar Selecionados
        </Button>
      </div>

      <div className="text-sm text-muted-foreground">
        Mostrando {paginatedData.length} de {filteredData.length} registros |
        Selecionados: {selectedKeys.length}
      </div>

      {isGrid ? (
        <GridView
          data={paginatedData}
          selectedKeys={selectedKeys}
          onSelectionChange={handleSelectionChange}
          onContextMenu={handleContextMenu}
        />
      ) : (
        <TableView
          data={paginatedData}
          fields={fields}
          selectedKeys={selectedKeys}
          onSelectionChange={handleSelectionChange}
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={filteredData.length}
          onPageChange={setCurrentPage}
          onContextMenu={handleContextMenu}
        />
      )}

      {/* renderiza o ContextMenu usando os itens que a page fornece */}
      {contextMenu.visible && contextMenu.game && renderContextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={closeContextMenu}
          items={renderContextMenu(contextMenu.game, selectedKeys, toggleSelection)}
        />
      )}
    </div>
  );
};

export default HybridView;
