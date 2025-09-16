// src/components/Buttons/LogoutButton.tsx
"use client";

import axios from "axios";

export default function LogoutButton() {
  const handleLogout = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        credentials: "include",
        "Content-Type": 'application/json'
      }

    });
    window.location.href = "/login";
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Sair
    </button>
  );
}
