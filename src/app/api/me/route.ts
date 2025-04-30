import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  const token = cookies().get("session")?.value;
  console.log("token api/me ==> ", token);

  if (!token) {
    return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("decoded ==> ", decoded);
    return NextResponse.json({ user: decoded });
  } catch {
    return NextResponse.json({ message: "Token inválido" }, { status: 401 });
  }
}
