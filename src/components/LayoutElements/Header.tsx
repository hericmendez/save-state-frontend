'use client';

import React from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import useScroll from "@/app/hooks/useScroll";
import { cn } from "@/utils/cn";

import Image from "next/image";

import Logo from "@/assets/images/logo_ultimate.png";
import UserLogo from "@/assets/images/user.png";
import { Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import useLogout from "@/app/hooks/useLogout";

import { pressStart2P } from "@/app/layout";
import Cookies from 'js-cookie';

const username = Cookies.get('username')
import { SearchInput } from './SearchInput';
export default function Header() {
  const username = Cookies.get('username')
  console.log("username ==> ", username);
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();
  const { logout, loading } = useLogout();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "My Account",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: (
        <button onClick={() => logout()} disabled={loading}>
          {loading ? "Saindo..." : "Logout"}
        </button>
      ),
    },
  ];
  return (
    <nav
      className={cn(
        `sticky inset-x-0 top-0 w-full transition-all border-b border-slate-200 z-100`,
        {
          "border-b border-gray-200 bg-white/75 backdrop-blur-lg": scrolled,
          "border-b border-gray-200 bg-white": selectedLayout,
        }
      )}
    >
      <div className="fixed border-b-2 left-0 top-0 transition-colors w-[100vw] duration-1000 flex h-[60px] items-center justify-between px-4 bg-mist-gray dark:bg-slate-900">
        {/* LOGO */}
        <div className="flex items-center space-x-4 md:w-[18rem]">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center" 
          >
            <Image width={50} src={Logo} alt="Save State Logo" />

            <h2 style={{ fontFamily: pressStart2P.style.fontFamily, color: 'white' }}>The Save State Project</h2>

          </Link>


        </div>
        <div className='w-100'>        <SearchInput /></div>

        {/* PROFILE */}
        <div className="flex flex-row-auto">
          {/*      <div className="hidden md:block">
            <div className=" items-center justify-center text-lg mr-5">
              <ThemeToggle />
            </div>
          </div> */}
          <div className="flex flex-row text-white items-center justify-center text-bold mr-5">
            <span className="text-2xl mr-2">{username}</span>
            <Dropdown menu={{ items }}>
              <Space className="h-12 w-12 rounded-full border-2 border-white hover:opacity-75 flex items-center justify-center">
                <Image src={UserLogo} alt="User" />
              </Space>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
}
