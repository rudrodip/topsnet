import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { Text, X } from 'lucide-react';
import { useChatContext } from '@context/ChatContext';

const ChatWindow: React.FC = () => {
  const { messages, addMessage } = useChatContext();
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
      <button
        className="my-5 bg-secondary text-white rounded-full w-12 h-12 flex justify-center items-center"
        onClick={handleToggleChat}
      >
        {showChat ? <X /> : <Text />}
      </button>
      {showChat && (
        <div
          className={`chat-window bg-gray-800 border rounded-lg p-4 w-96 h-96 text-white overflow-y-auto`}
          ref={chatWindowRef}
        >
          <div className={`flex-1 mb-2`}>
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`mb-2 ${message.role == 'ai' ? 'ml-8' : 'mr-8'} ${index === messages.length - 1 ? 'mt-2' : ''
                  }`}
              >
                <div
                  className={`rounded-lg p-3 ${message.role == 'ai' ? 'bg-gray-700' : 'bg-blue-500'}`}
                >
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
          </div>
          <form className="flex mt-2 flex-wrap justify-between" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={newMessage}
              onChange={handleInputChange}
              ref={inputRef}
              className="rounded-md border p-2 mr-2 bg-gray-700 text-white outline-none"
              placeholder="Type your message..."
            />
            <button
              type='submit'
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
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
