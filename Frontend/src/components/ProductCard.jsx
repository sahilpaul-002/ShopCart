import React, { useContext } from 'react'
import AllProductsContext from '../contexts/AllProductsContext';

export default function ProductCard(props) {
    // Destructure props
    const {name, image, id, price} = props;

    // Destructue context props
    const {currency} = useContext(AllProductsContext)
  return (
    <div className='w-[300px] max-w-[90%] h-[400px] bg-[#ffffff0a] backdrop-blur-lg rounded-lg hover:scale-[102%] flex flex-col items-start justify-start p-[10px] cursor-pointer border-[1px] border-[#80808049'>
        <img src="" alt="Product Image" className='w-[100%] h-[80%] rounded-sm object-cover' />
        <div className='text-[#c3f6fa] text-[18px] py-[10px]'>{name}</div>
        <div className='text-[#f3fafa] text-[14px]'>{currency}{ price}</div>
    </div>
  )
}
