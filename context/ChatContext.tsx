import React, { createContext, useContext, useState, useCallback } from 'react';

interface Message {
  id: number;
  content: string;
  role: 'user' | 'ai';
}

interface ChatContextProps {
  messages: Message[];
  addMessage: (message: string) => void;
  clearMessages: () => void;
  loading: boolean;
  error: string | null;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const inital_message: Message = {
    id: 314,
    content: 'Hi! How can I assist you with this research paper?',
    role: 'ai'
  }
  const [messages, setMessages] = useState<Message[]>([inital_message]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addMessage = useCallback((message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: prevMessages.length + 1, content: message, role: 'user' },
      { id: prevMessages.length + 2, content: 'This feature will be coming soon. Stay tuned :)', role: 'ai' },
    ]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return (
    <ChatContext.Provider value={{ messages, addMessage, clearMessages, loading, error }}>
      {children}
    </ChatContext.Provider>
  );
};
