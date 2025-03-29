import { Inter, Ubuntu_Mono, Press_Start_2P } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
});

const ubuntuMono = Ubuntu_Mono({
  subsets: ["latin"], //
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-press-start-2p",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${pressStart2P.variable}`}>
      <body className={ubuntuMono.className}>{children}</body>
    </html>
  );
}
