import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title';
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from '../components/CartTotal';
import AllProductsContext from '../contexts/AllProductsContext';
import UserCartContext from '../contexts/UserCartContext';

export default function Cart() {
    const { products, currency } = useContext(AllProductsContext)
    const { cartProducts, updateCartDetails } = useContext(UserCartContext)
    const [cartData, setCartData] = useState([])
    const [quantities, setQuantities] = useState({})
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

        // sync cart quantities into local state
        const initialQuantities = {};
        tempData.forEach((item) => {
            initialQuantities[item._id + "_" + item.size] = item.quantity;
        });
        setQuantities(initialQuantities);
    }, [cartProducts]);

    // Handle input change
    const handleQuantityChange = (id, size, val) => {
        const key = id + "_" + size;
        // Allow empty string (backspace typing)
        if (val === "" || Number(val) === 0) {
            setQuantities((prev) => ({ ...prev, [key]: val }));
            return;
        }
        // If valid positive number, update both local + context
        const numVal = Number(val);
        if (numVal > 0) {
            setQuantities((prev) => ({ ...prev, [key]: numVal }));
            updateCartDetails(id, size, numVal);
        }
    };

    // Handle blur (when user leaves input field)
    const handleBlur = (id, size) => {
        const key = id + "_" + size;
        const val = quantities[key];
        if (val === "" || Number(val) < 1) {
            setQuantities((prev) => ({ ...prev, [key]: 1 }));
            updateCartDetails(id, size, 1);
        }
    };

    return (
        <div className='w-[100vw] min-h-[100vh] p-[20px] overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025] '>
            <div className='h-[8%] w-[100%] text-center mt-[80px]'>
                <Title text1={'YOUR'} text2={'CART'} />
            </div>

            <div className="flex flex-col gap-[20px]">
                {cartData.map((cartProduct, index) => {
                    const productData = products?.find((product) => product._id === cartProduct._id);
                    if (!productData) return null;

                    const key = cartProduct._id + "_" + cartProduct.size;
                    const quantity = quantities[key] ?? cartProduct.quantity;

                    return (
                        <div key={index} className='w-[100%] h-[10%] border-t border-b'>
                            <div className='w-[100%] h-[80%] flex justify-start items-start gap-6 bg-[#51808048] py-[10px] px-[20px] rounded-2xl relative'>
                                <img className='w-[120px] h-[150px] rounded-md object-fit' src={productData.image1} alt="Product Image" />
                                <div className='flex items-start justify-center flex-col gap-[10px]'>
                                    <p className='md:text-[25px] text-[20px] text-[#f3f9fc]'>{productData.name}</p>
                                    <div className='w-[40vw] mg:w-[60vw] flex justify-between items-center gap-[20px]'>
                                        <div className="">
                                            <p className='text-[20px] text-[#aaf4e7] hidden md:block'>Price {currency} {productData.price}</p>
                                            <p className='text-[20px] text-[#aaf4e7] block md:hidden'>{currency} {productData.price}</p>
                                        </div>
                                        <div className="w-[30%] flex justify-start items-center gap-[10px]">
                                            <p className='text-[20px] text-[#aaf4e7] hidden md:block'>Size</p>
                                            <p className='w-[40px] h-[40px] text-[16px] text-white bg-[#518080b4] rounded-md mt-[5px] flex items-center justify-center border-[1px] border-[#9ff9f9]'>{cartProduct.size}</p>
                                        </div>
                                    </div>
                                    <div className="w-[40vw] flex justify-start items-start gap-[10px]">
                                        <p className='text-[20px] text-[#aaf4e7] !pt-[4px] !m-0'>Quantity</p>
                                        <input
                                            type="number"
                                            min={1}
                                            placeholder="At least 1"
                                            value={quantity}
                                            className="w-[10vw] md:w-[15vw] md:px-2 md:py-2 py-[5px] px-[10px] text-white text-[18px] font-semibold bg-[#518080b4] border-[1px] border-[#9ff9f9] rounded-md"
                                            onChange={(e) => handleQuantityChange(cartProduct._id, cartProduct.size, e.target.value)}
                                            onBlur={() => handleBlur(cartProduct._id, cartProduct.size)}
                                        />
                                    </div>
                                </div>
                                <RiDeleteBin6Line
                                    className='text-[#9ff9f9] w-[25px] h-[25px] absolute bottom-4 right-5 md:top-[50%] md:right-[5%] cursor-pointer'
                                    onClick={() => updateCartDetails(cartProduct._id, cartProduct.size, 0)}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className='flex justify-start items-end my-20'>
                <div className='w-full sm:w-[450px] flex flex-col justify-center items-center gap-[30px]'>
                    <CartTotal />
                    <button
                        className='text-[18px] hover:bg-slate-500 cursor-pointer bg-[#51808048] py-[10px] px-[50px] rounded-2xl text-white flex items-center justify-center gap-[20px] border-[1px] border-[#80808049] ml-[30px] mt-[20px]'
                        // onClick={() => {
                        //     if (cartData.length > 0) {
                        //         navigate("/placeorder");
                        //     } else {
                        //         console.log("Your cart is empty!");
                        //     }
                        // }}
                    >
                        PROCEED TO CHECKOUT
                    </button>
                </div>
            </div>
        </div >
    )
}
