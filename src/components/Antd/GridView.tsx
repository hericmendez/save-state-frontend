// components/ui/grid-view.tsx
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { FaInfoCircle } from "react-icons/fa";
import imgPlaceholder from "@/assets/images/game_cover_placholder.png";
import type { GameWithKey } from "@/@types";

interface GridViewProps {
  data: GameWithKey[];
  selectedKeys: number[];
  onSelectionChange: (keys: number[]) => void;
}

const GridView: React.FC<GridViewProps> = ({
  data,
  selectedKeys,
  onSelectionChange,
}) => {
  const handleCheckboxChange = (key: number, checked: boolean) => {
    const newSelectedKeys = checked
      ? [...selectedKeys, key]
      : selectedKeys.filter((k) => k !== key);
    onSelectionChange(newSelectedKeys);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {data.map((item) => (
        <div
          key={item.key}
          className={`relative rounded-lg overflow-hidden border transition-transform duration-300 ease-in-out cursor-pointer ${
            selectedKeys.includes(item.key as number)
              ? "border-primary scale-105"
              : "border-muted hover:scale-[1.02]"
          }`}
          onDoubleClick={() => console.log("clicked", item)}
        >
          <FaInfoCircle className="absolute z-20 right-2 top-2 text-primary text-xl bg-white rounded-full" />
          <Checkbox
            className="absolute z-20 left-2 top-2"
            checked={selectedKeys.includes(item.key as number)}
            onCheckedChange={(checked) =>
              handleCheckboxChange(item.key as number, !!checked)
            }
          />
          {!item.cover && (
            <span className="absolute text-center font-bold top-1/2 z-10 w-full text-white">
              {item.name}
            </span>
          )}
          <img
            src={item.cover || imgPlaceholder.src}
            alt="cover"
            className="w-full h-[200px] object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default GridView;
