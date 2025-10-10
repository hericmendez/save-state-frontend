"use client"
import { create } from "zustand"

type SearchState = {
  query: string
  setQuery: (value: string) => void
}

export const useSearchStore = create<SearchState>((set) => ({
  query: "",
  setQuery: (value) => set({ query: value }),
}))
