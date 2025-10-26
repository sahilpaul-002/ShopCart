import React, { useState, useEffect, useContext } from 'react'
import UserCartContext from '../contexts/UserCartContext'
import { addProductToCart, getUserCartProducts, updateCartProducts } from '../apiCalls/UserCartDetail.js';
import AllProductsContext from '../contexts/AllProductsContext.jsx';
import GetUserContext from '../contexts/GetUserContext.jsx';

export default function UserCartState(props) {
    // Destructure context props
    const { products } = useContext(AllProductsContext)
    const { userDetail } = useContext(GetUserContext);

    // State to store product in cart
    const [cartProducts, setCartProducts] = useState({});

    // State to store the loading annimation
    const [loading, setLoading] = useState(false);

    // State to store the total cart amount
    const [totalCartAmount, setTotalCartAmount] = useState(null);

    // ----------------------------------- Logic to add product to cart ----------------------------------- \\
    const addToCart = async (productId, productSize) => {
        try {
            // Update the loading state
            setLoading(true);

            // Check if size is selected
            if (!productSize) {
                throw new Error("Select size to add the product to cart");
            }

            // Nested copy
            setCartProducts(prevCart => {
                const cartData = { ...prevCart };

                // Logic to add product to cart
                if (cartData[productId]) {
                    if (cartData[productId][productSize]) {
                        // Check sie already present
                        cartData[productId][productSize] += 1;
                    }
                    else {
                        // Check size not present
                        cartData[productId][productSize] = 1
                    }
                }
                else {
                    // Product not present in the cart
                    cartData[productId] = {};
                    cartData[productId][productSize] = 1
                }

                return cartData;
            });

            // Update the cart in database
            const result = await addProductToCart(productId, productSize)

            if (!result) {
                throw new Error(result);
            }

            // Update the loading state
            setLoading(false);

            // Success message

            return result
        }
        catch (e) {
            // Update the loading state
            setLoading(false);

            console.error({ success: false, message: e.message, user: null });
        }
    }
    // ------------------------------------- ********************* ------------------------------------- \\
    

    // ------------------------------------- Logic to get user cart details ------------------------------------- \\
    useEffect(() => {
        const fetchUserCart = async () => {
            try {
                const result = await getUserCartProducts();

                if (!result) {
                    throw new Error(result);
                }

                // Update the cartProducts state
                setCartProducts(result.userCartData)

                // Success message

            }
            catch (e) {
                console.error({ success: false, message: e.message, userCart: null });
            }
        }

        fetchUserCart();
    }, [userDetail]);
    // ------------------------------------- ********************* ------------------------------------- \\

    // ------------------------------------- Logic to get the cart count ------------------------------------- \\
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartProducts) {
            for (const item in cartProducts[items]) {
                try {
                    if (cartProducts[items][item] > 0) {
                        totalCount += cartProducts[items][item]
                    }
                } catch (error) {
                    console.error({ success: false, message: e.message })
                }
            }
        }
        return totalCount
    }
    // ------------------------------------- ********************* ------------------------------------- \\

    // ------------------------------------- Logic to get user cart details ------------------------------------- \\
    const updateCartDetails = async (productId, productSize, quantity) => {
        try {
            if(quantity === "") {
                throw new Error({success: false, message: "Minimun 1 quantity required", userCart: null});
            }
            const result = await updateCartProducts(productId, productSize, quantity);

            if (!result) {
                throw new Error(result);
            }

            // Update the cartProducts state
            setCartProducts(result.user.cartData)

            // Success message

        }
        catch (e) {
            console.error({ success: false, message: e.message, userCart: null });
        }
    }
    // ------------------------------------- ********************* ------------------------------------- \\

    // ------------------------------------- Get total amount from user cart ------------------------------------- \\
    useEffect(() => {
        const getCartAmount = () => {
            let totalAmount = 0;
            if (cartProducts) {
                for (const cartProduct in cartProducts) {
                    let productInfo = products ? products.find((product) => product._id === cartProduct) : null;
                    if (productInfo) {
                        for (const size in cartProducts[cartProduct]) {
                            // try {

                            // }
                            // catch (e) {
                            //     console.error({ success: false, message: e.message });
                            // }
                            if (cartProducts[cartProduct][size] > 0) {
                                totalAmount += productInfo.price * cartProducts[cartProduct][size];
                            }
                        }
                    }
                }
            }
            return totalAmount;
        }
        setTotalCartAmount(getCartAmount);
    }, [cartProducts, products])
    // ------------------------------------- ********************* ------------------------------------- \\

    const value = { cartProducts, setCartProducts, addToCart, getCartCount, updateCartDetails, totalCartAmount, setTotalCartAmount }
    return (
        <UserCartContext value={value}>{props.children}</UserCartContext>
    )
}
