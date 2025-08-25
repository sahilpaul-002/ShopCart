import React, { useState, useEffect } from 'react'
import AllProductsContext from '../contexts/AllProductsContext.jsx';
import { getAllProducts } from '../apiCalls/ProductDetails';
import {addProductToCart} from '../apiCalls/UserCartDetail.js';

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
    try {
      const fetchProducts = async () => {
        const allCategoryProducts = await getAllProducts();
        // Check if the all products are fetched
        if (!allCategoryProducts.success) {
          throw new Error("Unable to fetch all products");
        }
        console.log(allCategoryProducts);

        // Update the products state
        setProducts(allCategoryProducts.products)

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

  // ----------------------------------- Logic to add product to cart ----------------------------------- \\
  // const addToCart = async (productId, productSize) => {
  //   try {
  //     // Update the loading state
  //     setLoading(true);

  //     // Check if size is selected
  //     if (!productSize) {
  //       throw new Error("Select size to add the product to cart");
  //     }

  //     // Nested copy
  //     setCartProducts(prevCart => {
  //       const cartData = { ...prevCart };

  //       // Logic to add product to cart
  //       if (cartData[productId]) {
  //         if (cartData[productId][productSize]) {
  //           // Check sie already present
  //           cartData[productId][productSize] += 1;
  //         }
  //         else {
  //           // Check size not present
  //           cartData[productId][productSize] = 1
  //         }
  //       }
  //       else {
  //         // Product not present in the cart
  //         cartData[productId] = {};
  //         cartData[productId][productSize] = 1
  //       }

  //       return cartData;
  //     });

  //     // Update the cart in database
  //     const result = await addProductToCart(productId, productSize)

  //     // Update the loading state
  //     setLoading(false);

  //     // Success message
  //     console.log(result);
  //   }
  //   catch (e) {
  //     // Update the loading state
  //     setLoading(false);

  //     console.error({ success: false, message: e.message, user: null });
  //   }
  // }
  // ------------------------------------- ********************* ------------------------------------- \\
  // useEffect(() => {
  //   console.log(cartProducts);
  // }, [cartProducts])

  // ------------------------------------- Logic to get the cart count ------------------------------------- \\
  // const getCartCount = () => {
  //   let totalCount = 0;
  //   for (const items in cartProducts) {
  //     for (const item in cartProducts[items]) {
  //       try {
  //         if (cartProducts[items][item] > 0) {
  //           totalCount += cartProducts[items][item]
  //         }
  //       } catch (error) {
  //         console.error({ success: false, message: e.message })
  //       }
  //     }
  //   }
  //   return totalCount
  // }
  // ------------------------------------- ********************* ------------------------------------- \\

  // const value = { products, setProducts, allProducts, setAllProducts, currency, deliveryCharge, cartProducts, setCartProducts, addToCart, getCartCount };
  const value = { products, setProducts, allProducts, setAllProducts, currency, deliveryCharge };

  return (
    <AllProductsContext value={value}>{props.children}</AllProductsContext>
  )
}
