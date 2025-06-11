import React from 'react'

const Shimmer_card = () => {
  return (
     <div className='bg-gray-200 animate-pulse flex flex-col items-center justify-center mx-2 w-30 h-55 sm:w-60 sm:h-60 px-5 border-2 rounded-lg'>
      <div className='w-full h-[40%] bg-gray-300 mb-2'></div>
      <div className='w-3/4 h-4 bg-gray-300 mb-2'></div>
      <div className='w-1/2 h-4 bg-gray-300 mb-4'></div>
      <div className='w-[80%] h-8 bg-gray-300'></div>
    </div>
  )
}

export default Shimmer_card