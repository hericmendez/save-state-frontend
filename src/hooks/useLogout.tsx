"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const useLogout=()=> {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function logout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(`Falha no logout (${res.status})`);
      }
      // Redireciona para login
      router.push("/login");
    } catch (err: any) {
      console.error("Erro no logout", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { logout, loading, error };
}

export default useLogout;