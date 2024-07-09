import React, { useState } from 'react';
import Message from './Message';
import sendMessage from '../services/sendMessage.js';

const ChatWindow = ({ messages, setMessages }) => {
  const [userInput, setUserInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  let id = 1;
  const handleSend = async () => {
    if (userInput.trim()) {
      const newMessage = {
        id: id,
        message: userInput,
        role: 'user',
      };
      id++;
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setUserInput('');
      setIsSending(true);

      try {
        const response = await sendMessage(userInput);
        setMessages(response);
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages(updatedMessages);
      } finally {
        setIsSending(false);
      }
    }
  };

  return (
      <div className="w-full relative top-[8vh] flex flex-col h-[83vh] overflow-y-auto flex-1">
        {messages.map((msg) => (
          msg.role === 'user' ?
          <div className="p-4 h-fit self-end">
            <Message key={msg.id} text={msg.message} sender={msg.role} />
          </div>
          :
          <div className="p-4 h-fit self-start">
            <Message key={msg.id} text={msg.message} sender={msg.role} />
          </div>
          
        ))}
      <div className="flex bg-[#242424] z-100 w-full fixed bottom-0 p-4 border-t min-h-[8vh] border-gray-300">
        <input
          type="text"
          value={userInput}
          placeholder='Enter your input'
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 p-2 border border-gray-300 rounded"
          disabled={isSending}
        />
        <button
          onClick={handleSend}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
          disabled={isSending}
        >
          {isSending ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
