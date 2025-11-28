"use client"

import * as React from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import themesJson from "@/data/themes.json"
import Link from "next/link"

export default function ThemesPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [orderAsc, setOrderAsc] = React.useState(true)

  // Filtrar temas
  const filteredThemes = themesJson.themes.filter(t =>
    t.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Ordenar alfabeticamente
  const sortedThemes = [...filteredThemes].sort((a, b) => {
    if (orderAsc) return a.nome.localeCompare(b.nome)
    return b.nome.localeCompare(a.nome)
  })

  return (
    <div className="w-full p-6 flex flex-col items-center">
      {/* Barra de busca e ordenação */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-4xl mb-6">
        <input
          type="text"
          placeholder="Buscar tema..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="flex-1 p-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-orange-400"
        />

        <button
          onClick={() => setOrderAsc(!orderAsc)}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
        >
          Ordenar: {orderAsc ? "A-Z" : "Z-A"}
        </button>
      </div>

      {/* GRID DE TEMAS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full max-w-6xl">
        {sortedThemes.map(theme => (
          <Tooltip key={theme.id}>
            <TooltipTrigger asChild>
              <Link
          href={`/search/list?collection=themesid=${theme.id}`}
              className="
                  relative p-4 rounded-xl 
                  border border-white/10 
                  bg-white/5 backdrop-blur 
                  shadow-lg 
                  transition 
                  hover:shadow-orange-500/20 
                  hover:border-orange-400/40 
                  hover:bg-white/10
                "
              >
                <img
                  src={
                    theme.imagem ||
                    `https://placehold.co/300x300/orange/white?text=${encodeURIComponent(
                      theme.nome
                    )}`
                  }
                  alt={theme.nome}
                  className="w-full h-40 object-contain mb-2"
                />
                <span className="text-md font-semibold text-center">
                  {theme.nome}
                </span>
              </Link>
            </TooltipTrigger>

            <TooltipContent className="max-w-xs bg-slate-900 text-white">
              <p className="text-sm">{theme.descricao}</p>

              {theme.link_externo && (
                <p className="mt-2">
                  <a
                    href={theme.link_externo}
                    target="_blank"
                    className="text-orange-400 underline"
                  >
                    Ver mais
                  </a>
                </p>
              )}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  )
}
