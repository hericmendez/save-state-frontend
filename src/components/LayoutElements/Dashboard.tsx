"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

// Mock data
const resumo = {
  total: 120,
  zerados: 45,
  dropados: 20,
  backlog: 55,
  horas: 780,
  jogo: "Nuclear Throne",
  genero: "Roguelike",
  plataforma: "PC",

  
};

const topJogos = [
  { name: "Nuclear Throne", horas: 999 },
  { name: "Rogue Legacy", horas: 200 },
  { name: "The Legend of Zelda: Breath of the Wild", horas: 180 },
  { name: "Persona 5", horas: 120 },
  { name: "Hollow Knight", horas: 80 },
];

const generos = [
  { name: "Roguelike", value: 1000 },
  { name: "Adventure", value: 129 },
  { name: "Metroidvania", value: 390 },
  { name: "RPG", value: 210 },
  { name: "FPS", value: 160 },
];

const plataformas = [
  { name: "PC", value: 400 },
  { name: "PlayStation", value: 250 },
  { name: "Switch", value: 90 },
  { name: "Xbox", value: 40 },
];

const COLORS = ["#6366F1", "#22C55E", "#FACC15", "#F97316", "#EC4899"];

export default function DashboardBacklog() {
  const taxaConclusao = useMemo(() => {
    return ((resumo.zerados / resumo.total) * 100).toFixed(1);
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Cards de resumo */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800">
          <CardContent className="p-2 text-center">
            <h2 className="text-lg font-bold">Jogos Zerados</h2>
            <p className="text-3xl font-extrabold">{resumo.zerados}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800">
          <CardContent className="p-2 text-center">
            <h2 className="text-lg font-bold">Jogos Dropados</h2>
            <p className="text-3xl font-extrabold">{resumo.dropados}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800">
          <CardContent className="p-2 text-center">
            <h2 className="text-lg font-bold">Na Fila</h2>
            <p className="text-3xl font-extrabold">{resumo.backlog}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800">
          <CardContent className="p-2 text-center">
            <h2 className="text-lg font-bold">Horas Jogadas</h2>
            <p className="text-3xl font-extrabold">{resumo.horas}</p>
          </CardContent>
        </Card>
              <Card className="bg-slate-800">
        <CardContent className="p-2 text-center ">
          <h2 className="text-lg font-bold">Taxa de Conclusão</h2>
          <p className="text-3xl font-extrabold text-white">
            {taxaConclusao}%
          </p>
        </CardContent>
      </Card>
                    <Card className="bg-slate-800">
        <CardContent className="p-2 text-center ">
          <h2 className="text-lg font-bold">Jogo mais jogado</h2>
          <p className="text-2xl font-extrabold text-white">
            {resumo.jogo}
          </p>
        </CardContent>
      </Card>
                       <Card className="bg-slate-800">
        <CardContent className="p-2 text-center ">
          <h2 className="text-lg font-bold">Plataforma mais jogada</h2>
          <p className="text-3xl font-extrabold text-white">
            {resumo.plataforma}
          </p>
        </CardContent>
      </Card>
                             <Card className="bg-slate-800">
        <CardContent className="p-2 text-center ">
          <h2 className="text-lg font-bold">Gênero mais jogado</h2>
          <p className="text-3xl font-extrabold text-white">
            {resumo.genero}
          </p>
        </CardContent>
      </Card>
      </div>

      {/* Taxa de conclusão */}




      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gêneros */}

        <Card className="bg-slate-800">
          <CardContent className="p-4">
            <h2 className="text-lg font-bold mb-3">Gêneros Mais Jogados</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={generos}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {generos.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Plataformas */}
        <Card className="bg-slate-800">
          <CardContent className="p-4">
            <h2 className="text-lg font-bold mb-3">Plataformas Mais Jogadas</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={plataformas}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#6366F1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
            {/* Top jogos */}
      <Card className="bg-slate-800">
        <CardContent className="p-4">
          <h2 className="text-lg font-bold mb-3">Top 5 Jogos por Horas</h2>
          <ul className="space-y-2">
            {topJogos.map((jogo, i) => (
              <li
                key={i}
                className="flex justify-between border-b pb-1 last:border-none"
              >
                <span>{jogo.name}</span>
                <span className="font-semibold">{jogo.horas}h</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
