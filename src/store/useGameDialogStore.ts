import { create } from "zustand"
import { GameWithKey } from "@/@types"

interface GameDialogState {
  open: boolean
  game: GameWithKey | null
  openDialog: (game: GameWithKey) => void
  closeDialog: () => void
}

export const useGameDialogStore = create<GameDialogState>((set) => ({
  open: false,
  game: null,
  openDialog: (game) => set({ open: true, game }),
  closeDialog: () => set({ open: false, game: null }),
}))
