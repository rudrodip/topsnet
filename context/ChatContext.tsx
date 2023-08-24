'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getUserData } from '@src/firebase/getUserData';
import { useAuthContext } from './AuthContext';
import OpenAI from 'openai';

interface Message {
  id: number;
  content: string;
  role: 'user' | 'assistant';
}

interface ResponseMessage {
  role: 'user' | 'assistant',
  content: string
}

interface ChatContextProps {
  messages: Message[];
  addMessage: (message: string) => void;
  clearMessages: () => void;
  loading: boolean;
  error: string | null;
}

interface UserData {
  liked: number[],
  pinned: number[],
  recommended: number[],
  openaikey?: string,
  orcid?: string,
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
    id: 0,
    content: 'Hi! How can I assist you with this research paper? Please click on analyze paper to get the full explaination of this paper.',
    role: 'assistant'
  }
  const [messages, setMessages] = useState<Message[]>([inital_message]);
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext()

  useEffect(() => {
    setLoading(true);
    setError(null);
    getUserData(user)
      .then((snapshot) => {
        setUserData(snapshot);
      })
      .catch((err) => {
        setError('Error fetching user data');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  const addMessage = useCallback(async (message: string) => {
    if (!userData?.openaikey) {
      return;
    }

    try {
      setLoading(true);
      const openai = new OpenAI({
        apiKey: userData.openaikey,
        dangerouslyAllowBrowser: true
      });

      let allMessages: ResponseMessage[] = []
      messages.map(msg => {
        allMessages.push({ role: msg.role, content: msg.content })
      })
      const response = await openai.chat.completions.create({
        messages: [
          ...allMessages,
          { role: 'user', content: message },
        ],
        model: 'gpt-3.5-turbo',
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, content: message, role: 'user' },
        { id: prevMessages.length + 2, content: `${response.choices[0].message.content}`, role: 'assistant' },
      ]);
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [userData]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const contextValue: ChatContextProps = {
    messages,
    addMessage,
    clearMessages,
    loading,
    error,
  };


  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};
