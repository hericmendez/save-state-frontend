import { ReactNode } from "react";

export type Game = {
  id: string | number;
  key?: string | number;
  name: string;
  platform: string;
  release_date: string;
  genre: string;
  rating: number;
  developer: string;
  description?: string;
  cover?: { url: string };

};

export interface SideNavItem {
  id?: string
  name: string | React.ReactNode
  path: string
  icon?: React.ReactNode
  submenu?: boolean
  subMenuItems?: SideNavItem[]
  hasContextMenu?: boolean
  isComponent?: boolean
  count?: number | null
}


export type MenuItemWithSubMenuProps = {
  item: SideNavItem;
  toggleOpen: () => void;
};

export type DataItem = {
  id: number;
  nome: string;
  idade: number;
  cidade: string;
};

export type DataItemWithKey = DataItem & {
  key: string | number;
}


export type GameWithKey = Game & {
  key: string | number;
}
export type Field = {
  title: string;
  dataIndex: keyof DataItem;
  key: string;
};

export type GameField = {
  title: string;
  dataIndex: keyof Game;
  key: string;
  render?: (props: { row: { original: Game } }) => ReactNode;
};