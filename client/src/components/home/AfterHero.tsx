import React from 'react'
import { HomeImg1, HomeImg2 } from '../../../public';
import Image from 'next/image';

const AfterHero = () => {
  return (
    <div className='w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 px-6 min-h-[50vh]'>
          <div className='flex flex-col items-center lg:items-start w-full lg:w-2/3 lg:h-full'>
            <Image src={HomeImg1} alt='hero' />
        </div>
          <div className='flex flex-col items-center lg:items-start w-full lg:w-1/3 lg:h-full'>
            <Image src={HomeImg2} alt='hero' />
        </div>
    </div>
  )
}

export default AfterHero
