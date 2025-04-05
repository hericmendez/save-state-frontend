import React, { useState } from "react";
import { Switch, Button, Input, Select } from "antd";
import TableView from "./TableView";
import GridView from "./GridView";
import { DataItem, DataItemWithKey, Field, GameField, GameWithKey } from "@/@types";

const { Search } = Input;
const { Option } = Select;





interface HybridViewProps {
  data: GameWithKey[];
  fields: GameField[];
}

const HybridView: React.FC<HybridViewProps> = ({ data, fields }) => {
  const [isGrid, setIsGrid] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] = useState<number[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Filtra os dados com base no nome
  const filteredData = data
    .filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()))
    .sort((a, b) =>
      sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

  // Paginação
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSelectionChange = (keys: number[]) => {
    setSelectedKeys(keys);
    console.log("Itens selecionados:", data.filter((item) => keys.includes(item.key as number)));
  };

  return (
    <div style={{ padding: 20 }}>
      <div className="flex justify-between items-start mb-4" >
        <div>
        <Search
          placeholder="Buscar por nome"
          allowClear
          onSearch={(value) => setSearchText(value)}
          style={{ width: '50%', marginRight: 10, backgroundColor: '#25262b' }}
        />

        <Select      style={{ width: '20%', marginRight: 10 }} value={sortOrder} onChange={(value) => setSortOrder(value)}>
          <Option value="asc">Ascendente</Option>
          <Option value="desc">Descendente</Option>
        </Select>

        <Select       style={{ width: '20%', marginRight: 10 }} value={pageSize} onChange={(value) => setPageSize(value)}>
          <Option value={10}>10 por página</Option>
          <Option value={20}>20 por página</Option>
          <Option value={30}>30 por página</Option>
        </Select>

      <Switch
          checked={isGrid}
          onChange={() => setIsGrid(!isGrid)}
          checkedChildren="Grid"
          unCheckedChildren="Tabela"
          style={{ marginTop: 10 }}
          
        />
        </div>

        <Button
        type="primary"
     
        onClick={() => console.log("Exportar:", data.filter((item) => selectedKeys.includes(item.key as number)))}
      >
        Exportar Selecionados
      </Button>
        
      </div>

      {/* Informações sobre a paginação e seleção */}
      <div style={{ marginBottom: 10 }}>
        <span>
          Mostrando {paginatedData.length} de {filteredData.length} registros | 
          Selecionados: {selectedKeys.length}
        </span>
      </div>

      {isGrid ? (
        <GridView
          data={paginatedData}
          fields={fields}
          selectedKeys={selectedKeys}
          onSelectionChange={handleSelectionChange}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalItems={filteredData.length}
          pageSize={pageSize}
        />
      ) : (
        <TableView
          data={paginatedData}
          fields={fields}
          selectedKeys={selectedKeys}
          onSelectionChange={handleSelectionChange}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalItems={filteredData.length}
          pageSize={pageSize}
        />
      )}


    </div>
  );
};

export default HybridView;
