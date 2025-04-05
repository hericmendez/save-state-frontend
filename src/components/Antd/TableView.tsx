import React from "react";
import { Table } from "antd";
import { DataItem, Field, GameField, GameWithKey } from "@/@types";

interface TableViewProps {
  data: GameWithKey[];
  fields: GameField[];
  selectedKeys: number[];
  onSelectionChange: (keys: number[]) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  pageSize: number;
}

const TableView: React.FC<TableViewProps> = ({
  data,
  fields,
  selectedKeys,
  onSelectionChange,
  currentPage,
  onPageChange,
  totalItems,
  pageSize,
}) => {
  const rowSelection = {
    selectedRowKeys: selectedKeys,
    onChange: (selectedRowKeys: React.Key[]) => onSelectionChange(selectedRowKeys as number[]),
  };

  return (
    <Table
      rowSelection={rowSelection}
      className="bg-[#25262b] text-white rounded-lg"
      dataSource={data}
      columns={fields}
      pagination={{
        current: currentPage,
        pageSize,
        total: totalItems,
        onChange: onPageChange,
        showSizeChanger: false,
      }}
    />
  );
};

export default TableView;
