// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongoose";
import { User } from "@/models/User";
import { generateToken } from "@/utils/jwt";

export async function POST(req: NextRequest) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  console.log("user ==> ", user);
  if (!user)
    return NextResponse.json({ error: "Usuário não encontrado!" }, { status: 401 });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid)
    return NextResponse.json({ error: "Credenciais inválidas!" }, { status: 401 });

  const token = await generateToken(user._id.toString(), user.role);
  console.log("login post route token ==> ", token);

  // Em vez de redirect, apenas retorna JSON e seta o cookie:
  const res = NextResponse.json({ message: "Login bem-sucedido" });
  res.cookies.set("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return res;
}
