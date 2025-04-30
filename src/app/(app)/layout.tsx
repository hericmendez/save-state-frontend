"use client";
import { Inter } from "next/font/google";
import Header from "@/components/LayoutElements/Header";
import HeaderMobile from "@/components/LayoutElements/HeaderMobile";
import SideNav from "@/components/LayoutElements/SideNav";
import PageWrapper from "@/components/LayoutElements/PageWrapper";
import MarginWidthWrapper from "@/components/LayoutElements/MarginWidthWrapper";
import "@/styles/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { ReactNode, FC, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GameProvider } from "@/context/GameContext";

const AppLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  /*   const [user, setUser] = useState<{ email: string } | null>(null);
  console.log("Logged as user ==> ", user); */

  /*   useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me", {
          credentials: "include", // necessário para enviar o cookie
        });
        console.log("res ==> ", res);
        if (!res.ok) throw new Error("Não autenticado");

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.log("Usuário não autenticado, redirecionando para login");
        router.push("/login");
      }
    };

    fetchUser();
  }, []);
 */
  return (
    <ThemeProvider>
      <GameProvider>
        <div className="flex">
          <SideNav />
          <main className="flex-1">
            <MarginWidthWrapper>
              <Header />
              <HeaderMobile />
              <PageWrapper>{children}</PageWrapper>
            </MarginWidthWrapper>
          </main>
        </div>
      </GameProvider>
    </ThemeProvider>
  );
};

export default AppLayout;
