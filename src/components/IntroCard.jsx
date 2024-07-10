import React from 'react'

function IntroCard({ heading }) {
  return (
    <div className="hover:scale-105 shadow-md pers shadow-purple-500 transition-all duration-500 bg-white max-w-[50vw] min-w-[50vw] md:max-w-[30vw] md:min-w-[30vw] border-none rounded-lg p-5 mb-5">
        <h3 className="text-md md:text-xl text-center font-semibold mb-2">{heading}</h3>
    </div>
  )
}

export default IntroCard;