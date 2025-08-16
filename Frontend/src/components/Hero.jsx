import React from 'react'
import { FaCircle } from "react-icons/fa";

export default function Hero(props) {
    // Destructuring props
    const {heroData, heroCount, setHeroCount} = props;

  return (
    <div className='w-[80%] md:w-[30%] lg:w-[40%] h-[100%] relative'>
        <div className='text-black md:!text-[#a8e2f1] lg:!text-[#a8e2f1] text-[20px] md:text-[30px] lg:text-[40px] absolute left-[10%] bottom-[200px] md:left-[20px] md:top-[100px]'>
            <p className='backdrop-blur-md xl:backdrop-blur-none pb-[10px]'>{heroData.text1}</p>
            <p className='backdrop-blur-md xl:backdrop-blur-none pt-[10px]'>{heroData.text2}</p>
        </div>
        <div className='bottom-[100px] left-[10%] absolute md:left-[50px] md:top-[300px] flex items-center justify-center gap-[10px]'>
            <FaCircle className={`w-[14px] cursor-pointer ${heroCount===0 ? 'fill-orange-400' : 'fill-white'}`} onClick={() => {setHeroCount(0)}}/>
            <FaCircle className={`w-[14px] cursor-pointer ${heroCount===1 ? 'fill-orange-400' : 'fill-white'}`} onClick={() => {setHeroCount(1)}}/>
            <FaCircle className={`w-[14px] cursor-pointer ${heroCount===2 ? 'fill-orange-400' : 'fill-white'}`} onClick={() => {setHeroCount(2)}}/>
            <FaCircle className={`w-[14px] cursor-pointer ${heroCount===3 ? 'fill-orange-400' : 'fill-white'}`} onClick={() => {setHeroCount(3)}}/>
            <FaCircle className={`w-[14px] cursor-pointer ${heroCount===4 ? 'fill-orange-400' : 'fill-white'}`} onClick={() => {setHeroCount(4)}}/>
        </div>
    </div>
  )
}
