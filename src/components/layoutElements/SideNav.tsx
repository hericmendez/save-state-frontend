'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SIDENAV_ITEMS } from '../../constants';
import { SideNavItem, MenuItemWithSubMenuProps } from '../../types';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Logo from '@/assets/images/logo_alt.png'
export default function SideNav() {
  return (
    <div className="transition-colors duration-1000 hidden fixed md:flex md:w-[16rem] bg-pastel-blue dark:bg-slate-gray h-screen flex-1  border-r border-zinc-200 dark:border-slate-gray text-black dark:text-zinc-100">
      <div className="flex flex-col space-y-6 w-full ">
        {/* LOGO */}
        <Link
          href="/"
          className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-zinc-100 h-[60px] w-full"
        >

          <span className="hidden md:flex font-bold text-xl"><Image className='w-[50px] mr-4' src={Logo} alt='Logo'/>The Save State Project</span>
        </Link>

        {/* NAV LINKS */}
        <div className="flex flex-col space-y-2 md:px-6">
          {SIDENAV_ITEMS.map((item, index) => {
            return <MenuItem key={index} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
}

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className=''>
      {item.submenu ? (
        <>
          {/* NAV LINKS with SUB LINKS */}
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg hover:bg-primary-200 w-full justify-between ${
              pathname.includes(item.path) ? 'bg-primary-200' : ''
            }`}
          >
            <div className='flex space-x-4 items-center'>
              {item.icon}
              <span className='font-semibold text-lg flex'>{item.title}</span>
            </div>

            <div className={`flex ${subMenuOpen ? 'rotate-180' : ''} `}>
              <Icon icon='lucide:chevron-down' width='24' height='24' />
            </div>
          </button>

          {/* SUB LINKS */}
          {subMenuOpen && (
            <div className='my-2 ml-12 flex flex-col space-y-2'>
              {item.subMenuItems?.map((subItem, subIndex) => {
                return (
                  <Link
                    key={subIndex}
                    href={subItem.path}
                    className={` hover:text-primary-400 font-semibold p-2 rounded-lg ${
                      subItem.path === pathname
                        ? 'text-primary-400 font-semibold p-2'
                        : 'p-2'
                    }`}
                  >
                    <span>{subItem.title}</span>
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
          className={`flex space-x-4 items-center p-2 rounded-lg hover:bg-primary-200 ${
            item.path === pathname ? 'bg-primary-200' : ''
          }`}
        >
          {item.icon}
          <span className='font-semibold text-lg flex'>{item.title}</span>
        </Link>
      )}
    </div>
  );
};
