import { Roboto, Ubuntu_Mono, Press_Start_2P } from "next/font/google";
import "@/styles/globals.css";

const ubuntuMono = Ubuntu_Mono({
  subsets: ["latin"], //
  weight: ["400", "700"],
  style: ["normal", "italic"],
});
const roboto = Roboto({
  subsets: ["latin"], //
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
});
export const pressStart2P = Press_Start_2P({
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
    <html lang="en" className={`${pressStart2P.variable} ${roboto.variable}`}>
      <body>{children}</body>
    </html>
  );
}
