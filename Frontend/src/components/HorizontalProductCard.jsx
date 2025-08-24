import React, { useContext } from 'react'
import AllProductsContext from '../contexts/AllProductsContext';

export default function ProductCard(props) {
    // Destructure props
    // const {name, image, id, price} = props;
    const { product } = props;

    // Destructue context props
    const { currency } = useContext(AllProductsContext)
    return (
        <div className='w-[70vw] max-w-[90%] h-[130px] bg-[#ffffff0a] backdrop-blur-lg rounded-lg hover:scale-[110%] flex items-start justify-between shrink-0 p-[10px] cursor-pointer border-[2px] border-[#80808049] transition-all ease-in-out' id={product._id}>
            <div className="flex justify-start items-start gap-[20px] relative">
                <img src={product.image1} alt="Product Image" className='w-[60px] h-[100px] rounded-sm object-cover' />
                <div className="flex flex-col justify-start items-start gap-[5px]">
                    <div className='text-[#c3f6fa] text-[18px] pb-[5px]'>{product.name}</div>
                    <div className="flex justify-center intems-center gap-[20px]">
                        <div className='text-[#f3fafa] text-[14px]'>{product.category}</div>
                        <div className='w-[10px] h-[20px] flex justify-center items-center text-[#f3fafa] font-bold'>-</div>
                        <div className='text-[#f3fafa] text-[14px]'>{product.subCategory}</div>
                    </div>
                    <div className='text-[#f3fafa] text-[14px]'>{currency}{product.price}</div>
                </div>
            </div>
            {product.bestSeller ? (
                <span className="!px-[2px] !py-[1px] !mb-[0.5rem] !rounded-[2px] !bg-gray-200 !text-red-500 !text-[12px] absolute top-2 right-5">
                    Bestseller
                </span>
            ) : null};
        </div>
    )
}