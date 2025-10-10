// src/stores/useGamesStore.ts
import { create } from 'zustand'
import axios from 'axios'
import api from '@/lib/api'
import toaster from '@/components/LayoutElements/Toaster'
import { adaptBacklogGames, adaptIgdbGames } from '@/utils/gameAdapters'
import { GameWithKey } from '@/@types'
import { useCategoriesStore } from '@/store/useCategoriesStore'
const { updateCategoryCount, fetchCategories } = useCategoriesStore.getState()

type GamesState = {
  games: GameWithKey[]
  loading: boolean
  hasMore: boolean
  fetchedIds: Set<number>
  fetchBacklogGames: (categoryId?: string) => Promise<void>
  fetchSearchGames: (query: string) => Promise<void>
  addGameToBacklog: (game: any, category: any) => Promise<void>
  removeGameFromCategory: (categoryId: string, game: any) => Promise<void>
  clearGames: () => void
}

export const useGamesStore = create<GamesState>((set, get) => ({
  games: [],
  loading: false,
  hasMore: true,
  fetchedIds: new Set<number>(),

  // Faz fetch do backlog (registros salvos no seu backend)
  fetchBacklogGames: async (categoryId?: string) => {
    set({ loading: true })
    try {
      const res = await api.get(`/backlog?categoryId=${categoryId ?? ''}`)
      const raw = res?.data?.data || []
      const adapted = adaptBacklogGames(raw)
      set({ games: adapted })
    } catch (err) {
      console.error('fetchBacklogGames error', err)
      toaster('error', 'Erro ao carregar backlog')
    } finally {
      set({ loading: false })
    }
  },

  // Busca na IGDB (ou endpoint de search). Usada pela pagina de busca.
  // IMPORTANTE: quando mudar a query, chame clearGames() antes para resetar fetchedIds e results.
  fetchSearchGames: async (query: string) => {

    if (!query) {
      set({ hasMore: false })
      return
    }

    set({ loading: true })
    try {
const res = await axios.get(
  `${process.env.NEXT_PUBLIC_API_URL}/games`,
  { params: { title: decodeURIComponent(query) } } // forma mais segura e automática
);

      // Algumas APIs retornam payload em data.data; adapt conforme o seu caso
      const apiData = res?.data?.data ?? res?.data ?? []
      // filtra por ids que já adicionamos
      const newOnes = (apiData as any[]).filter(
        g => !get().fetchedIds.has(g.id)
      )

      if (!newOnes.length) {
        // se não veio nada novo — assume que acabou (ou resultado já carregado)
        set({ hasMore: false })
        return
      }

      // marca ids para evitar duplicatas
      newOnes.forEach(g => get().fetchedIds.add(g.id))

      const adapted = adaptIgdbGames(newOnes)
      set(state => ({ games: [...state.games, ...adapted] }))
    } catch (err) {
      console.error('fetchSearchGames error', err)
      set({ hasMore: false })
    } finally {
      set({ loading: false })
    }
  },

  addGameToBacklog: async (game, category) => {
    const payload = {
      category_ids: [category._id],
      igdb_data: game,
      player_data: {}
    }

    try {
      const response = await api.post(
        `/categories/${category._id}/game/new`,
        payload
      )
      console.log('response ==> ', response)
      toaster(
        'success',
        `${game.name} foi adicionado à lista "${category.name}"`
      )

      // Atualiza contador local instantâneo
      updateCategoryCount(category._id, 1)
    } catch (err: any) {
      const message = err?.response?.data?.message
      if (
        err?.response?.status === 400 &&
        message === 'O jogo já está nessa categoria'
      ) {
        toaster('info', `${game.name} já estava na lista "${category.name}"`)
      } else {
        console.error('addGameToBacklog error', err)
        toaster('error', message || 'Erro ao adicionar jogo')
      }
    } finally {
      // Atualiza categorias do backend em segundo plano
      fetchCategories()
    }
  },

  updateGameInBacklog: async (game:any):Promise<any>  => {
    try {
      await api.put(`/backlog/${game.dbId}`)
      toaster('success', `${game.name} atualizado com sucesso`)
      // recarrega o backlog da categoria
    } catch (err) {
      console.error('removeGameFromCategory error', err)
      toaster('error', 'Erro ao atualizar dados do jogo')
    }
  },

  removeGameFromCategory: async (categoryId, game) => {
    try {
      await api.delete(`/categories/${categoryId}/game/${game.dbId}`)
      toaster('success', `${game.name} removido da categoria`)
      // recarrega o backlog da categoria
      get().fetchBacklogGames(categoryId)
    } catch (err) {
      console.error('removeGameFromCategory error', err)
      toaster('error', 'Erro ao remover jogo')
      fetchCategories()
    }
  },

  removeGameFromBacklog: async (game:any):Promise<any> => {
    try {
      await api.delete(`/backlog/${game.dbId}`)
      toaster('success', `${game.name} excluído com sucesso`)
      // recarrega o backlog da categoria
    } catch (err) {
      console.error('removeGameFromCategory error', err)
      toaster('error', 'Erro ao excluir jogo')
    }
  },
  clearGames: () =>
    set({ games: [], fetchedIds: new Set<number>(), hasMore: true })
}))
