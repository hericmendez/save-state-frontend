import { Icon } from '@iconify/react';
import { SideNavItem } from "@/@types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    name: "Home",
    path: "/",
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },

  {
    name: "Meu Backlog",
    path: "/games",
    icon: <Icon icon="lucide:gamepad-2" width="24" height="24" />,
    submenu: true,
    subMenuItems: [


    ],
  },
/*   {
    name: "Buscar Jogos",
    path: "/to-do",
    icon: <Icon icon="lucide:search" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      {
        name: "Por título",
        path: "/search",
        id: "title",
      },
      {
        name: "Por plataforma",
        path: "/search",
        id: "platform",
      },
      {
        name: "Por gênero",
        path: "/search",
        id: "genre",
      },
    ],
  }, */
  {
    name: "Preferências",
    path: "/settings",
    icon: <Icon icon="lucide:cog" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      {
        name: "Minha conta",
        path: "#",
      },
      {
        name: "Configurações do App",
        path: "",
        id: "loading"
      },
    ],
  },

];
