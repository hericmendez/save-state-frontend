import { create } from "zustand"
import  api from "@/lib/api" // importa tua instância do axios (ajusta o caminho)

interface CategoryState {
  categories: any[]
  loading: boolean
  error: string | null
  fetchCategories: () => Promise<void>
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true, error: null })
    try {
      const response = await api.get("/categories")
console.log('response from useCategoryStore ==> ', response)

      set({ categories: response.data, loading: false })
    } catch (err: any) {
      set({ error: err.message ?? "Erro ao carregar categorias", loading: false })
    }
  },
}))
