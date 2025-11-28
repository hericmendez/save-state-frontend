
"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import plataformasJson from "@/data/plataformas.json"


import Link from "next/link"


export default function ConsolesPorGeracao() {
  const [openItems, setOpenItems] = useState<number[]>(
  plataformasJson.map((_, index) => index)
)
  const [searchTerm, setSearchTerm] = useState("")
  const [orderAsc, setOrderAsc] = useState(false)
  const [filterEmpresa, setFilterEmpresa] = useState("Todos")




  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    )
  }

  // Lista única de fabricantes para filtro
  const empresas = Array.from(
    new Set(
      plataformasJson.flatMap(g => g.plataformas.map(p => p.empresa))
    )
  )

  // Filtra plataformas pelo searchTerm e empresa
  const filteredPlataformas = plataformasJson.map(geracao => ({
    ...geracao,
    plataformas: geracao.plataformas.filter(p =>
      p.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterEmpresa === "Todos" || p.empresa === filterEmpresa)
    ),
  }))

  // Ordena gerações
  const sortedGerações = [...filteredPlataformas].sort((a, b) =>
    orderAsc ? a.id - b.id : b.id - a.id
  )

  // Função para destacar portáteis/híbridos/clones
  const getHighlight = (platforma: any) => {
    const allNames = [...platforma.variantes, ...platforma.versoes_alternativas, platforma.nome].join(" ").toLowerCase()
    if (allNames.includes("handheld") || allNames.includes("portable") || allNames.includes("lite") || allNames.includes("hybrid") || allNames.includes("micro") || allNames.includes("switch")) {
      return "ring-2 ring-orange-500"
    }
    return ""
  }

  return (
    <div className="w-full p-6 flex flex-col items-center">
      {/* Barra de busca, ordenação e filtro */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-6xl mb-6">
        <input
          type="text"
          placeholder="Buscar console..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="flex-1 p-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-orange-400"
        />
        <select
          value={filterEmpresa}
          onChange={e => setFilterEmpresa(e.target.value)}
          className="p-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-orange-400"
        >
          <option className="text-zinc-900">Todos</option>
          {empresas.map(emp => (
            <option key={emp}>{emp}</option>
          ))}
        </select>
        <button
          onClick={() => setOrderAsc(!orderAsc)}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
        >
          Ordenar: {orderAsc ? "Mais antigas" : "Mais recentes"}
        </button>
      </div>

      <div className="w-full space-y-2">
        {sortedGerações.map((geracao, index) =>
          geracao.plataformas.length > 0 ? (
            <Collapsible
              key={geracao.id}
              open={openItems.includes(index)}
              onOpenChange={() => toggleItem(index)}
              className="border-b"
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/50">
                <span className="text-xl fw-bold">{geracao.periodo}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    openItems.includes(index) ? "transform rotate-180" : ""
                  }`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="border-t">
                <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {geracao.plataformas.map(platforma => (
                    <Tooltip key={platforma.nome}>
                      <TooltipTrigger asChild>
                        <Link
                          href={`/search/list?collection=platform&id=${platforma.igdb_id}`}

                          className={`
    group flex flex-col items-center 
    p-4 rounded-xl 
    border border-white/10 
    bg-white/5 backdrop-blur 
    shadow-lg
    transition 
    hover:shadow-orange-500/20 
    hover:border-orange-400/40 
    hover:bg-white/10
    relative 
    ${getHighlight(platforma)}
  `}
                        >
                          <div className="w-full h-28 flex items-center justify-center mb-3">
                            <img
                              src={
                                platforma.imagem ||
                                `https://placehold.co/400/orange/white?text=${encodeURIComponent(
                                  platforma.nome
                                )}`
                              }
                              alt={platforma.nome}
                              className="
        w-20 h-20 object-contain 
        transition 
        group-hover:scale-105
      "
                            />
                          </div>

                          <span
                            className="
      text-sm font-semibold 
      text-center 
      group-hover:text-orange-400 
      transition
    "
                          >
                            {platforma.nome}
                          </span>
                        </Link>

                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs bg-slate-900">
                        <div className="space-y-1 text-white">
                          <p>
                            <strong>Ano:</strong> {platforma.ano_lancamento}
                          </p>
                          <p>
                            <strong>Fabricante:</strong> {platforma.empresa}
                          </p>
                          {platforma.variantes.length > 0 && (
                            <p>
                              <strong>Variantes:</strong> {platforma.variantes.join(", ")}
                            </p>
                          )}
                          {platforma.versoes_alternativas.length > 0 && (
                            <p>
                              <strong>Versões alternativas:</strong>{" "}
                              {platforma.versoes_alternativas.join(", ")}
                            </p>
                          )}
                          {platforma.link_externo && (
                            <p>
                              <a
                                href={platforma.link_externo}
                                target="_blank"
                                className="text-orange-500 underline"
                              >
                                Mais info
                              </a>
                            </p>
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ) : null
        )}
      </div>
    </div>
  )
}
