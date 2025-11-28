//components/HybridView/TableView.tsx

"use client";

import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import CustomContextMenu, { ContextMenuItemType } from "./ContextMenu";

interface Field {
  key: string;
  title: string;
  dataIndex: string;
}

interface TableViewProps<T> {
  data: T[];
  fields: Field[];
  selectedKeys: React.Key[];
  toggleSelection: (item: T) => void;
  renderContextMenu?: (
    item: T,
    selectedKeys: React.Key[],
    toggleSelection: (item: T) => void
  ) => ContextMenuItemType[];
}

export default function TableView<T extends { key: React.Key }>({
  data,
  fields,
  selectedKeys,
  toggleSelection,
  renderContextMenu,
}: TableViewProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead />
          {fields.map((field) => (
            <TableHead key={field.key}>{field.title}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => {
          const isSelected = selectedKeys.includes(item.key);

          return (
            <CustomContextMenu
              key={item.key}
              items={renderContextMenu?.(item, selectedKeys, toggleSelection) ?? []}
            >
              <TableRow
                onClick={() => toggleSelection(item)}
                className={`cursor-pointer ${isSelected ? "bg-muted/50" : "hover:bg-muted/20"
                  }`}
              >
                <TableCell>{isSelected ? "✓" : "+"}</TableCell>
                {fields.map((field) => (
                  <TableCell key={field.key}>
                    {String((item as any)[field.dataIndex])}
                  </TableCell>
                ))}
              </TableRow>
            </CustomContextMenu>
          );
        })}
      </TableBody>
    </Table>
  );
}
