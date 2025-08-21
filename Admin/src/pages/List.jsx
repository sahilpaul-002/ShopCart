import React, { useContext, useEffect, useState } from 'react'
import AppNavContext from '../context/AppNavContext';
import Sidebar from '../components/Sidebar';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import MensCategory from '../components/MensCategory';
import { getAllProducts } from '../apiCalls/AdminProductDetails';
import WomensCategory from '../components/WomensCategory';
import KidsCategory from '../components/KidsCategory';


export default function List() {
  // Destructure admin user context
  const { navbarCollapse, setNavbarCollapse } = useContext(AppNavContext);

  // State to store the category buttons state
  const [categoryButtons, setCagtegoryButton] = useState({
    men: true,
    women: false,
    kid: false
  })

  // --------------------------- Get All Products --------------------------- \\
  // State to store all products
  const [allProducts, setAllProducts] = useState({
    men: null,
    women: null,
    kid: null
  });

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
        const menProducts = allCategoryProducts.products.filter((product) => {return (product.category==="Men")})
        const womenProducts = allCategoryProducts.products.filter((product) => {return (product.category==="Women")})
        const kidProducts = allCategoryProducts.products.filter((product) => {return (product.category==="Kids")})
        console.log(kidProducts)

        // Updeate the product list state
        setAllProducts({
          men: menProducts,
          women: womenProducts,
          kid: kidProducts
        })

        // Success message
        console.log({success: true, message: "List of all products fetched."})
      }

      fetchProducts();
    }
    catch (e) {
      console.error({success: false, message: e.message});
    }
  }, [])
  // --------------------------- **************** --------------------------- \\
  console.log(allProducts);

  return (
    <div className={`home-container w-[100vw] min-h-screen h-auto  bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[70px] md:px-[80px] px-[20px]`}>
      {/* Transparent div to manage the navbar collapsing action */}
      {!navbarCollapse && <div className="transparent-navbar w-[100%] h-[250px]"></div>}

      {/* Sidebar */}
      <Sidebar />

      {/* List body */}
      <div className="page-body w-[80%] h-[100%] ml-[16%] px-[10px] md:px-[20px] pt-[30px] pb-[20px] flex flex-col justify-start items-start gap-[20px]">
        {/* Products Category Buttons */}
        <div className="w-[60%] px-[40px] md:px-[10px]  md:flex justify-center items-center gap-[1%] lg:gap-[5%] hidden ">
          <Button className='mx-2 !rounded-full w-[120px] lg:w-[30%]' size="lg" variant={categoryButtons.men ? "info" : "secondary"} onClick={() => setCagtegoryButton({ men: true, women: false, kid: false })}>Mens</Button>
          <Button className='mx-2 !rounded-full w-[120px] lg:w-[30%]' size="lg" variant={categoryButtons.women ? "info" : "secondary"} onClick={() => setCagtegoryButton({ men: false, women: true, kid: false })}>Womens</Button>
          <Button className='mx-2 !rounded-full w-[120px] lg:w-[30%]' size="lg" variant={categoryButtons.kid ? "info" : "secondary"} onClick={() => setCagtegoryButton({ men: false, women: false, kid: true })}>Kids</Button>
        </div>
        <div className="w-[60%] px-[40px] md:px-[10px]  flex justify-center items-center gap-[1%] lg:gap-[5%] md:hidden">
          <Button className='mx-2 !rounded-full w-[120px] lg:w-[30%]' size="lg" variant={categoryButtons.men ? "info" : "secondary"} onClick={() => setCagtegoryButton({ men: true, women: false, kid: false })}>M</Button>
          <Button className='mx-2 !rounded-full w-[120px] lg:w-[30%]' size="lg" variant={categoryButtons.women ? "info" : "secondary"} onClick={() => setCagtegoryButton({ men: false, women: true, kid: false })}>W</Button>
          <Button className='mx-2 !rounded-full w-[120px] lg:w-[30%]' size="lg" variant={categoryButtons.kid ? "info" : "secondary"} onClick={() => setCagtegoryButton({ men: false, women: false, kid: true })}>K</Button>
        </div>
        {/* Product cards */}
        <div className="product-cards w-[100%] px-[40px] md:px-[10px] py-[20px]  flex justify-start gap-[30px] items-center flex-wrap">
          {categoryButtons.men ? <MensCategory menProducts={allProducts.men}/> : null}
          {categoryButtons.women ? <WomensCategory womenProducts={allProducts.women}/> : null}
          {categoryButtons.kid ? <KidsCategory kidProducts={allProducts.kid}/> : null}
        </div>
      </div>
    </div>
  )
}
