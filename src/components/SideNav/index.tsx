//components/SideNav/index.tsx
"use client"

import React, { useEffect, useState } from "react"
import { SIDENAV_ITEMS } from "./SidenavItems"
import { SideNavItem } from "@/@types"
import MenuItem from "./MenuItem"
import SaveCategoryModal from "../LayoutElements/SaveCategoryModal"
import { useSearchParams } from "next/navigation"
import { useCategoriesStore } from "@/store/useCategoriesStore"

export default function SideNav() {
  const [menuItems, setMenuItems] = useState<SideNavItem[]>([])
  const { categories, loading, fetchCategories } = useCategoriesStore()
  const searchParams = useSearchParams()
  const rawPageName = searchParams.get("page")
  const formattedPageName = rawPageName
    ? decodeURIComponent(rawPageName.replace(/\+/g, " "))
    : ""

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (!categories.length) return
    const backlogIndex = SIDENAV_ITEMS.findIndex((x) => x.name === "Meu Backlog")
    const presetSubMenuItems = SIDENAV_ITEMS[backlogIndex].subMenuItems ?? []
    const addNewBtn = {
      name: <SaveCategoryModal onUpdated={fetchCategories} />,
      path: "#",
    }

    const subMenuItems = [...categories.map((item: any) => ({
      id: item._id,
      name: item.name,
      slug: item.slug,
      count: item?.countGames || null,
      path: "/backlog",
      hasContextMenu: true
    })), ...presetSubMenuItems, addNewBtn].reduce((acc, current) => {
      if (!acc.find((i: SideNavItem) => i.name === current.name)) {
        acc.push(current as SideNavItem)
      }
      return acc
    }, [] as SideNavItem[])

    const updatedItems = [...SIDENAV_ITEMS]
    updatedItems[backlogIndex] = {
      ...updatedItems[backlogIndex],
      subMenuItems,
    }

    setMenuItems(updatedItems)
  }, [categories])

  return (
    <aside className="hidden md:flex fixed mt-[60px] h-screen w-[18rem] flex-col border-r border-zinc-200 bg-pastel-blue dark:bg-slate-800 dark:border-slate-700 text-black dark:text-zinc-100">
      <nav className="flex flex-col flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-4 text-sm text-gray-400 animate-pulse">
            Carregando categorias...
          </div>
        ) : (
          menuItems.map((item, index) => (
            <MenuItem key={index} item={item} reloadCategories={fetchCategories} />
          ))
        )}
      </nav>
    </aside>
  )
}
