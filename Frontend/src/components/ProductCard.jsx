import React, { useContext } from 'react'
import AllProductsContext from '../contexts/AllProductsContext';

export default function ProductCard(props) {
    // Destructure props
    // const {name, image, id, price} = props;
    const {product} = props;

    // Destructue context props
    const {currency} = useContext(AllProductsContext)
  return (
    <div className='w-[300px] max-w-[90%] h-[400px] bg-[#ffffff0a] backdrop-blur-lg rounded-lg hover:scale-[120%] flex flex-col items-start justify-start shrink-0 p-[10px] cursor-pointer border-[2px] border-[#80808049] transition-all ease-in-out' id={product._id}>
        <img src={product.image1} alt="Product Image" className='w-[100%] h-[80%] rounded-sm object-cover' />
        <div className='text-[#c3f6fa] text-[18px] py-[10px]'>{product.name}</div>
        <div className='text-[#f3fafa] text-[14px]'>{currency}{product.price}</div>
    </div>
  )
}
