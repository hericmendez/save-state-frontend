'use client';

import React from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import useScroll from "@/hooks/useScroll";
import { cn } from "@/utils/cn";
import ThemeToggle from "@/components/Buttons/ThemeToggle";
import LogoutButton from "@/components/Buttons/LogoutButton";
import Image from "next/image";
import Floppy from "@/assets/images/save_state_logo_floppy.png";
import UserLogo from "@/assets/images/user.png";
import { Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import useLogout from "@/hooks/useLogout";

import { pressStart2P } from "@/app/layout";

export default function Header() {
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
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-slate-200`,
        {
          "border-b border-gray-200 bg-white/75 backdrop-blur-lg": scrolled,
          "border-b border-gray-200 bg-white": selectedLayout,
        }
      )}
    >
      <div className="fixed border-b-2 left-0 top-0 transition-colors w-[100vw] duration-1000 flex h-[60px] items-center justify-between px-4 bg-mist-gray dark:bg-[#293038] z-10">
        {/* LOGO */}
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center"
          >
            <Image width={40} src={Floppy} alt="Save State Logo" />

            <span
              className={`${pressStart2P.className} font-bold text-2xl flex text-[#fff] text-stroke`}
            >
              The Save State Project
            </span>
          </Link>
        </div>

        {/* PROFILE */}
        <div className="flex flex-row-auto">
          {/*      <div className="hidden md:block">
            <div className=" items-center justify-center text-lg mr-5">
              <ThemeToggle />
            </div>
          </div> */}
          <div className="flex flex-row text-white items-center justify-center text-bold mr-5">
            <span className="text-2xl mr-2">Revi Machinga</span>
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
