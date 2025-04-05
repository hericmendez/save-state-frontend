'use client';

import React from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import useScroll from "@/hooks/useScroll";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/Buttons/ThemeToggle";
import LogoutButton from "@/components/Buttons/LogoutButton";
import Image from 'next/image';
import Floppy from '@/assets/images/save_state_logo_floppy.png';
import UserLogo from '@/assets/images/user.png';
export default function Header() {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  const handleLogout = () => {
    // Remover o cookie do token
    document.cookie = "session=; path=/; max-age=0";

    // Opcional: Redirecionar para a página de login
    window.location.href = "/login";
    document.cookie;
    console.log("document.cookie ==> ", document.cookie);
  };

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
      <div className="fixed left-0 top-0 transition-colors w-[100vw] duration-1000 flex h-[60px] items-center justify-between px-4 bg-mist-gray dark:bg-[#293038] z-10">
        {/* LOGO */}
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center">
            <Image width={40} src={Floppy} alt="Save State Logo" />

            <span className="font-bold text-4xl flex text-white">The Save State Project</span>
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
                      <span className='text-2xl mr-2'>Revi Machinga</span>
            <div className="h-12 w-12 rounded-full border-2 border-white hover:opacity-75 flex items-center justify-center">
              
              <Image src={UserLogo} alt='User'/>
            </div>
          </div>
     {/*      <div className="hidden md:block">
            <div className="flex items-center justify-center text-lg ">
              <LogoutButton />
            </div>
          </div> */}
        </div>
      </div>
    </nav>
  );
}
