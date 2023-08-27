'use client'

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
      <ChatProvider>
      {children}
      </ChatProvider>
    </>
  )
}