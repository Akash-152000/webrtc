import React from 'react'

export const Home = () => {
  return (
    <div className='home-container'>
        <div className='container'>
            <input type="email" placeholder='Enter your email' />
            <input type="roomId" placeholder='Enter Room Id' />
            <button>Enter Room</button>
        </div>
    </div>
  )
}
