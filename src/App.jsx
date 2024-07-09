import Header from './components/Header';
import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';

const App = () => {
  const [messages, setMessages] = useState([]);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <ChatWindow messages={messages} setMessages={setMessages} />
      </div>
    </div>
  );
};

export default App;
