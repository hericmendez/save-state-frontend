"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useLogout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function logout() {
    setLoading(true);
    setError(null);
    try {
      // remove token salvo
      Cookies.remove("token");
      Cookies.remove("username");

      // redireciona
      window.location.href = ("/login");
    } catch (err: any) {
      console.error("Erro no logout", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { logout, loading, error };
};

export default useLogout;
