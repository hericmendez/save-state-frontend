//src/app/(app)/layout.tsx
"use client";
import { Inter } from "next/font/google";
import Header from "@/components/LayoutElements/Header";
import HeaderMobile from "@/components/LayoutElements/HeaderMobile";
import SideNav from "@/components/SideNav";
import PageWrapper from "@/components/LayoutElements/PageWrapper";
import MarginWidthWrapper from "@/components/LayoutElements/MarginWidthWrapper";
import "@/styles/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { ReactNode, FC, useState, useEffect } from "react";


import { useAuth } from "@/app/hooks/useAuth";

const AppLayout: FC<{ children: ReactNode }> = ({ children }) => {
  useAuth()

  return (
    <ThemeProvider>

        <Header />
        <div className="flex">
          <SideNav />

          <main className="flex-1">
            <MarginWidthWrapper>

              <HeaderMobile />
              <PageWrapper>{children}</PageWrapper>
            </MarginWidthWrapper>
          </main>
        </div>

    </ThemeProvider>
  );
};

export default AppLayout;
