import React from 'react'

export default function itemButton(props) {
    const {text, isActive} = props;

  return (
    <div className={`item-button text-[15px] hover:bg-[#a02949] hover:border-[1px] border-white cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-[20px] ${isActive ? 'bg-red-500' : ''}`}>
        {text}
    </div>
  )
}