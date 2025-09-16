// src/middleware.ts




import { NextRequest, NextResponse } from 'next/server'




export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const PUBLIC_ROUTES = ["/login", "/register"];
const isPublicRoute = PUBLIC_ROUTES.some(r => pathname.startsWith(r))





const token = request.cookies.get('token')
console.log("token middleware==> ", token);


  // 🔑 Se está em rota pública, nunca redireciona por causa do cookie
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Se não é rota pública e não tem token, joga pro login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

// Se tem token → deixa passar (validação real acontece no backend)




  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
