'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'

// Tipos (mockados, mas compatíveis com o GameWithKey)
interface Game {
  id: number
  name: string
  cover?: { url: string }
  genres?: { id: number; name: string }[]
  platforms?: { id: number; name: string; platform_logo?: { url: string } }[]
  first_release_date?: number
  summary?: string
}

interface UserGameData {
  status: string
  hours_played: number
  times_finished: number
  personal_rating: number
  review: string
  lists: string[]
}

// MOCK - depois você troca por fetch(`/api/games/${id}`)
const mockGame: Game = {
  id: 228525,
  name: 'Hades II',
  cover: { url: '//images.igdb.com/igdb/image/upload/t_720p/coajo5.jpg' },
  genres: [
    { id: 12, name: 'RPG' },
    { id: 25, name: 'Hack and Slash' },
    { id: 32, name: 'Indie' },
  ],
  platforms: [
    { id: 6, name: 'PC', platform_logo: { url: '//images.igdb.com/igdb/image/upload/t_720p/plim.jpg' } },
    { id: 14, name: 'Mac', platform_logo: { url: '//images.igdb.com/igdb/image/upload/t_720p/plo3.jpg' } },
  ],
  first_release_date: 1758758400,
  summary:
    'Battle beyond the Underworld using dark sorcery to take on the Titan of Time in this bewitching sequel to the award-winning rogue-like dungeon crawler.',
}

const mockUserData: UserGameData = {
  status: 'Zerado',
  hours_played: 42,
  times_finished: 2,
  personal_rating: 9.5,
  review:
    'Hades II é uma evolução incrível do primeiro jogo. A atmosfera, a trilha sonora e o ritmo das batalhas estão ainda melhores. Os personagens são muito cativantes e cada um tem sua própria história pra vc descobrir. A jornada de Melinoe é muito boa e prende do começo ao fim.',
  lists: ['Favoritos', 'Platinados'],
}

export default function GameDetailsPage() {
  const [game, setGame] = useState<Game | null>(null)
  const [userData, setUserData] = useState<UserGameData | null>(null)
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    setTimeout(() => {
      setGame(mockGame)
      setUserData(mockUserData)
    }, 500)
  }, [])

  if (!game || !userData) {
    return <div className="flex h-screen items-center justify-center text-muted-foreground">Carregando...</div>
  }

  const releaseDate = new Date(game.first_release_date! * 1000).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-800 text-white">
      {/* HEADER */}
      <div className="relative w-full h-[50vh] overflow-hidden ">
        <Image
          src={`https:${game.cover?.url}`}
          alt={game.name}
          fill
          className="object-cover opacity-30 blur-sm"
          priority
        />
        <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-start gap-6 md:gap-12 px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative w-75 h-100 shadow-2xl rounded-lg overflow-hidden border border-slate-800"
          >
            <Image
              src={`https:${game.cover?.url}`}
              alt={game.name}
              fill
              className="object-cover rounded-b-md"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
    
          >
              
            <h1 className="text-5xl font-bold mb-3">{game.name}</h1>
            <p className="text-slate-200 text-sm mb-2">Lançamento: {releaseDate}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {game.genres?.map((g) => (
                <Badge key={g.id} variant="outline" className="bg-slate-800 border-slate-200 text-md text-slate-300">
                  {g.name}
                </Badge>
              ))}
            </div>
            <div className="flex gap-3 mt-3">
              {game.platforms?.map((p) => (
                <div key={p.id} className="flex items-center gap-2">
                  {p.platform_logo && (
                    <Image
                      src={`https:${p.platform_logo.url}`}
                      alt={p.name}
                      width={24}
                      height={24}
                      className="rounded"
                    />
                  )}
                  <span className="text-md text-slate-400">{p.name}</span>
                </div>
              ))}
            </div>
        

          <p className="text-white mt-5 text-lg leading-relaxed">{game.summary}</p>

          </motion.div>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className=" mx-auto px-6 md:px-10 py-10">
        {/* Descrição */}
    

        {/* Dados do usuário */}
        <div className="flex flex-col md:flex-row gap-8">
          <Card className="flex-1 text-xl bg-slate-800 border-slate-800 p-6">
            <h2 className=" font-semibold mb-4">Progresso do Jogador</h2>
            <div className="space-y-2 text-slate-300">
              <p><strong>Status:</strong> {userData.status}</p>
              <p><strong>Horas jogadas:</strong> {userData.hours_played}h</p>
              <p><strong>Vezes zerado:</strong> {userData.times_finished}</p>
              <p className="flex items-center gap-2">
                <strong>Nota pessoal:</strong>
                <span className="flex items-center text-yellow-400">
                  <Star className="w-4 h-4 fill-yellow-400 mr-1" />
                  {userData.personal_rating}
                </span>
              </p>
              <Separator className="my-3 bg-slate-800" />
              <div>
                <strong>Listas:</strong>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {userData.lists.map((list) => (
                    <Badge key={list} className="bg-slate-800 border-slate-700">{list}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card className="flex-3 bg-slate-800 border-slate-800 p-6">
            <h2 className="text-xl font-semibold mb-4">Review Pessoal</h2>
            <p className="text-slate-300 text-lg leading-relaxed">{userData.review}</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
