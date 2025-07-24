import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import 'swiper/css';
import 'swiper/css/effect-cards';

import "./globals.css";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import Provider from "./provider";
import { serverAuth } from "./action-server/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Edventure",
  description: "Your adventure in learning starts here",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const { isAuthenticated } = await serverAuth();

  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Edventure" />
      </head>
      <body
        className={`antialiased min-h-screen flex flex-col justify-between w-full`}
      >
        <Provider>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
