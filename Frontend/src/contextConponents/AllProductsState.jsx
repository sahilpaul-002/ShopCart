import React, { useState, useEffect } from 'react'
import AllProductsContext from '../contexts/AllProductsContext.jsx';
import { getAllProducts } from '../apiCalls/ProductDetails';

export default function AllProductsState(props) {
    // Constants
    const currency = "₹";
    const deliveryCharge = 50;

    // State to store the list of products based on category
    const [allProducts, setAllProducts] = useState({
        mens: null,
        womens: null,
        kids: null
    })

    // ------------------------------ Logic to fetch all products ------------------------------ \\
    useEffect(() => {
    try {
      const fetchProducts = async () => {
        const allCategoryProducts = await getAllProducts();
        // Check if the all products are fetched
        if (!allCategoryProducts.success) {
          throw new Error("Unable to fetch all products");
        }
        console.log(allCategoryProducts);

        // Categorize list of products based on their category
        const menProducts = allCategoryProducts.products.filter((product) => { return (product.category === "Men") })
        const womenProducts = allCategoryProducts.products.filter((product) => { return (product.category === "Women") })
        const kidProducts = allCategoryProducts.products.filter((product) => { return (product.category === "Kids") })
        console.log(kidProducts)

        // Updeate the product list state
        setAllProducts({
          men: menProducts,
          women: womenProducts,
          kid: kidProducts
        })

        // Success message
        console.log({ success: true, message: "List of all products fetched." })
      }

    //   setTimeout(() => {
    //     fetchProducts();
    //   }, 2000)
    fetchProducts();
    }
    catch (e) {
      console.error({ success: false, message: e.message });
    }
  }, [])
    // ------------------------------------- ********************* ------------------------------------- \\

    const value = {allProducts, setAllProducts, currency, deliveryCharge};

  return (
    <AllProductsContext value={value}>{props.children}</AllProductsContext>
  )
}
