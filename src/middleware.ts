import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/jwt";
import jwt from "jsonwebtoken";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1) Se for rota de API, deixa passar
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // 2) Define rotas públicas
  const PUBLIC_ROUTES = ["/login", "/register"];
  const isPublicRoute = PUBLIC_ROUTES.some((r) => pathname.startsWith(r));
  //console.log("isPublicRoute ==> ", isPublicRoute);

  // 3) Lê o token do cookie
  const token = request.cookies.get("token")?.value;
  //console.log("token ==> ", token);

  // 4) Usuário logado tentando acessar login/register → envia para home
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 5) Usuário não logado tentando acessar rota protegida → envia para login
  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 6) Se tiver token, verifica validade
  if (token) {
    await console.log("middleware token ==> ", token);

    const payload = await verifyToken(token);
    console.log("payload ==> ", payload);

    if (!payload) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Token ok → segue
    return NextResponse.next();
  }

  // 7) Padrão: libera
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Aplica o middleware a tudo, exceto:
     * - estáticos do Next
     * - imagens
     * - favicon, robots, sitemap
     * - rotas de API
     */
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api/).*)",
  ],
};
