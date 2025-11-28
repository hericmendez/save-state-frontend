"use client";

import React from "react";
import pcPlataformas from "@/data/pc.json";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function PlataformasPC() {
  const [orderAsc, setOrderAsc] = React.useState(true);

  const plataformasOrdenadas = [...pcPlataformas.plataformas].sort((a, b) =>
    orderAsc
      ? a.ano_lancamento - b.ano_lancamento
      : b.ano_lancamento - a.ano_lancamento
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10">
      <motion.h1
        className="text-4xl font-extrabold text-center mb-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Plataformas de Jogos para PC
      </motion.h1>

      {/* Controles */}
      <div className="flex justify-end mb-8">
        <Button
          onClick={() => setOrderAsc(!orderAsc)}
          variant="default"
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white"
        >
          Ordenar por ano
          {orderAsc ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
      </div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.08 }
          }
        }}
      >
        {plataformasOrdenadas.map((plataforma) => (
          <motion.div
            key={plataforma.slug}
            variants={{
              hidden: { opacity: 0, y: 15 },
              show: { opacity: 1, y: 0 }
            }}
          >
            <Link
        href={`/search/list?collection=pcgames&id=${plataforma.slug}`}              className="group block"
            >
              <div
                className="
                  relative p-4 rounded-xl 
                  border border-white/10 
                  bg-white/5 backdrop-blur 
                  shadow-lg 
                  transition 
                  hover:shadow-orange-500/20 
                  hover:border-orange-400/40 
                  hover:bg-white/10
                "
              >
                {/* Ícone */}
                <div className="w-full h-28 flex items-center justify-center mb-4">
                  <img
                    src='https://img.icons8.com/?size=100&id=1345&format=png&color=000000'
                    alt={plataforma.nome}
                    className="w-20 h-20 object-contain transition group-hover:scale-105"
                    style={{filter: 'invert(1)'}}
                  />
                </div>

                {/* Nome */}
                <h3 className="text-center font-semibold text-lg group-hover:text-orange-400 transition">
                  {plataforma.nome}
                </h3>

                {/* Ano */}
                <p className="text-center text-sm opacity-70">
                  {plataforma.ano_lancamento}
                </p>

                {/* Empresa */}
                <p className="text-center text-xs opacity-50 mt-2">
                  {plataforma.empresa}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
