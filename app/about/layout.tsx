'use client'

import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

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
          <Footer />
        </body>
      </html>
    </>
  )
}