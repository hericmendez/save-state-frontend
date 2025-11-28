"use client"

import * as React from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import gameModesJson from "@/data/gameModes.json"
import Link from "next/link"

export default function GameModesPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [orderAsc, setOrderAsc] = React.useState(true)

  // Filtrar modos
  const filteredModes = gameModesJson.modes.filter(mode =>
    mode.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Ordenar alfabeticamente
  const sortedModes = [...filteredModes].sort((a, b) => {
    if (orderAsc) return a.nome.localeCompare(b.nome)
    return b.nome.localeCompare(a.nome)
  })

  return (
    <div className="w-full p-6 flex flex-col items-center">
      {/* Barra de busca e ordenação */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-4xl mb-6">
        <input
          type="text"
          placeholder="Buscar modo..."
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

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full max-w-6xl">
        {sortedModes.map(mode => (
          <Tooltip key={mode.id}>
            <TooltipTrigger asChild>
              <Link
                          href={`/search/game-modes?id=${mode.id}`}
             className="
                  relative p-4 rounded-xl 
                  border border-white/10 
                  bg-white/5 backdrop-blur 
                  shadow-lg 
                  transition 
                  hover:shadow-orange-500/20 
                  hover:border-orange-400/40 
                  hover:bg-white/10
                "              >
                <img
                  src={
                    mode.imagem ||
                    `https://placehold.co/300x300/orange/white?text=${encodeURIComponent(
                      mode.nome
                    )}`
                  }
                  alt={mode.nome}
                  className="w-full h-40 object-contain mb-2"
                />
                <span className="text-md font-semibold text-center">
                  {mode.nome}
                </span>
              </Link>
            </TooltipTrigger>

            <TooltipContent className="max-w-xs bg-slate-900 text-white">
              <p className="text-sm">{mode.descricao}</p>

              {mode.link_externo && (
                <p className="mt-2">
                  <a
                    href={mode.link_externo}
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
