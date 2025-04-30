"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface UserProfile {
  username: string;
  email: string;
  role: string;
  // adicione aqui outros campos que sua API retorne, se houver
}

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include", // envia o cookie HttpOnly
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Não autenticado");

        const data = await res.json();
        setUser(data); // assume que data já é { username, email, role }
      } catch (err) {
        console.log("Usuário não autenticado, redirecionando para /login");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  return { user, loading };
}
