'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import api from '@/lib/api'

interface GameData {
  _id: string
  igdb_data: {
    cover?: { url: string }
    id: number
    name: string
    genres?: { id: number; name: string }[]
    platforms?: { id: number; name: string }[]
    first_release_date?: number
    summary?: string
  }
  player_data: {
    status: string
    hours_played: number
    times_finished?: number
    personal_rating?: number
    review?: string
    lists?: string[]
  }
}

export default function GameDetailsPage() {
  const [game, setGame] = useState<GameData | null>(null)
  const { id } = useParams<{ id: string }>();

  async function fetchGame(id: string) {
    try {
      const res = await api.get(`/backlog/${id}`)
      setGame(res.data)
    } catch (error) {
      console.error("Erro ao buscar jogo:", error)
    }
  }

  useEffect(() => {
    if (id) fetchGame(id)
  }, [id])

  if (!game) {
    return <div className="flex h-screen items-center justify-center text-muted-foreground">Carregando...</div>
  }

  const { igdb_data, player_data } = game
  const releaseDate = igdb_data.first_release_date
    ? new Date(igdb_data.first_release_date * 1000).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
    })
    : 'Desconhecido'

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-800 text-white">
      {/* HEADER */}
      <div className="relative w-full h-[50vh] overflow-hidden ">
        {igdb_data.cover && (
          <Image
            src={`https:${igdb_data.cover.url}`}
            alt={igdb_data.name}
            fill
            className="object-cover opacity-30 blur-sm"
            priority
          />
        )}
        <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-start gap-6 md:gap-12 px-6 md:px-16">
          {igdb_data.cover && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative w-75 h-100 shadow-2xl rounded-lg overflow-hidden border border-slate-800"
            >
              <Image
                src={`https:${igdb_data.cover.url}`}
                alt={igdb_data.name}
                fill
                className="object-cover rounded-b-md"
                priority
              />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl font-bold mb-3">{igdb_data.name}</h1>
            <p className="text-slate-200 text-sm mb-2">Lançamento: {releaseDate}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {igdb_data.genres?.map((g) => (
                <Badge key={g.id} variant="outline" className="bg-slate-800 border-slate-200 text-md text-slate-300">
                  {g.name}
                </Badge>
              ))}
            </div>
            <div className="flex gap-3 mt-3">
              {igdb_data.platforms?.map((p) => (
                <span key={p.id} className="text-md text-slate-400">{p.name}</span>
              ))}
            </div>
            <p className="text-white mt-5 text-lg leading-relaxed">{igdb_data.summary}</p>
          </motion.div>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className=" mx-auto px-6 md:px-10 py-10">
        {/* Dados do usuário */}
        <div className="flex flex-col md:flex-row gap-8">
          <Card className="flex-1 text-xl bg-slate-800 border-slate-800 p-6">
            <h2 className=" font-semibold mb-4">Progresso do Jogador</h2>
            <div className="space-y-2 text-slate-300">
              <p><strong>Status:</strong> {player_data.status}</p>
              <p><strong>Horas jogadas:</strong> {player_data.hours_played}h</p>
              {player_data.times_finished !== undefined && (
                <p><strong>Vezes zerado:</strong> {player_data.times_finished}</p>
              )}
              {player_data.personal_rating !== undefined && (
                <p className="flex items-center gap-2">
                  <strong>Nota pessoal:</strong>
                  <span className="flex items-center text-yellow-400">
                    <Star className="w-4 h-4 fill-yellow-400 mr-1" />
                    {player_data.personal_rating}
                  </span>
                </p>
              )}
              {player_data.lists && (
                <>
                  <Separator className="my-3 bg-slate-800" />
                  <div>
                    <strong>Listas:</strong>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {player_data.lists.map((list) => (
                        <Badge key={list} className="bg-slate-800 border-slate-700">{list}</Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card>

          {player_data.review && (
            <Card className="flex-3 bg-slate-800 border-slate-800 p-6">
              <h2 className="text-xl font-semibold mb-4">Review Pessoal</h2>
              <p className="text-slate-300 text-lg leading-relaxed">{player_data.review}</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
