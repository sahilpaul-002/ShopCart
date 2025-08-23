import React, { useContext, useState, useEffect } from 'react'
import Title from './Title'
import AllProductsContext from '../contexts/AllProductsContext'
import ProductCard from './ProductCard';

export default function BestSeller() {
    // Destructure context props
    const { allProducts } = useContext(AllProductsContext);

    // ------------------------ Logic to retrieve lates products from all products ------------------------  \\
    // State to store latest products
    const [allBestSellers, SetAllBestSellers] = useState({
        mensProducts: null,
        womensProducts: null,
        kidsProducts: null
    })

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
    }, [allProducts]);

    useEffect(() => {
        console.log(allBestSellers);
    }, [allBestSellers]);

    return (
        <div>
            <div className='h-[8%] w-[100%] text-center md:text-[50px] mb-[20px]'>
                <Title text1={"BEST"} text2={"SELLERs"} />
                <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-200'>
                    Try & Love our all time best sellers !
                </p>
            </div>
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
        </div>
    )
}