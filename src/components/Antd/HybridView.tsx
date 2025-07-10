// components/ui/hybrid-view.tsx
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
// import { Pagination } from "@/components/ui/pagination";
import CustomPagination from "@/components/ui/custom-pagination";
import GridView from "./GridView";
import TableView from "./TableView";
import type { GameWithKey, GameField } from "@/@types";

interface HybridViewProps {
  data: GameWithKey[];
  fields: GameField[];
}

const HybridView: React.FC<HybridViewProps> = ({ data, fields }) => {
  const [isGrid, setIsGrid] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<number[]>([]);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredData = data
    .filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSelectionChange = (keys: number[]) => {
    setSelectedKeys(keys);
  };

  return (
    <div className="p-4 space-y-4">
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
        />
      )}
    </div>
  );
};

export default HybridView;
