"use client"; // Certifique-se de que este comando está no início do arquivo

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function LoginPage() {
  const [email, setEmail] = useState("heric.mendez00@gmail.com");
  const [password, setPassword] = useState("teste123");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Isso envia o cookie!
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      console.log("login response:", response.ok);
      // Sucesso: redireciona
      window.location.href = "/";
    } catch (err: any) {
      console.error("Erro ao fazer login:", err);
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
        {/*         <p className="mt-2 text-xs text-center text-gray-500 break-all">
          Localstorage: {localStorage?.session || "Nenhum token encontrado"}
        </p> */}
      </div>
    </div>
  );
}