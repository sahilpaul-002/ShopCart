import React, { useContext, useState, useEffect } from 'react'
import Title from './Title'
import AllProductsContext from '../contexts/AllProductsContext'

export default function LatestCollections() {
    // Destructure context props
    const { allProducts } = useContext(AllProductsContext);

    // ------------------------ Logic to retrieve lates products from all products ------------------------  \\
    // State to store latest products
    const [latestProducts, setLatestProducts] = useState({
        menProducts: null,
        womensProducts: null,
        kidsProducts: null
    })

    useEffect(() => {
        if (!allProducts) return;
        console.log(allProducts)

        const latestMensProducts = allProducts.men
            ? [...allProducts.men]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 2)
            : null;

        const latestWomensProducts = allProducts.women
            ? [...allProducts.women]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 2)
            : null;

        const latestKidsProducts = allProducts.kid
            ? [...allProducts.kid]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 2)
            : null;

        setLatestProducts({
            menProducts: latestMensProducts,
            womensProducts: latestWomensProducts,
            kidsProducts: latestKidsProducts
        });
    }, [allProducts]);

    // ---------------------------- ***************** ---------------------------- \\

    return (
        <div>
            <div className='h-[8%] w-[100%] text-center md:text-[50px]'>
                <Title text1={"LATEST"} text2={"COLLECTIONS"} />
                <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-200'>
                    Step Into Style - New Collections Dropping This Season
                </p>
            </div>
            <div className="w-[100%] h-[50%] mt-[30px] flex justify-center items-center flex-wrap gap-[50px]">

            </div>
        </div>
    )
}
