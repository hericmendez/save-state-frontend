"use client"

import { Input } from "@/context/ui/input"
import { Button } from "@/context/ui/button"
import { Search } from "lucide-react"
import { useSearchStore } from "@/store/search-store"
import { useRouter } from "next/navigation"
export function SearchInput() {
  const { query, setQuery } = useSearchStore()
  const router = useRouter()
  const handleSearch = (e:any) => {
    e.preventDefault()
    if(query!==''){
    console.log("query ==> ", query);
      router.push(`/search/${encodeURIComponent(query)}`)

    }
  }

  return (
    <div className="relative w-full">
      <Input
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
        className="pr-10 border border-white text-slate-300"
      />
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-300"
        onClick={handleSearch}
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  )
}
