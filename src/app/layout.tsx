import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "../components/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Venado - Rosario",
  description: "Develop by Gino Bartolucci",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className} >
        <Nav />
        <main className="container m-auto min-h-screen px-4">
          {children}
        </main>
        <footer className="text-center leading-[3rem] opacity-70 pt-[300px]">
          © {new Date().getFullYear()} Gino Bartolucci
        </footer>
      </body>
    </html>
  );
}
