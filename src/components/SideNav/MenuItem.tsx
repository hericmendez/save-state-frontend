'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SideNavItem } from '@/@types'
import { Icon } from '@iconify/react'
import CustomContextMenu, { ContextMenuItemType } from '@/components/HybridView/ContextMenu'
import SaveCategoryModal from '../LayoutElements/SaveCategoryModal'
import DeleteCategoryModal from '../LayoutElements/DeleteCategoryModal'


export default function MenuItem({ item, reloadCategories }: { item: SideNavItem, reloadCategories: () => void }) {
console.log("item ==> ", item.name);
  const pathname = usePathname()
  const [subMenuOpen, setSubMenuOpen] = useState(true)

  // editar
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<any>(null)

  // excluir
  const [deleteOpen, setDeleteOpen] = useState(false)

  const toggleSubMenu = () => setSubMenuOpen(!subMenuOpen)

  if (item.submenu) {
    return (
      <div>
        <button
          onClick={toggleSubMenu}
          className={`flex w-full items-center justify-between p-2 transition 
            bg-[linear-gradient(152deg,_#62748e,_#314158_42%,_#0f172b)]
            hover:bg-primary-200
            ${pathname.includes(item.path) ? 'bg-primary-200' : ''}`}
        >
          <div className="flex items-center space-x-4">
            {item.icon}
            <span className="font-semibold text-lg">{item.name}</span>
          </div>
          <Icon
            icon="lucide:chevron-down"
            width="20"
            height="20"
            className={`transition-transform ${subMenuOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {subMenuOpen && (
          <div className="my-2 ml-8 flex flex-col space-y-1">
            {item.subMenuItems?.map((subItem, i) => {
              const isComponentName = React.isValidElement(subItem.name)


              const items: ContextMenuItemType[] = [
                {
                  key: 'edit',
                  label: 'Renomear Lista',
                  onClick: () => {
                    setSelectedCategory(subItem)
                    setModalOpen(true)
                  },
                },
                {
                  key: 'delete',
                  label: 'Excluir Lista',
                  onClick: () => {
                    setSelectedCategory(subItem)
                    setDeleteOpen(true)
                  },
                },
              ]

              if (isComponentName) {
                return (
                  <div key={i} className="px-2 py-1">
                    {subItem.name}
                  </div>
                )
              }

              const linkHref = `${subItem.path}${subItem.id ? '/' + subItem.id + '?page='+ subItem.name: ''}`

              return subItem.hasContextMenu ? (
                <CustomContextMenu key={i} items={items}>
                  <Link
                    href={linkHref}
                    className={`flex items-center justify-between rounded px-2 py-1 text-sm hover:text-primary-400 ${
                      pathname === subItem.path ? 'text-primary-400' : ''
                    }`}
                  >
                    <span>{subItem.name}</span>
                    {subItem.count && (
                      <span className="ml-2 rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                        {subItem.count} 
                      </span>
                    )}
                  </Link>
                </CustomContextMenu>
              ) : (
                <Link
                  key={i}
                  href={linkHref}
                  className={`flex items-center justify-between rounded px-2 py-1 text-sm hover:text-primary-400 ${
                    pathname === subItem.path ? 'text-primary-400' : ''
                  }`}
                >
                  <span>{subItem.name}</span>
                  {subItem.count && (
                    <span className="ml-2 rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                      {subItem.count}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        )}

        {/* modal de edição */}
        <SaveCategoryModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          category={selectedCategory}
          onUpdated={reloadCategories}
        />

        {/* modal de exclusão */}
        <DeleteCategoryModal
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          category={selectedCategory}
          onDeleted={reloadCategories}
        />
      </div>
    )
  }

  return (
    <Link
      href={item.path}
      className={`flex items-center space-x-4 p-2 
        bg-[linear-gradient(152deg,_#62748e,_#314158_42%,_#0f172b)]
        hover:bg-primary-200 
        ${pathname === item.path ? 'bg-primary-200' : ''}`}
    >
      {item.icon}
      <span className="font-semibold text-lg">{item.name}</span>
    </Link>
  )
}
