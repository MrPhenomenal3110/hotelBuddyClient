// IntroCards.jsx
import React from 'react';
import IntroCard from './IntroCard';

const IntroCards = ({ onClose, prompts }) => {  
  return (
    <div className='h-fit w-full flex flex-col items-center justify-center p-12'>
        <div>
            <h2 className='text-slate-300 text-center text-sm md:text-xl'>💫👋 Hello, there ! How may I help you today ?!</h2>
        </div>
        <div className="flex flex-col items-center justify-center h-full p-5 bg-[#242424]">
            {prompts.map(({heading, prompt})=> {
                return (
                    <div className='cursor-pointer' onClick={async() => {await onClose(prompt)}}>
                        <IntroCard heading={heading}/>
                    </div>
                )
            })}
        </div>
    </div>
  );
};

export default IntroCards;
