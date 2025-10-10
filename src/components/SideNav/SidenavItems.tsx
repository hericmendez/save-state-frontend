import { Icon } from '@iconify/react';
import { SideNavItem } from "@/@types";
import CategoryModal from '../LayoutElements/SaveCategoryModal';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    name: "Home",
    path: "/",
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    name: "Estatísticas",
    path: "/dashboard",
    icon: <Icon icon="lucide:chart-spline" width="24" height="24" />,
  },
  {
    name: "Meu Backlog",
    path: "/games",
    icon: <Icon icon="lucide:gamepad-2" width="24" height="24" />,
    submenu: true,
    subMenuItems: [



    ],
  },
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
