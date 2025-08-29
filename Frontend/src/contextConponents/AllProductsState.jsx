import React, { useState, useEffect } from 'react'
import AllProductsContext from '../contexts/AllProductsContext.jsx';
import { getAllProducts } from '../apiCalls/ProductDetails';
import { addProductToCart } from '../apiCalls/UserCartDetail.js';

export default function AllProductsState(props) {
  // Constants
  const currency = "₹";
  const deliveryCharge = 50;

  // State to store all products
  const [products, setProducts] = useState(null);

  // State to store the list of products based on category
  const [allProducts, setAllProducts] = useState({
    mens: null,
    womens: null,
    kids: null
  })

  // // State to store product in cart
  // const [cartProducts, setCartProducts] = useState({});

  // // State to store the loading annimation
  // const [loading, setLoading] = useState(false);

  // ------------------------------ Logic to fetch all products ------------------------------ \\
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allCategoryProducts = await getAllProducts();
        // Check if the all products are fetched
        if (!allCategoryProducts.success) {
          throw new Error("Unable to fetch all products");
        }

        // Update the products state
        setProducts(allCategoryProducts.products)

        // Categorize list of products based on their category
        const menProducts = allCategoryProducts.products.filter((product) => { return (product.category === "Men") })
        const womenProducts = allCategoryProducts.products.filter((product) => { return (product.category === "Women") })
        const kidProducts = allCategoryProducts.products.filter((product) => { return (product.category === "Kids") })

        // Updeate the product list state
        setAllProducts({
          men: menProducts,
          women: womenProducts,
          kid: kidProducts
        })

        // Success message
        console.log({ success: true, message: "List of all products fetched." })
      }
      catch (e) {
        console.error({ success: false, message: e.message });
      }
    }
    //   setTimeout(() => {
    //     fetchProducts();
    //   }, 2000)
    fetchProducts();
  }, [])
  // ------------------------------------- ********************* ------------------------------------- \\

  // const value = { products, setProducts, allProducts, setAllProducts, currency, deliveryCharge, cartProducts, setCartProducts, addToCart, getCartCount };
  const value = { products, setProducts, allProducts, setAllProducts, currency, deliveryCharge };

  return (
    <AllProductsContext value={value}>{props.children}</AllProductsContext>
  )
}
