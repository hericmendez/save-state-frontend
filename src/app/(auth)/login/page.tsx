// src/app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: { email, password },

      });
      const data = response.data
      const { access_token, username } = response.data;
      console.log("access_token, username ==> ", access_token, username);
      console.log("response.data ==> ", response);
      if (response.status !== 201) {
        throw new Error(data.message || "Erro no login");
      }

      Cookies.set("token", access_token, {
        expires: 7,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
      Cookies.set("username", username, {
        expires: 7,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
      router.push("/"); // redireciona para home
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-6">Login</h1>
        <form onSubmit={handleLogin}>
          {error && (
            <div className="mb-4 text-red-500 text-center">{error}</div>
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full p-3 mb-6 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md font-semibold hover:bg-blue-600 transition"
          >
            Entrar
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Não tem uma conta?{" "}
          <Link className="text-blue-500 hover:underline" href="/register">
            Registre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
