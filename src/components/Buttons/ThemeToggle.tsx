import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  if (!theme) return null; // Evita erro caso o tema ainda esteja carregando

  const toggleTheme = (): void => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
className="px-4 py-2 bg-transparent border-2 border-black dark:border-white text-black dark:text-white  rounded  dark:hover:bg-gray-600 hover:bg-pastel-blue"
    >
      {theme === "dark" ? <span className="flex flex-row"><Sun className="text-yellow-400" />Light Mode</span> : <span className="flex flex-row"><Moon className="text-gray-800" />Dark Mode</span> }
    </button>
  );
};

export default ThemeToggle;
