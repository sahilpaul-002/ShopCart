import React from 'react'

export default function Title(props) {
    // Destructure props
    const {text1, text2} = props;

  return (
    <div className='title inline-flex gap-2 items-center text-center mb-3 text-[30px] md:text-[48px]'>
        <p className="text-blue-200">
            {text1}
            <span className='text-[#a5faf7]'>{text2}</span>
        </p>
    </div>
  )
}
