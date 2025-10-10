"use client"

import { useState } from "react"
import { Search, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { Activity, mockData } from "./mockData"


function ActivityIcon({ type }: { type: Activity["type"] }) {
  if (type === "add") return <span className="text-green-600">🎮</span>
  if (type === "note") return <span className="text-blue-600">📝</span>
  if (type === "status") return <span className="text-purple-600">✅</span>
  return null
}

export default function ActivityLog() {
  const [search, setSearch] = useState("")
  const [order, setOrder] = useState<"recent" | "old">("recent")
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(5)

  const filtered = mockData
    .filter(
      (a) =>
        a.game.toLowerCase().includes(search.toLowerCase()) ||
        a.list?.toLowerCase().includes(search.toLowerCase()) ||
        a.note?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      order === "recent"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime()
    )

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header de navegação */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-col items-end p-5 gap-2 w-full">

          <textarea

            placeholder="Adicione uma nota..."
            className="w-full border rounded-lg px-3 py-1 text-sm focus:outline-none"
            value={search}
            onChange={(e) => {
              setPage(1)
              setSearch(e.target.value)
            }}
          />
<button className="bg-slate-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
Gravar</button>
        </div>


      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar no feed..."
            className="w-full sm:w-100 border rounded-lg px-3 py-1 text-sm focus:outline-none"
            value={search}
            onChange={(e) => {
              setPage(1)
              setSearch(e.target.value)
            }}
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            className="border rounded-lg px-3 py-1 text-sm"
            value={order}
            onChange={(e) => setOrder(e.target.value as any)}
          >
            <option value="recent">Mais recentes</option>
            <option value="old">Mais antigos</option>
          </select>

          <select
            className="border rounded-lg px-3 py-1 text-sm"
            value={perPage}
            onChange={(e) => {
              setPage(1)
              setPerPage(Number(e.target.value))
            }}
          >
            <option value={5}>5 por página</option>
            <option value={10}>10 por página</option>
            <option value={20}>20 por página</option>
          </select>
        </div>
      </div>

      {/* Timeline feed */}
      <div className="relative pl-8 space-y-6">
        {/* Linha vertical */}
        <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-300"></div>

        {paginated.map((activity) => (
          <div key={activity.id} className="relative flex gap-3">
            {/* Ícone na linha */}
            <div className="absolute -left-5 top-5 flex items-center justify-center w-8 h-8 rounded-full bg-white border shadow-sm">
              <ActivityIcon type={activity.type} />
            </div>

            {/* Card de conteúdo */}
            <div className="flex-1 border rounded-xl p-4 bg-slate-800 shadow-sm">
              <p className="text-sm">
                {activity.type === "add" && (
                  <>
                    Adicionado <b>{activity.game}</b> na lista{" "}
                    <i>{activity.list}</i>.
                  </>
                )}
                {activity.type === "note" && (
                  <>
                    Nova nota em <b>{activity.game}</b>: “{activity.note}”
                  </>
                )}
                {activity.type === "status" && (
                  <>
                    Alterado status de <b>{activity.game}</b> para{" "}
                    <i>{activity.list}</i>.
                  </>
                )}
              </p>
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                <Clock className="w-3 h-3" />
                {new Date(activity.date).toLocaleString("pt-BR", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginação */}
      <div className="flex justify-center gap-4 items-center pt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="p-2 border rounded-full hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-sm text-gray-500">
          Página {page} de {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          className="p-2 border rounded-full hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
