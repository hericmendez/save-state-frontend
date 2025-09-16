"use client"

import DashboardBacklog from "../../components/LayoutElements/Dashboard";
import Cookies from "js-cookie";
export default function Home() {
  const username = Cookies.get("username")
  return (
    <>
      <div className="p-2 overflow-y-auto mt-10">
        <h2 className="text-4xl text-center">Bem-vindo, {username || "Player One"}</h2>
        <hr className="my-4" />
        <DashboardBacklog />
      </div>
    </>
  );
}
