import React, { useRef, useEffect } from 'react';
import {marked} from 'marked';

const Message = ({ id, text, sender }) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const parsedText = marked.parse(text);
      textRef.current.innerHTML = parsedText;
    }
  }, [text]);

  return (
    <div key={id} className={`my-2 p-2 px-4 rounded max-w-xl ${sender === 'user' ? 'bg-blue-200 self-end' : 'bg-gray-200 self-start'}`}>
      <pre className='w-fit text-wrap text-left font-sans' ref={textRef}></pre>
    </div>
  );
};

export default Message;
