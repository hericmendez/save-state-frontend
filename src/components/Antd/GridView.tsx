import React from "react";
import { List, Checkbox, Pagination } from "antd";
import { GameWithKey, GameField } from "@/@types";
import imgPlaceholder from "@/assets/images/game_cover_placholder.png";
import { FaInfoCircle } from "react-icons/fa";
import { Dropdown } from "antd";
interface GridViewProps {
  data: GameWithKey[];
  fields: GameField[];
  selectedKeys: number[];
  onSelectionChange: (keys: number[]) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  pageSize: number;
}

const GridView: React.FC<GridViewProps> = ({
  data,
  selectedKeys,
  onSelectionChange,
  currentPage,
  onPageChange,
  totalItems,
  pageSize,
}) => {
  const handleCheckboxChange = (key: number, checked: boolean) => {
    const newSelectedKeys = checked
      ? [...selectedKeys, key]
      : selectedKeys.filter((k) => k !== key);
    onSelectionChange(newSelectedKeys);
  };

  return (
    <>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 4,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <div
              className="w-[150px] h-[200px] relative flex justify-center items-center"
              onDoubleClick={() => console.log("clicked", item)}
            >
              <FaInfoCircle className="absolute z-20 right-2 top-2 text-[#1c98fc] text-xl bg-white rounded-full text-stroke" />
              <Checkbox
                className="display-hidden"
                checked={selectedKeys.includes(item.key as number)}
                onChange={(e) =>
                  handleCheckboxChange(item.key as number, e.target.checked)
                }
              >
                {!item.cover && (
                  <span className="absolute text-center text-bold top-[40%] z-10 left-0 right-0 text-white text-bold">
                    {item.name}
                  </span>
                )}
                <img
                  className={`w-full h-full absolute top-0 left-0 object-cover p-0 z-1 rounded-lg
                   transition-transform duration-300 ease-in-out
              ${
                selectedKeys.includes(item.key as number)
                  ? "border-4 border-[#1c98fc] scale-110"
                  : "border-2 border-[#5f6774] hover:scale-105"
              }`}
                  src={item.cover ? item.cover : imgPlaceholder.src}
                  alt="cover"
                />
              </Checkbox>
            </div>
          </List.Item>
        )}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalItems}
        onChange={onPageChange}
        style={{ marginTop: 16, textAlign: "center" }}
      />
    </>
  );
};

export default GridView;
