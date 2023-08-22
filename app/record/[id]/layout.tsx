'use client'

import Navbar from "@components/Navbar";
import { ChatProvider } from "@context/ChatContext";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <div className="main">
        <div className="gradient" />
      </div>
      <Navbar />
      <ChatProvider>
      {children}
      </ChatProvider>
    </>
  )
}