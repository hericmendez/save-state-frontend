export type Activity = {
  id: number
  type: "add" | "note" | "status"
  game: string
  list?: string
  note?: string
  date: string
}

export const mockData: Activity[] = [
  { id: 1, type: "add", game: "Hollow Knight: Silksong", list: "Metroidvanias", date: "2025-09-15T12:30:00Z" },
  { id: 2, type: "note", game: "Hollow Knight: Silksong", note: "Expectativa alta, quero jogar no lançamento", date: "2025-09-14T18:20:00Z" },
  { id: 3, type: "status", game: "Bloodborne", list: "Finalizados", date: "2025-09-13T20:00:00Z" },
  { id: 4, type: "add", game: "Elden Ring", list: "Jogando", date: "2025-09-12T14:10:00Z" },
  { id: 5, type: "note", game: "Celeste", note: "Plataforma incrível, trilha sonora marcante", date: "2025-09-11T11:00:00Z" },
  { id: 6, type: "status", game: "Persona 5", list: "Backlog", date: "2025-09-10T16:40:00Z" },
  { id: 7, type: "add", game: "Stardew Valley", list: "Casual", date: "2025-09-09T08:30:00Z" },
  { id: 8, type: "note", game: "Dark Souls III", note: "Mais acessível que o 1, mas ainda desafiador", date: "2025-09-08T19:15:00Z" },
  { id: 9, type: "status", game: "Final Fantasy VII Remake", list: "Jogando", date: "2025-09-07T13:50:00Z" },
  { id: 10, type: "add", game: "The Legend of Zelda: Tears of the Kingdom", list: "Switch Exclusives", date: "2025-09-06T21:25:00Z" },
  { id: 11, type: "note", game: "Hades", note: "Loop viciante, cada run é única", date: "2025-09-05T09:45:00Z" },
]