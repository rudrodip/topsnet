'use client'

import Navbar from "@components/Navbar";

interface RootLayoutProps {
  children: React.ReactNode;
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
          <Navbar />
          {children}
        </body>
      </html>
    </>
  )
}