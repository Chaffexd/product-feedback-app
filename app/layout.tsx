"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Providers from './store/Providers';

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} px-24 pt-20 flex gap-8 bg-grey`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
