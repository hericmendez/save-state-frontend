// app/game/page.tsx
"use client";

import Image from "next/image";


export default function GameContent({game}:any) {
  const releaseDate = new Date(game.first_release_date * 1000).toLocaleDateString(
    "pt-BR",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (

      <div className=" bg-slate-900 h-[100vh]">
        {/* Capa */}
        <div className="relative h-100 w-full">
          <Image
            src={`https:${game.cover.url}`}
            alt={game.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
            <h1 className="text-3xl font-bold text-white">{game.name}</h1>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-6 space-y-6">
          {/* Release + Rating */}
          <div className="flex items-center text-start justify-between text-gray-600">
            <p>
              <span className="font-semibold">Lançamento:</span> {releaseDate}
            </p>
            <p>
              <span className="font-semibold">Nota:</span>{" "}
              {game.total_rating ? game.total_rating.toFixed(1) : "N/A"}
            </p>
          </div>

          {/* Gêneros */}
          <div>

            <div className="flex flex-wrap gap-2 mt-2">
              {game?.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-gray-200 text-sm text-slate-600 font-bold rounded-full"
                >
                  {genre?.name}
                </span>
              ))}
            </div>
          </div>

          {/* Plataformas */}
          <div>
            <h2 className="text-lg text-start font-semibold text-gray-100">Plataformas</h2>
            <div className="flex gap-4 mt-2" >
              {game.platforms?.map((platform) => (
                <div
                  key={platform.id}
                  className="flex flex-col items-center justify-center align-middle text-center w-20 bg-slate-800 p-2 rounded-2xl"
                >
                  {platform.platform_logo?.url && (
                    <Image
                      src={`https:${platform?.platform_logo?.url}`}
                      alt={platform.name}
                      width={100}
                      height={100}
                      className="rounded"
                    />
                  )}
                
                </div>
              ))}
            </div>
          </div>

          {/* Resumo */}
          <div className="text-left">
            <h2 className="text-lg font-semiboldtext-gray-100">Resumo</h2>
            <p className="mt-2 text-gray-400 leading-relaxed">{game.summary}</p>
          </div>
        </div>
      </div>

  );
}
