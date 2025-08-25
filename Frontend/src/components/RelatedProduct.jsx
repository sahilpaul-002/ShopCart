import React, { useContext, useEffect, useState } from 'react'
import AllProductsContext from '../contexts/AllProductsContext';
import Title from './Title'
import ProductCard from './ProductCard'

function RelatedProduct({ category, subCategory, currentProductId }) {
    console.log(category, subCategory, currentProductId)

    let { products } = useContext(AllProductsContext)
    let [related, setRelated] = useState([])

    useEffect(() => {
        if (products && products.length > 0) {
            let productsCopy = [...products];

            productsCopy = productsCopy.filter(
                (product) => product.category.toLowerCase() === category.toLowerCase()
            );
            console.log("After category filter:", productsCopy);
            productsCopy = productsCopy.filter(
                (product) => product.subCategory.toLowerCase() === subCategory.toLowerCase()
            );
            console.log("After sub-category filter:", productsCopy);
            productsCopy = productsCopy.filter(
                (product) => product._id !== currentProductId
            );
            console.log("After id filter:", productsCopy);

            setRelated(productsCopy);
        }
    }, [products, category, subCategory, currentProductId]);
    useEffect(() => {
        console.log(related);
    }, [related])
    useEffect(() => {
        console.log("products from context:", products);
    }, [products]);

    return (
        <div className='my-[130px] md:my-[40px]  md:px-[60px] '>
            <div className='ml-[20px] lg:ml-[80px]'>
                <Title text1={'RELATED'} text2={'PRODUCTS'} />
            </div>
            <div className="w-[80vw] xl:w-[86vw] flex justify-start items-center gap-[20px] py-[40px] px-[20px] m-[auto] overflow-x-scroll overflow-y-hidden scrollbar-hide">
                {
                    related.length > 0 ? related.map((product) => (
                        <div className="" key={product._id}><ProductCard product={product} /></div>
                    )) : null
                }
            </div>

        </div>
    )
}

export default RelatedProduct
