"use client"

import ActivityFeedMock from "@/components/ActivityFeed";
import DashboardBacklog from "./dashboard/page";
import Cookies from "js-cookie";
export default function Home() {
  const username = Cookies.get("username")
  return (
    <>
      <div className="p-2 overflow-y-auto mt-10 ms-5 text-start">
        <h2 className="text-4xl mb-3">{username || "Player One"}, Seja bem-vindo ao Save State! </h2>
        <p className="text-xl fw-100 text-slate-300">Que memórias iremos registrar hoje?</p>

        {/*<ActivityFeedMock /> */}
      </div>
      <hr className="" />
    </>
  );
}
