import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import AllProductsContext from '../contexts/AllProductsContext';
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from '../components/RelatedProduct';
import UserCartContext from '../contexts/UserCartContext';
// import Loading from '../component/Loading';

function ProductDetail() {
    const location = useLocation();

    // Destructure query params and context props
    let { productId } = useParams()
    // let { products, currency, addToCart, loading } = useContext(AllProductsContext)
    let { products, currency } = useContext(AllProductsContext)
    const {addToCart, loading} = useContext(UserCartContext);
    let [productData, setProductData] = useState(false)

    const [image, setImage] = useState('')
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')
    const [size, setSize] = useState('')

    // -------------------------- Logic to update with latest product details -------------------------- \\
    useEffect(() => {
        // Chedk if products exist
        if (!products) {
            return
        }

        // Update the states with product details
        products.map((product) => {
            if (product._id === productId) {
                setProductData(product)
                setImage1(product.image1)
                setImage2(product.image2)
                setImage3(product.image3)
                setImage4(product.image4)
                setImage(product.image1)

                return null;
            }

        })
    }, [productId, products])
    //  ------------------------------- ********************** ------------------------------- \\

    // ------------------------------------- Logic to reset the UI while navigating ------------------------------------- \\
    useEffect(() => {
        setSize("");
    }, [location]);
    // ------------------------------------- **************************** ------------------------------------- \\

    useEffect(() => {
        console.log(productData)
    }, [productData]);
    useEffect(() => {
        console.log(size);
    }, [size]);

    // ------------------------------ Logic to handle click on add to cart ------------------------------ \\
    const handleAddClick = async (productId, productSize) => {
        try {
            const result = await  addToCart(productId, productSize);
        if(!result.success) {
            throw new Error(console.errror(result.message))
        }

        // Success
        console.log(result);
        }
        catch (e) {
            console.error({success: false, message: e.message});
        }
        finally {
            // Update the size state
            setSize("");
        }
    }


    return (
        <div className='w-[100vw] min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025]'>
            {productData ? (
                <>
                    <div className=' w-[100vw] h-[160vh] md:h-[150vh] lg:min-h-[100vh]  flex flex-col justify-start items-center md:flex-row md:items-start md:justify-center  gap-[20px] pt-[150px] md:pt-[100px] '>
                        <div className='lg:w-[50vw] md:w-[90vw] md:h-[90vh] h-[50vh]  flex items-center justify-center md:gap-[10px] gap-[30px] flex-col-reverse lg:flex-row'>
                            <div className='lg:w-[20%] md:w-[80%] h-[10%] lg:h-[80%] flex items-center justify-center gap-[50px] lg:gap-[20px] lg:flex-col flex-wrap '>
                                <div className='md:w-[100px]  w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px] border-[#80808049] rounded-md'>
                                    <img src={image1} alt="" className='w-[100%] h-[100%]  cursor-pointer rounded-md' onClick={() => setImage(image1)} />
                                </div>
                                <div className='md:w-[100px]  w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px] border-[#80808049] rounded-md'>
                                    <img src={image2} alt="" className='w-[100%] h-[100%]  cursor-pointer rounded-md' onClick={() => setImage(image2)} />
                                </div>
                                <div className='md:w-[100px]  w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px] border-[#80808049] rounded-md'>
                                    <img src={image3} alt="" className='w-[100%] h-[100%]  cursor-pointer rounded-md' onClick={() => setImage(image3)} />
                                </div>
                                <div className='md:w-[100px]  w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px] border-[#80808049] rounded-md'>
                                    <img src={image4} alt="" className='w-[100%] h-[100%]  cursor-pointer rounded-md' onClick={() => setImage(image4)} />
                                </div>

                            </div>
                            <div className='lg:w-[60%] w-[80%] lg:h-[78%] h-[70%] border-[1px] border-[#80808049] rounded-md  overflow-hidden'>
                                <img src={image} alt="" className=' w-[100%] lg:h-[100%] h-[100%] text-[30px] text-white  text-center rounded-md object-fill ' />
                            </div>
                        </div>

                        <div className='lg:w-[50vw] w-[100vw] h-[60vh]  md:h-[120vh] lg:min-h-[96vh]  flex items-start justify-start flex-col pt-[40px] px-[30px] md:pb-[20px] md:pl-[20px] gap-[10px]'>
                            <h1 className='text-[40px] font-semibold !text-[aliceblue]'>{productData.name.toUpperCase()}</h1>
                            <div className='flex items-center gap-1 '>
                                <FaStar className='text-[20px] fill-[#FFD700]' />
                                <FaStar className='text-[20px] fill-[#FFD700]' />
                                <FaStar className='text-[20px] fill-[#FFD700]' />
                                <FaStar className='text-[20px] fill-[#FFD700]' />
                                <FaStarHalfAlt className='text-[20px] fill-[#FFD700]' />
                                <p className='text-[18px] font-semibold pl-[5px] text-[white]'>(124)</p>
                            </div>
                            <p className='text-[30px] font-semibold pl-[5px] text-[white]'>{currency} {productData.price}</p>

                            <p className=' w-[80%] md:w-[60%] text-[20px] font-semibold pl-[5px] text-[white]'>{productData.description} and Stylish, breathable cotton shirt with a modern slim fit. Easy to wash, super comfortable, and designed for effortless style.</p>
                            <div className='flex flex-col gap-[10px] my-[10px] '>
                                <p className='text-[25px] font-semibold pl-[5px] text-[white]'>Select Size</p>
                                <div className='flex gap-2'>
                                    {
                                        productData.sizes.map((productSize, index) => (
                                            <button key={index} className={`border py-2 px-4 rounded-md 
                  ${productSize === size ? 'bg-red-500 text-cyan-200 text-[20px]' : 'bg-slate-300'}`} onClick={() => setSize(productSize)}  >{productSize}</button>
                                        ))
                                    }
                                </div>
                                <button className='text-[16px] active:bg-slate-500 cursor-pointer bg-[#495b61c9] py-[10px] px-[20px] rounded-2xl mt-[10px] border-[1px] border-[#80808049] text-white shadow-md shadow-black' onClick={() => handleAddClick(productData._id, size)} >Add to Cart</button>
                                {/* {loading ? <Loading /> : "Add to Cart"} */}
                            </div>
                            <div className='w-[90%] h-[1px] bg-slate-700'></div>
                            <div className='w-[80%] text-[16px] text-white '>

                                <p>100% Original Product.</p>
                                <p>Cash on delivery is available on this product</p>
                                <p>East return and exchange policy within 7 days</p>
                            </div>
                        </div>


                    </div>

                    <div className='w-[100%] min-h-[70vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-start justify-start flex-col  overflow-x-hidden'>

                        <div className='flex px-[20px] mt-[90px] lg:ml-[80px] ml-[0px]  lg:mt-[0px]  '>

                            <p className='border px-5 py-3 text-sm text-white'>
                                Description
                            </p>
                            <p className='border px-5 py-3 text-sm text-white'>
                                Reviews (124)
                            </p>
                        </div>

                        <div className='w-[80%] md:h-[150px] h-[220px] bg-[#3336397c] border text-white text-[13px] md:text-[15px] lg:text-[20px] px-[10px] md:px-[30px] lg:ml-[100px] ml-[20px]'>
                            <p className='w-[95%] h-[90%] flex items-center justify-center '>
                                Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on OneCart. Crafted from breathable, high-quality fabric, it offers all-day comfort and effortless style. Easy to maintain and perfect for any setting, this shirt is a must-have essential for those who value both fashion and function.</p>
                        </div>

                        <RelatedProduct category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id} />
                    </div>
                </>
            ) : (
                <div className='opacity-0'></div>
            )}

        </div>
    )
}

export default ProductDetail