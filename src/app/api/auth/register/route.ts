import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { connectDB } from "@/lib/mongoose";
import { User } from "@/models/User";

export async function POST(req: NextRequest) {
  await connectDB();
  const { username, email, password, role } = await req.json();

  const existing = await User.findOne({ email });
  if (existing) return NextResponse.json({ error: "Email já cadastrado" }, { status: 409 });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword, role });
  await newUser.save();

  return NextResponse.json({ message: "Usuário registrado com sucesso!" }, { status: 201 });
}
