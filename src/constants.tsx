import { Icon } from '@iconify/react';
import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/",
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: "Estatísticas",
    path: "/dashboard",
    icon: <Icon icon="lucide:chart-column" width="24" height="24" />,
  },
  {
    title: "Meus Jogos",
    path: "/games",
    icon: <Icon icon="lucide:gamepad-2" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      {
        title: "Favoritos",

        path: "/games/favorites",
      },
      {
        title: "Jogando",
        path: "/games/playing",
      },
      {
        title: "Zerados",
        path: "/games/finished",
      },
      {
        title: "Na fila",
        path: "/games/backlog",
      },
      {
        title: "Dropados",
        path: "/games/dropped",
      },
    ],
  },
  {
    title: "Buscar Jogos",
    path: "/to-do",
    icon: <Icon icon="lucide:search" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      {
        title: "Por título",
        path: "/search/title",
      },
      {
        title: "Por plataforma",
        path: "/search/platform",
      },
      {
        title: "Por data de lançamento",
        path: "/search/release_date",
      },
    ],
  },
  {
    title: "Preferências",
    path: "/settings",
    icon: <Icon icon="lucide:cog" width="24" height="24" />,
  },
  /*  {
    title: "Work in progress",
    path: "/work-in-progress",
    icon: <Icon icon="lucide:construction" width="24" height="24" />,
  }, */
];
