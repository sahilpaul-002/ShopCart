import React from 'react'

export default function itemButton(props) {
    const text = props.text;

  return (
    <div className='item-button text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-[20px]'>
        {text}
    </div>
  )
}
