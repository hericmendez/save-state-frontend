// components/ui/table-view.tsx
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { GameField, GameWithKey } from "@/@types";
import CustomPagination from "@/components/ui/custom-pagination";

interface TableViewProps {
  data: GameWithKey[];
  fields: GameField[];
  selectedKeys: number[];
  onSelectionChange: (keys: number[]) => void;
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const TableView: React.FC<TableViewProps> = ({
  data,
  fields,
  selectedKeys,
  onSelectionChange,
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
}) => {
  const handleCheckboxChange = (key: number, checked: boolean) => {
    const newSelectedKeys = checked
      ? [...selectedKeys, key]
      : selectedKeys.filter((k) => k !== key);
    onSelectionChange(newSelectedKeys);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              {fields.map((field) => (
                <TableHead key={field.key}>{field.title}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.key}>
                <TableCell>
                  <Checkbox
                    checked={selectedKeys.includes(item.key as number)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(item.key as number, !!checked)
                    }
                  />
                </TableCell>
                {fields.map((field) => (
                  <TableCell key={field.key}>{item[field.dataIndex]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CustomPagination
        current={currentPage}
        total={totalItems}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default TableView;
