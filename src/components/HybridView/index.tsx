"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import GridView from "./GridView";
import TableView from "./TableView";
import { ContextMenuItemType } from "./ContextMenu";

interface Field {
  key: string;
  title: string;
  dataIndex: string;
}

interface HybridViewProps<T> {
  data: T[];
  fields: Field[];
  renderContextMenu?: any
}

export default function HybridView<T extends { key: React.Key; cover: string }>({
  data,
  fields,
  renderContextMenu,
}: HybridViewProps<T>) {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

  const toggleSelection = (item: T) => {
    setSelectedKeys((prev) =>
      prev.includes(item.key) ? prev.filter((k) => k !== item.key) : [...prev, item.key]
    );
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold"></h2>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            onClick={() => setViewMode("table")}
          >
            Tabela
          </Button>
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            onClick={() => setViewMode("grid")}
          >
            Grid
          </Button>
        </div>
      </div>

      {/* Content */}
      {viewMode === "grid" ? (
        <GridView
          data={data}
          selectedKeys={selectedKeys}
          toggleSelection={toggleSelection}
          renderContextMenu={renderContextMenu}
        />
      ) : (
        <TableView
          data={data}
          fields={fields}
          selectedKeys={selectedKeys}
          toggleSelection={toggleSelection}
          renderContextMenu={renderContextMenu}
        />
      )}
    </div>
  );
}
