import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import sendMessage from '../services/sendMessage.js';
import IntroCards from './IntroCards';

const ChatWindow = ({ threadId, messages, setMessages }) => {
  const [userInput, setUserInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showIntroCards, setShowIntroCards] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const prompts = [
    {
      heading: "I can get the details of available rooms",
      prompt: "Show me available rooms.",
    },
    {
      heading: "I can book a room from all the available rooms for you.",
      prompt: "I want to book a room.",
    },
    {
      heading: "I can get the details of a booking you made.",
      prompt: "Get booking details.",
    },
    {
      heading: "I can cancel a booking you made",
      prompt: "I want to cancel a booking.",
    },
  ];

  useEffect(() => {
    scrollToBottom();
    inputRef.current.focus();
  }, [messages]);
  useEffect(() => {
    handleSend();
  }, [!showIntroCards])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (userInput.trim()) {
      const newMessage = {
        id: Date.now(),
        message: userInput,
        role: 'user',
      };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setUserInput('');
      setIsSending(true);
      setShowIntroCards(false);

      try {
        if (!threadId) {
          throw new Error('Thread ID is not available.');
        }

        const response = await sendMessage(userInput, threadId);
        setMessages(response);
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages(updatedMessages);
      } finally {
        setIsSending(false);
      }
    }
  };

  const handleCloseIntroCards = async (prompt) => {
    setUserInput(prompt);
    setShowIntroCards(false);
  };

  return (
    <div className={`w-full relative top-[8vh] flex flex-col h-[83vh] overflow-y-auto flex-1 ${isSending? 'cursor-wait' : 'cursor-default'}`}>
      {showIntroCards ? (
        <IntroCards onClose={handleCloseIntroCards} prompts={prompts} />
      ) : (
        <>
          {messages.map((msg) => (
            <div
              className={`p-4 h-fit ${msg.role === 'user' ? 'self-end' : 'self-start'}`}
              key={msg.id}
            >
              <Message text={msg.message} sender={msg.role} />
            </div>
          ))}
          <div ref={messagesEndRef} />
        </>
      )}
      <div className="flex bg-[#242424] z-100 w-full fixed bottom-0 p-4 border-t min-h-[8vh] border-gray-300">
        <input
          type="text"
          ref={inputRef}
          value={userInput || ''}
          placeholder='Enter your input'
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 p-2 border border-gray-300 rounded"
          disabled={isSending}
        />
        <button
          onClick={handleSend}
          className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          disabled={isSending}
        >
          {isSending ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
