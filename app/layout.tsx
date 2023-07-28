import "@styles/globals.css";
import type { Metadata } from 'next'
import React from 'react';
import { AuthContextProvider } from "@context/AuthContext";
import { ExplorerContextProvider } from "@context/ExplorerContext";
import { Toaster } from "@components/ui/toaster"

interface RootLayoutProps {
  children: React.ReactNode;
}


export const metadata: Metadata = {
  title: 'TOPSnet',
  description: 'The TOPSnet is a web-based platform that facilitates collaborative research among researchers, scientists, and students from diverse backgrounds and institutions. The platform aims to promote open science practices, foster inclusivity, and accelerate scientific discovery through shared knowledge and resources.',
  icons: {
    icon: '/assets/icons/logo.png',
  }
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body suppressHydrationWarning={true}>
          <div className="main">
            <div className="gradient" />
          </div>
          <AuthContextProvider>
            <ExplorerContextProvider>
              {children}
            </ExplorerContextProvider>
          </AuthContextProvider>
          <Toaster />
        </body>
      </html>
    </>
  )
}
