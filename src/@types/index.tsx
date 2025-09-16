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
  cover?: string;

};

export type SideNavItem = {
  id?: string;
  name: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  count?: number;
  subMenuItems?: SideNavItem[];
};

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