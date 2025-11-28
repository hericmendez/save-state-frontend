"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

// Lista de gêneros baseada na IGDB
import generosJson from "@/data/generos.json"
import Link from "next/link"

export default function GenresPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [orderAsc, setOrderAsc] = React.useState(true)

  // Filtrar gêneros pela busca
  const filteredGenres = generosJson.filter(g =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Ordenação
  const sortedGenres = [...filteredGenres].sort((a, b) =>
    orderAsc
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  )

  return (
    <div className="w-full p-6 flex flex-col items-center">

      {/* Barra de busca e ordenação */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-4xl mb-6">
        <input
          type="text"
          placeholder="Buscar gênero..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="flex-1 p-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-orange-400"
        />

        <button
          onClick={() => setOrderAsc(!orderAsc)}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
        >
          Ordenar: {orderAsc ? "A → Z" : "Z → A"}
        </button>
      </div>

      {/* GRID */}
      <div className="w-full max-w-5xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {sortedGenres.map(genero => (
          <Tooltip key={genero.id}>
            <Link               href={`/search/genres?id=${genero?.id}`}
              className="group block">
        
              <div
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
                {/* Ícone automático (se quiser colocar imagens futuramente, só trocar aqui) */}
                <img
                  src={`https://placehold.co/400/orange/white?text=${encodeURIComponent(genero.name)}`}
                  alt={genero.name}
                  className="w-full h-32 object-contain mb-2 rounded"
                />

                <span className="text-sm font-bold text-center">
                  {genero.name}
                </span>
              </div>
  
</Link>

          </Tooltip>
        ))}
      </div>
    </div>
  )
}
