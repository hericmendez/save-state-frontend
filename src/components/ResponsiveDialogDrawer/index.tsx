"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/app/hooks/use-media-query"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import { useGameDialogStore } from "@/store/useGameDialogStore"
import { GameWithKey } from "@/@types"

// Tipagem defensiva (garante que game seja um GameWithKey válido)
type SafeGame = Partial<GameWithKey> & {
  cover?: { url?: string }
  genres?: { id: number | string; name: string }[]
  platforms?: {
    id: number | string
    name: string
    platform_logo?: { url?: string }
  }[]
  player_data?: { status?: string; hours_played?: number }
  release_date?: number
  summary: string
}

export default function ResponsiveDialogDrawer() {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const { open, game, closeDialog } = useGameDialogStore()

  // early return se não houver jogo selecionado
  if (!game) return null

  // casting defensivo
  const safeGame = game as unknown as SafeGame

  const coverUrl = safeGame.cover?.url
    ? `https:${safeGame.cover.url}`
    : "/placeholder-cover.jpg"
  const formattedDate = safeGame.release_date
    ? new Date(safeGame.release_date * 1000).toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Data desconhecida"

  const content = (
    <div className="relative">
      {/* imagem de fundo com blur */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={coverUrl}
          alt={safeGame.name ?? "Jogo sem nome"}
          fill
          className="object-cover opacity-30 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
      </div>

      {/* conteúdo principal */}
      <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="flex-shrink-0 w-full md:w-1/3">
          <Image
            src={coverUrl}
            alt={safeGame.name ?? "Jogo sem nome"}
            width={300}
            height={400}
            className="rounded-xl shadow-lg mx-auto"
          />
        </div>

        <div className="flex flex-col justify-between space-y-4 md:space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {safeGame.name ?? "Título desconhecido"}
            </h1>

            <div className="flex flex-wrap gap-2 mt-2">
              {safeGame.platforms?.map((p) => (
                <div
                  key={String(p.id)}
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  {p.platform_logo?.url && (
                    <Image
                      src={`https:${p.platform_logo.url}`}
                      alt={p.name}
                      width={20}
                      height={20}
                      className="rounded"
                    />
                  )}
                  <span>{p.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-100">Gêneros</h2>
            <div className="flex flex-wrap gap-2 mt-1">
              {safeGame.genres?.map((g) => (
                <span
                  key={String(g.id)}
                  className="text-sm bg-slate-700 px-2 py-1 rounded-md"
                >
                  {g.name}
                </span>
              ))}
            </div>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed">
            {safeGame.summary || "Sem descrição disponível."}
          </p>

          <div className="text-gray-400 text-xs">
            <p>Lançamento: {formattedDate}</p>
            {safeGame.player_data?.status && (
              <p>Status: {safeGame.player_data.status}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-slate-900 text-white border border-slate-700">
          <DialogHeader>
            <DialogTitle className="sr-only">Detalhes do jogo</DialogTitle>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={closeDialog}>
      <DrawerContent className="bg-slate-900 text-white border-t border-slate-700">
        <DrawerHeader>
          <DrawerTitle className="text-lg font-semibold">
            {safeGame.name}
          </DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-4 overflow-y-auto max-h-[70vh]">{content}</div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" className="text-white border-slate-500">
              Fechar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
