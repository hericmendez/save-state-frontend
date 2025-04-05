import React from "react";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Remove o token do localStorage
    localStorage.removeItem("session");

    // Redireciona para a página de login
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-[#1c98fc] text-white rounded hover:bg-navy-blue"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
