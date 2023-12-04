"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./store/Providers";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} xl:px-52 sm:px-32 sm:pt-20 flex lg:flex-row flex-col gap-8 bg-grey sm:px-16 px-0 py-0`}>
        <SessionProvider>
          <Providers>{children}</Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
