import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { Text, X } from 'lucide-react';
import { useChatContext } from '@context/ChatContext';

interface ChatOptionsProps {
  recordDesc: string | undefined
}

const ChatWindow = ({ recordDesc }: ChatOptionsProps) => {
  const { messages, addMessage, error, loading } = useChatContext();
  const [showChat, setShowChat] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Always scroll to the bottom when a new message is added
    if (chatWindowRef.current && showChat) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages, showChat]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewMessage(e.target.value);
  };

  const handleAnalyzePaper = () => {
    if (recordDesc){
      let prompt = `Here's the description of the paper: ${recordDesc}. Analyze it and give me insights`
      addMessage(prompt);
    }
  }

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.trim() === '') {
      return;
    }
    addMessage(newMessage);
    setNewMessage('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleToggleChat = () => {
    setShowChat((prevShowChat) => !prevShowChat);
  };

  return (
    <div className="fixed bottom-8 right-8">
      <div className='flex items-center'>
        <button
          className="my-5 bg-secondary text-white rounded-full w-12 h-12 flex justify-center items-center"
          onClick={handleToggleChat}
        >
          {showChat ? <X /> : <Text />}
        </button>
        {showChat ?
          <button
            className="bg-cyan-500 text-white px-3 py-1 ml-3 rounded-md"
            onClick={handleAnalyzePaper}
          >
            Analyze Paper
          </button>

          : ''
        }
      </div>

      {showChat && (
        <div
          className={`chat-window bg-gray-800 border rounded-lg p-4 w-80 md:w-96 h-96 text-white overflow-y-auto`}
          ref={chatWindowRef}
        >
          <div className={`flex-1 mb-2`}>
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`mb-2 ${message.role == 'assistant' ? 'ml-8' : 'mr-8'} ${index === messages.length - 1 ? 'mt-2' : ''
                  }`}
              >
                <div
                  className={`rounded-lg p-3 ${message.role == 'assistant' ? 'bg-gray-700' : 'bg-blue-500'}`}
                >
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
            {loading ? <div
              className='rounded-lg p-3 bg-gray-700'
            >
              <p>Loading...</p>
            </div> : ''}
            {error ? <div
              className='rounded-lg p-3 bg-red-500'
            >
              <p>{error}</p>
            </div> : ''}
          </div>
          <form className="flex mt-2 flex-wrap justify-between" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={newMessage}
              onChange={handleInputChange}
              ref={inputRef}
              className="rounded-md border p-2 mr-2 bg-gray-700 text-white outline-none"
              placeholder="Type your message..."
              maxLength={50}
            />
            <button
              type='submit'
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
