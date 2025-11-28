//components/hybridview/index.tsx (alterada recentemente)
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import GridView from "./GridView";
import TableView from "./TableView";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useCategoryStore } from "@/app/hooks/useCategoryStore";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

interface Field {
  key: string;
  title: string;
  dataIndex: string;
}

interface HybridViewProps<T> {
  data: T[];
  fields: Field[];
  renderContextMenu?: any;
}

export default function HybridView<
  T extends { key: React.Key; title?: string; cover?: any }
>({ data, fields, renderContextMenu }: HybridViewProps<T>) {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<string>("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const { fetchCategories } = useCategoryStore()
  const toggleSelection = (item: T) => {
    setSelectedKeys((prev) =>
      prev.includes(item.key)
        ? prev.filter((k) => k !== item.key)
        : [...prev, item.key]
    );
  };


  const filteredData = useMemo(() => {
    return data.filter((item: any) => {
      const title = (item.title ?? "").toLowerCase();
      const term = search.toLowerCase();
      return title.includes(term);
    });
  }, [data, search]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a: any, b: any) => {
      const valueA = String(a[sortField] ?? "").toLowerCase();
      const valueB = String(b[sortField] ?? "").toLowerCase();
      if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
      if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortField, sortOrder]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const paginatedData = useMemo(() => {
    if (pageSize >= sortedData.length) return sortedData;
    const start = (page - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, page, pageSize]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
        <Input
          placeholder="Buscar..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full md:w-64"
        />

        <div className="flex gap-2 items-center">
          {/* Sorting Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowUpDown size={16} /> Ordenar
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {fields.map((f) => (
                <DropdownMenuItem
                  key={f.key}
                  onClick={() => handleSort(f.dataIndex)}
                  className="flex items-center justify-between"
                >
                  {f.title}
                  {sortField === f.dataIndex && <Check size={16} />}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Direção</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => setSortOrder("asc")}
                className="flex items-center justify-between"
              >
                Crescente (A → Z)
                {sortOrder === "asc" && <Check size={16} />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortOrder("desc")}
                className="flex items-center justify-between"
              >
                Decrescente (Z → A)
                {sortOrder === "desc" && <Check size={16} />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Switch View */}
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            onClick={() => setViewMode("table")}
          >
            Tabela
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            onClick={() => setViewMode("grid")}
          >
            Grid
          </Button>

          {/* Page Size Selector */}
          <Select onValueChange={(val) => setPageSize(val === "all" ? sortedData.length : Number(val))} value={pageSize >= sortedData.length ? "all" : String(pageSize)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
              <SelectItem value="200">200</SelectItem>
              <SelectItem value="all">Todos</SelectItem>
            </SelectContent>
          </Select>
          {pageSize >= sortedData.length && (
            <span className="text-xs text-red-600 font-semibold">⚠ Pode causar travamentos</span>
          )}
        </div>
      </div>

      {/* Content */}
      {viewMode === "grid" ? (
        <GridView
          data={paginatedData}
          selectedKeys={selectedKeys}
          toggleSelection={toggleSelection}
          renderContextMenu={renderContextMenu}
        />
      ) : (
        <TableView
            data={paginatedData}
          fields={fields}
          selectedKeys={selectedKeys}
          toggleSelection={toggleSelection}
          renderContextMenu={renderContextMenu}
        />
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center gap-4 items-center pt-2">
        <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
          <ChevronLeft size={16} />
        </Button>
        <span className="text-sm">Página {page} / {Math.max(1, Math.ceil(sortedData.length / pageSize))}</span>
        <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(Math.ceil(sortedData.length / pageSize), p + 1))} disabled={page === Math.ceil(sortedData.length / pageSize)}>
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}
