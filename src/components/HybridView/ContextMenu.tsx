//components/HybridView/ContextMenu
"use client";

import * as React from "react";
import {
  ContextMenu as ShadcnContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "@/components/ui/context-menu";

export interface ContextMenuItemType {
  key?: string | number;
  label: string;
  onClick?: () => void;
  children?: ContextMenuItemType[];
}

interface CustomContextMenuProps {
  items: ContextMenuItemType[];
  children: React.ReactNode; // quem dispara o clique direito (trigger)
}

/**
 * ContextMenu genérico baseado no shadcn/ui.
 * Recebe lista de itens e renderiza automaticamente com suporte a submenus.
 */
const CustomContextMenu: React.FC<CustomContextMenuProps> = ({ items, children }) => {
  const renderItems = (menuItems: ContextMenuItemType[]) =>
    menuItems.map((item, idx) => {
      if (item.children && item.children.length > 0) {
        return (
          <ContextMenuSub key={item.key ?? `submenu-${idx}`}>
            <ContextMenuSubTrigger>{item.label}</ContextMenuSubTrigger>
            <ContextMenuSubContent className="bg-white dark:bg-slate-800 border rounded-md shadow-md"
            >{renderItems(item.children)}</ContextMenuSubContent>
          </ContextMenuSub>
        );
      }

      if (item.label === "---") {
        return <ContextMenuSeparator key={`sep-${idx}`} />;
      }

      return (
        <ContextMenuItem
          key={item.key ?? `ctx-item-${idx}`}
          onClick={(ev) => {
            ev.stopPropagation();
            item.onClick?.();
          }}
        >
          {item.label}
        </ContextMenuItem>
      );
    });

  return (
    <ShadcnContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="bg-slate-800 text-white rounded shadow-lg min-w-[180px]">
        {renderItems(items)}</ContextMenuContent>
    </ShadcnContextMenu>
  );
};

export default CustomContextMenu;
