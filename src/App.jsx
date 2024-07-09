import Header from './components/Header';
import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [thread, setThread] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchThreadId = async () => {
      try {
        const response = await fetch('https://api-hotelbuddy.onrender.com/thread');
        if (!response.ok) {
          throw new Error('Failed to fetch thread ID');
        }
        const data = await response.json();
        setThread(data);
      } catch (error) {
        console.error('Error fetching thread ID:', error);
        setError('Failed to fetch thread ID. Please try again later.');
      }
    };

    fetchThreadId();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        {thread ? (
          <ChatWindow threadId={thread.threadId} messages={messages} setMessages={setMessages} />
        ) : (
          <div>Loading ...</div>
        )}
      </div>
    </div>
  );
};

export default App;
