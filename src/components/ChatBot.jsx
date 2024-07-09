import React, { useState } from 'react';
import ChatWindow from './ChatWindow';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages((messages) => [...messages, message]);
  };

  return (
    <div className="w-full h-screen p-4 bg-[#0f172a] bg-gradient-to-r from-[#0f172a] to-[#161b21]  rounded-lg flex flex-col overflow-hidden">
      <ChatWindow messages={messages} addMessage={addMessage} />
    </div>
  );
};

export default Chatbot;
