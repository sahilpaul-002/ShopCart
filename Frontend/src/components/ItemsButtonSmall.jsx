import React from 'react'

export default function itemButton(props) {
    const text = props.text;

  return (
    <div className='item-button text-[15px] hover:bg-[#4a8a6a] cursor-pointer bg-[#000000c9] py-[8px] px-[15px] rounded-[20px]'>
        {text}
    </div>
  )
}