import React from 'react'

export default function Title(props) {
    // Destructure props
    const {text1, text2} = props;

  return (
    <div className='title inline-flex items-center  text-center mb-3 text-[30px] md:text-[48px]'>
        <p className="text-blue-200 flex justify-between items-center gap-[20px]">
            {text1}
            <span className='text-[#a5faf7]'>{text2}</span>
        </p>
    </div>
  )
}
