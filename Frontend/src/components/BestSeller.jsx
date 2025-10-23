import React, { useContext, useState, useEffect } from 'react'
import Title from './Title'
import AllProductsContext from '../contexts/AllProductsContext'
import ProductCard from './ProductCard';
import Loading from './Loading';

export default function BestSeller() {
    // Destructure context props
    const { allProducts } = useContext(AllProductsContext);

    // State to manage the loader
    const [loading, setLoading] = useState(true);

    // ------------------------ Logic to retrieve lates products from all products ------------------------  \\
    // State to store latest products
    const [allBestSellers, SetAllBestSellers] = useState({
        mensProducts: null,
        womensProducts: null,
        kidsProducts: null
    })

    // UseEffect to filter the best sellers
    useEffect(() => {
        if (!allProducts) return;
        // Retreving men best seller
        const bestSellersMen = allProducts.men ? allProducts.men.filter((product) => {
            return (
                product.bestSeller === true
            )
        }) : null;
        // Retreving women best seller
        const bestSellersWomen = allProducts.women ? allProducts.women.filter((product) => {
            return (
                product.bestSeller === true
            )
        }) : null;
        // Retreving kid best seller
        const bestSellersKid = allProducts.kid ? allProducts.kid.filter((product) => {
            return (
                product.bestSeller === true
            )
        }) : null

        SetAllBestSellers((prev) => ({
            mensProducts: bestSellersMen,
            womensProducts: bestSellersWomen,
            kidsProducts: bestSellersKid
        }))

        // Reset loading state
        // setLoading(false);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, [allProducts]);

    return (
        <div>
            <div className='h-[8%] w-[100%] text-center md:text-[50px] mb-[20px]'>
                <Title text1={"BEST"} text2={"SELLERS"} />
                <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-200'>
                    Try & Love our all time best sellers !
                </p>
            </div>
            {
                loading ? (
                    <div className="w-[70vw] mx-[auto] flex items-center justify-center h-[50px] md:h-[100px] mt-[100px]">
                        <Loading />
                    </div>
                ) : (
                    allBestSellers.mensProducts || allBestSellers.womensProducts || allBestSellers.kidsProducts ? (
                        <div className="w-[80vw] xl:w-[86vw] flex justify-between items-center gap-[40px] p-[40px] m-[auto] overflow-x-scroll overflow-y-hidden scrollbar-hide">
                            {/* Mens Latest Collection */}
                            {allBestSellers.mensProducts ? allBestSellers.mensProducts.map((product, index) => {
                                return (
                                    <ProductCard key={product._id} product={product} />
                                )
                            }) : null}
                            {/* Womens Latest Collection */}
                            {allBestSellers.womensProducts ? allBestSellers.womensProducts.map((product, index) => {
                                return (
                                    <ProductCard key={product._id} product={product} />
                                )
                            }) : null}
                            {/* Kids Latest Collection */}
                            {allBestSellers.kidsProducts ? allBestSellers.kidsProducts.map((product, index) => {
                                return (
                                    <ProductCard key={product._id} product={product} />
                                )
                            }) : null}
                        </div>
                    ) : (
                        <div className='w-[100%] text-center mx-[auto] text-[18px] md:text-[25px] h-[100%] bg-gradient-to-r from-pink-400 to-red-500 flex items-center justify-center rounded-2xl backdrop-blur-sm my-[50px] p-[20px] font-bold bg-clip-text text-transparent'>
                            Opps! No bestseller available at the moment.
                        </div>
                    )
                )
            }
        </div>
    )
}