import "@styles/globals.css";
import { ThemeProvider } from "@components/theme-provider";
import type { Metadata } from "next";
import React from "react";
import { AuthContextProvider } from "@context/AuthContext";
import { ExplorerContextProvider } from "@context/ExplorerContext";
import { Toaster } from "@components/ui/toaster";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { cn } from "@lib/utils";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: "../public/assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "TOPSnet",
  description:
    "The TOPSnet is a web-based platform that facilitates collaborative research among researchers, scientists, and students from diverse backgrounds and institutions. The platform aims to promote open science practices, foster inclusivity, and accelerate scientific discovery through shared knowledge and resources.",
  icons: {
    icon: "/assets/icons/logo.png",
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={cn(inter.variable, fontHeading.variable)}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <div className="flex flex-col min-h-screen">
              <div className="flex-grow">
                <div className="main">
                  <div className="gradient" />
                </div>
                <AuthContextProvider>
                  <ExplorerContextProvider>
                    <Navbar />
                    {children}
                    <Footer />
                  </ExplorerContextProvider>
                </AuthContextProvider>
                <Toaster />
              </div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
