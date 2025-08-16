import React from 'react'
import generateUnique5Numbers from '../utils/RandomNumGenerator0to15';
import fashionHeroImages from '../utils/FashionHeroImages';

export default function Background(props) {
    // Destructuring props
    const {heroCount} = props

    // Generate 5 unique numbers
    const randomNumbers = generateUnique5Numbers()

  return (
    <>
      {heroCount === 0 && (
        <img src={fashionHeroImages[randomNumbers[heroCount]]} alt="" className='w-[600px] h-[100%] float-right  object-fill'/>
      )}
      {heroCount === 1 && (
        <img src={fashionHeroImages[randomNumbers[heroCount]]} alt="" className='w-[600px] h-[100%] float-right  object-fill'/>
      )}
      {heroCount === 2 && (
        <img src={fashionHeroImages[randomNumbers[heroCount]]} alt="" className='w-[600px] h-[100%] float-right  object-fill'/>
      )}
      {heroCount === 3 && (
        <img src={fashionHeroImages[randomNumbers[heroCount]]} alt="" className='w-[600px] h-[100%] float-right  object-fill'/>
      )}
      {heroCount === 4 && (
        <img src={fashionHeroImages[randomNumbers[heroCount]]} alt="" className='w-[600px] h-[100%] float-right  object-fill'/>
      )}
      {heroCount === 5 && (
        <img src={fashionHeroImages[randomNumbers[heroCount]]} alt="" className='w-[600px] h-[100%] float-right  object-fill'/>
      )}
    </>
  )
}
