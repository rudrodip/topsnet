import React, { useState, useEffect, useRef, FormEvent } from "react";
import { Text, X } from "lucide-react";
import { useChatContext } from "@context/ChatContext";
import { Button } from "@components/ui/button";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader } from "@components/ui/card";
import { Input } from "@components/ui/input";

interface ChatOptionsProps {
  recordDesc: string | undefined;
}

const ChatWindow = ({ recordDesc }: ChatOptionsProps) => {
  const { messages, addMessage, error, loading } = useChatContext();
  const [showChat, setShowChat] = useState(false);
  const [newMessage, setNewMessage] = useState("");
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
    if (recordDesc) {
      let prompt = `Here's the description of the paper: ${recordDesc}. Analyze it and give me insights`;
      addMessage(prompt);
    }
  };

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.trim() === "") {
      return;
    }
    addMessage(newMessage);
    setNewMessage("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleToggleChat = () => {
    setShowChat((prevShowChat) => !prevShowChat);
  };

  const scrollableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log('nice')
    if (scrollableRef.current) {
      scrollableRef.current.scrollIntoView(
        {
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest'
        })
    }
  }, [showChat])

  return (
    <div className="fixed bottom-8 right-8">
      <div className="flex items-center">
        <Button
          onClick={handleToggleChat}
          variant="outline"
          className="w-12 h-12 mr-2 mb-2 border-primary border-2"
          asChild
        >
          {showChat ? <X /> : <Text />}
        </Button>
        {showChat ? (
          <Button
            onClick={handleAnalyzePaper}
            variant="outline"
            className="mr-2 mb-2 h-12 border-primary border-2"
          >
            Analyze Paper
          </Button>
        ) : (
          ""
        )}
      </div>

      {showChat && (
        <Card className="w-[90vw] border-primary border-2">
          <CardHeader>
            <p className="font-heading text-xl text-center">TOPS-gpt: Your Research Assistant</p>
          </CardHeader>
          <ScrollArea className="h-[60vh] lg:h-[65vh]">
            <CardContent>
              <div className="space-y-4" ref={scrollableRef}>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                      message.role === "user"
                        ? "ml-auto bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p>{message.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </ScrollArea>
          <CardFooter>
            <form
              onSubmit={handleSendMessage}
              className="flex w-full items-center space-x-2 space-y-2"
            >
              <Input
                id="message"
                placeholder="Type your message..."
                className="flex-1"
                autoComplete="off"
                value={newMessage}
                onChange={handleInputChange}
                maxLength={200}
              />
              <Button
                type="submit"
                size="icon"
                disabled={newMessage.length === 0}
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default ChatWindow;
