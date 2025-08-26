import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title';
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri";
// import CartTotal from '../component/CartTotal';
import AllProductsContext from '../contexts/AllProductsContext';
import UserCartContext from '../contexts/UserCartContext';

export default function Cart() {
    const { products, currency } = useContext(AllProductsContext)
    const { cartProducts, updateCartDetails } = useContext(UserCartContext)
    const [cartData, setCartData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const tempData = [];
        for (const productId in cartProducts) {
            for (const size in cartProducts[productId]) {
                if (cartProducts[productId][size] > 0) {
                    tempData.push({
                        _id: productId,
                        size: size,
                        quantity: cartProducts[productId][size],
                    });
                }
            }
        }
        setCartData(tempData);
    }, [cartProducts]);

    return (
        <div className='w-[100vw] min-h-[100vh] p-[20px] overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025] '>
            <div className='h-[8%] w-[100%] text-center mt-[80px]'>
                <Title text1={'YOUR'} text2={'CART'} />
            </div>

            <div className='w-[100%] h-[92%] flex flex-wrap gap-[20px]'>
                {
                    cartData.map((cartProduct, index) => {
                        const productData = products.find((product) => product._id === cartProduct._id);

                        return (
                            <div key={cartProduct._id} className='w-[100%] h-[10%] border-t border-b  '>
                                <div className='w-[100%] h-[80%] flex items-start gap-6 bg-[#51808048]  py-[10px] px-[20px] rounded-2xl relative '>
                                    <img className='w-[100px] h-[100px] rounded-md ' src={productData.image1} alt="" />
                                    <div className='flex items-start justify-center flex-col gap-[10px]'>
                                        <p className='md:text-[25px] text-[20px] text-[#f3f9fc]'>{productData.name}</p>
                                        <div className='flex items-center   gap-[20px]'>
                                            <p className='text-[20px] text-[#aaf4e7]'>{currency} {productData.price}</p>
                                            <p className='w-[40px] h-[40px] text-[16px] text-[white] bg-[#518080b4] rounded-md mt-[5px] flex items-center justify-center border-[1px] border-[#9ff9f9]'>{cartProduct.size}</p>
                                        </div>
                                    </div>
                                    <input type="number" min={1} defaultValue={cartProduct.quantity} className=' md:max-w-20 max-w-10 md:px-2 md:py-2 py-[5px] px-[10px] text-[white] text-[18px] font-semibold bg-[#518080b4] absolute md:top-[40%] top-[46%] left-[75%] md:left-[50%] border-[1px] border-[#9ff9f9] rounded-md ' onChange={(e) => (e.target.value === ' ' || e.target.value === '0') ? null : updateCartDetails(cartProduct._id, cartProduct.size, Number(e.target.value))} />

                                    <RiDeleteBin6Line className='text-[#9ff9f9] w-[25px] h-[25px] absolute top-[50%] md:top-[40%] md:right-[5%] right-1' onClick={() => updateCartDetails(cartProduct._id, cartProduct.size, 0)} />
                                </div>

                            </div>
                        )
                    })
                }
            </div>

            <div className='flex justify-start items-end my-20'>
                <div className='w-full sm:w-[450px]'>
                    <CartTotal />
                    <button className='text-[18px] hover:bg-slate-500 cursor-pointer bg-[#51808048] py-[10px] px-[50px] rounded-2xl text-white flex items-center justify-center gap-[20px]  border-[1px] border-[#80808049] ml-[30px] mt-[20px]' onClick={() => {
                        if (cartData.length > 0) {
                            navigate("/placeorder");
                        } else {
                            console.log("Your cart is empty!");
                        }
                    }}>
                        PROCEED TO CHECKOUT
                    </button>
                </div>
            </div>

        </div>
    )
}
