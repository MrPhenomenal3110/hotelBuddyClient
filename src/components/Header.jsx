import React from 'react'

function Header() {
  return (
    <div className='w-full mb-4 bg-gradient-to-r fixed z-[1000] shadow-xl from-violet-700 to-blue-700 flex items-center justify-center h-[8vh]'>
        <h2 className='text-white font-headerFont text-4xl'>HotelBuddy</h2>
    </div>
  )
}

export default Header;