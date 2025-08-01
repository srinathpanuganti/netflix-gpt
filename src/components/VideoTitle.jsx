import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='w-screen aspect-video pt-[15%] px-12 absolute text-white bg-gradient-to-r from-black'>
      <h1 className='text-6xl font-bold'>{title}</h1>
      <p className='py-6 text-lg w-1/3'>{overview}</p>
      <div>
        <button className='bg-white text-black font-bold p-4 px-12 text-xl rounded-md hover:bg-white/60 '>►Play</button>
        <button className='mx-2 bg-gray-800/80 font-bold text-white p-4 px-12 text-xl rounded-md'>More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle
