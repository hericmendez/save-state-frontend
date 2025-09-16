'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SIDENAV_ITEMS } from "@/constants";
import { SideNavItem, MenuItemWithSubMenuProps } from "@/@types";
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Logo from "@/assets/images/save_state_logo_memorycard_color.png";

import Cookies from 'js-cookie';
import api from '@/lib/api';
import InlineInput from './InlineEdit';
import Example from './Modal';

export default function SideNav() {
  const [menuItems, setMenuItems] = useState<SideNavItem[]>([]);
  const token = Cookies.get('token')
  console.log("token ==> ", token);
  async function getCategories() {
    try {
      const res = await api.get(`/categories`);
      console.log("sidenav categories response ==> ", res);
      const backlogIndex = SIDENAV_ITEMS.findIndex(x => x.name === 'Meu Backlog')
      const hasSubMenu = SIDENAV_ITEMS[backlogIndex]?.submenu
      if (hasSubMenu) {

        const presetSubMenuItems = SIDENAV_ITEMS[backlogIndex].subMenuItems ?? [];
        const newListBtn = {
          name: <Example />, slug: 'new-list', path: ''
        }
        const customSubMenuItems = res?.data.map((item: any) => (

          {
            id: item._id,
            name: item.name,
            slug: item.slug,
            count: item?.countGames || null,
            path: '/backlog',
          }
        ))
        console.log("customSubMenuItems ==> ", customSubMenuItems);
        customSubMenuItems.push(newListBtn)
        const subMenuItems = [...presetSubMenuItems, ...customSubMenuItems]
        const filteredMenuItems = subMenuItems.reduce((acc, current) => {

          const x: SideNavItem | undefined = acc.find((item: SideNavItem) => item.name === current.name);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);
        console.log("filteredMenuItems ==> ", filteredMenuItems);
        SIDENAV_ITEMS[backlogIndex].subMenuItems = filteredMenuItems;
        setMenuItems(SIDENAV_ITEMS)
      }

    } catch (error) {
      console.log("Error in SideNav.tsx, line 58: ==> ", error);

    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div className="transition-colors duration-1000 hidden fixed md:flex md:w-[18rem] mt-[60px] bg-pastel-blue dark:bg-slate-800 h-screen flex-1 border-zinc-200 dark:border-slate-gray text-black dark:text-zinc-100">
      <div className="flex flex-col  w-full ">



        {/* NAV LINKS */}
        <div className="flex flex-col">
          {menuItems.map((item, index) => {
            return <MenuItem key={index} item={item} />;
          })}


        </div>
      </div>
    </div>
  );
}

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(true);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      {item.submenu ? (
        <>
          {/* NAV LINKS with SUB LINKS */}
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 r hover:bg-primary-200 w-full justify-between bg-[linear-gradient(152deg,_#62748e,_#314158_42%,_#0f172b)] ${
              pathname.includes(item.path) ? "bg-primary-200" : ""
            }`}
          >
            <div className="flex space-x-4 items-center">
              {item.icon}
              <span className="font-semibold text-lg flex">{item.name}</span>
            </div>

            <div className={`flex ${subMenuOpen ? "rotate-180" : ""} `}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </button>
          {/* SUB LINKS */}
          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-2">
              {item.subMenuItems?.map((subItem, subIndex) => {
                return (
                  <Link
                    key={subIndex}
                    href={{ pathname: `${subItem.path}${subItem.id ? '/' + subItem.id : ""}`, query: { page: subItem.name } }}

                    className={` hover:text-primary-400 font-semibold p-2 ${
                      subItem.path === pathname
                        ? "text-primary-400 font-semibold p-2"
                        : "p-2"
                    }`}
                  >
                    <span>{subItem.name} {subItem.count && `(${subItem.count})`}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        // NAV LINKS - STANDALONE
        <Link
          href={item.path}
            className={`flex space-x-4 items-center p-2 bg-[linear-gradient(152deg,_#62748e,_#314158_42%,_#0f172b)] hover:bg-primary-200 ${
            item.path === pathname ? "bg-primary-200" : ""
          }`}
        >
          {item.icon}
            <span className="font-semibold text-lg flex">{item.name}</span>
        </Link>
      )}
    </div>
  );
};
