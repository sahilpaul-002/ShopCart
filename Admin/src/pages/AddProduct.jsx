import React, { useContext, useState, useEffect, useRef } from 'react'
import AppNavContext from '../context/AppNavContext';
import Sidebar from '../components/Sidebar';
import Button from 'react-bootstrap/Button';
import { addProductDetails } from '../apiCalls/AdminProductDetails';


export default function AddProduct() {
  // Destructure admin user context
  const { navbarCollapse, setNavbarCollapse } = useContext(AppNavContext);

  // Refs for file inputs
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const image3Ref = useRef(null);
  const image4Ref = useRef(null);
  const categoryRef = useRef(null);
  const subCategoryRef = useRef(null);
  const bestSellerRef = useRef(null);

  // State to store the product details
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    category: "Men",
    subCategory: "TopWear",
    price: "",
    bestSeller: false,
    sizes: [],
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  })

  // -------------------------- Logic to handle the onChange action os the addd product form -------------------------- \\ 
  const handleOnChange = (e) => {
    const { name, type, value, files } = e.target;

    setProductDetails((prev) => ({
    ...prev,
    [name]: type === "file" ? files[0] : type === "number" ? Number(value) : value
  }));
  };
  // -------------------------- ********************************** -------------------------- \\ 

  // -------------------------- Logic to handle click action on size-------------------------- \\ 
  const handleSizeClick = (productSize) => {
    if (productDetails.sizes.includes(productSize)) {
      // remove size
      const updatedSizes = productDetails.sizes.filter(size => size !== productSize);
      setProductDetails(prev => ({
        ...prev,
        sizes: updatedSizes
      }));
    } else {
      // add size
      setProductDetails(prev => ({
        ...prev,
        sizes: [...prev.sizes, productSize]
      }));
    }
  };
  // -------------------------- ********************************** -------------------------- \\ 

  // -------------------------- Logic to handle on submission of the sdd product form -------------------------- \\ 
  const handleAddProduct = async (e) => {
    try {
      e.preventDefault()

      // Call the add product api
      const addProductResponse = await addProductDetails(productDetails);

      // Check API success
      if (!addProductResponse.success) {
        throw addProductResponse
      }
      console.log(addProductResponse);
    }
    catch (e) {
      if (Array.isArray(e.message)) {
        console.error({ success: false, error: e.message, message: e.message[0]?.msg })
      }
      else {
        console.error({ success: false, message: e.message });
      }
    }
    finally {
      // Reset product details
      setProductDetails({
        name: "",
        description: "",
        category: "Men",
        subCategory: "TopWear",
        price: "",
        bestSeller: false,
        sizes: [],
        image1: "",
        image2: "",
        image3: "",
        image4: "",
      })

      // Reset file inputs
      if (image1Ref.current) image1Ref.current.value = "";
      if (image2Ref.current) image2Ref.current.value = "";
      if (image3Ref.current) image3Ref.current.value = "";
      if (image4Ref.current) image4Ref.current.value = "";
      if (categoryRef.current) categoryRef.current.value = "Men";
      if (subCategoryRef.current) subCategoryRef.current.value = "TopWear";
      if (bestSellerRef.current) bestSellerRef.current.value = false;
    }
  }
  // -------------------------- ********************************** -------------------------- \\ 

  return (
    <div className={`home-container w-[100vw] ${navbarCollapse ? "h-[100%]" : ""} bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[70px] md:px-[80px] px-[20px]`}>
      {/* Transparent div to manage the navbar collapsing action */}
      {!navbarCollapse && <div className="transparent-navbar w-[100%] h-[250px]"></div>}

      {/* Sidebar */}
      <Sidebar />

      {/* Add Product */}
      <div className={`add-product w-[80%] flex flex-col justify-start items-start gap-[30px] px-[20px] pb-[20px] relative left-[16%] mt-[40px] overflow-x-hidden text-white`}>
        <div className="add-product-text w-[400px] h-[50px] text-[25px] md:text-[40px] font-bold">Add Products</div>
        <form action="POST" className="add-product-form w-[100%] md:w-[90%] h-[100%] flex flex-col justify-start items:start gap-[20px] px-[30px] md:px-[60px]" onSubmit={handleAddProduct}>
          <p className='upload-image-text text-[18px] md:text-[20px] font-semibold'> Upload Image</p>
          <div className="upload-image w-[100%]  flex flex-col lg:flex-row justify-start items:start lg:items-center gap-[20px]">
            <div className='flex justify-start items-center gap-[20px]'>
              {/* Image1 upload */}
              <label htmlFor="image1" className='w-[100px] h-[100px] cursor-pointer mb-[25px] hover:border-[#46d1f7]'>
                <img src={!productDetails.image1 ? "./upload-image.png" : URL.createObjectURL(productDetails.image1)} alt="image1" className='w-[80%] h-[80%] rounded-lg shadow-2xl bg-yellow-50 hover:border-[#1d1d1d] border-[2px] mb-[10px]' />
                <input type="file" className="add-image my-[10px] bg-white text-black hidden" id='image1' name='image1' ref={image1Ref} onChange={handleOnChange} />
              </label>
              {/* Image2 upload */}
              <label htmlFor="image2" className='w-[100px] h-[100px] cursor-pointer mb-[25px] hover:border-[#46d1f7]'>
                <img src={!productDetails.image2 ? "./upload-image.png" : URL.createObjectURL(productDetails.image2)} alt="image2" className='w-[80%] h-[80%] rounded-lg shadow-2xl bg-yellow-50 hover:border-[#1d1d1d] border-[2px] mb-[10px]' />
                <input type="file" className="add-image my-[10px] bg-white text-black hidden" id='image2' name='image2' ref={image2Ref} onChange={handleOnChange} />
              </label>
            </div>
            <div className='flex justify-start items-center gap-[20px]'>
              {/* Image3 upload */}
              <label htmlFor="image3" className='w-[100px] h-[100px] cursor-pointer mb-[25px] hover:border-[#46d1f7]'>
                <img src={!productDetails.image3 ? "./upload-image.png" : URL.createObjectURL(productDetails.image3)} alt="image3" className='w-[80%] h-[80%] rounded-lg shadow-2xl bg-yellow-50 hover:border-[#1d1d1d] border-[2px] mb-[10px]' />
                <input type="file" className="add-image my-[10px] bg-white text-black hidden" id='image3' name='image3' ref={image3Ref} onChange={handleOnChange} />
              </label>
              {/* Image4 upload */}
              <label htmlFor="image4" className='w-[100px] h-[100px] cursor-pointer mb-[25px] hover:border-[#46d1f7]'>
                <img src={!productDetails.image4 ? "./upload-image.png" : URL.createObjectURL(productDetails.image4)} alt="image4" className='w-[80%] h-[80%] rounded-lg shadow-2xl bg-yellow-50 hover:border-[#1d1d1d] border-[2px] mb-[10px]' />
                <input type="file" className="add-image my-[10px] bg-white text-black hidden" id='image4' name='image4' ref={image4Ref} onChange={handleOnChange} />
              </label>
            </div>
          </div>
          {/* Other form details */}
          {/* Product Details */}
          <div className="w-[90%] flex justify-start items-start flex-col gap-[1px] mb-[10px]">
            <p className='text-[18px] md:text-[20px] font-semibold'>Product Name</p>
            <input type="text" placeholder='Type here' className='w-[100%] h-[30px] md:h-[40px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] py-[10px] text-[18px] placeholder:text-[#ffffffc2]' required id='name' name='name' value={productDetails.name} onChange={handleOnChange} />
          </div>
          {/* Product Description */}
          <div className="w-[90%] flex justify-start items-start flex-col gap-[1px] mb-[10px]">
            <p className='text-[18px] md:text-[20px] font-semibold'>Product Description</p>
            <textarea type="text" placeholder='Type here' className='w-[100%] h-[100px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] py-[10px] text-[18px] placeholder:text-[#ffffffc2]' id='description' name='description' required value={productDetails.description} onChange={handleOnChange} />
          </div>
          {/* Product category */}
          <div className="w-[80%] flex justify-start items-start gap-[20px] flex-wrap mb-[70px]">
            {/* Category */}
            <div className="md:w-[40%] w-full flex flex-col gap-[8px]">
              <p className="text-[18px] md:text-[20px] font-semibold text-white">
                Product Category
              </p>
              <select
                className="bg-slate-600 text-white w-full md:w-[80%] px-3 py-2 rounded-lg border-2 border-transparent hover:border-[#46d1f7] focus:outline-none focus:border-[#46d1f7]"
                name="category"
                id="category"
                ref={categoryRef}
                onChange={handleOnChange}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            {/* Sub-Category */}
            <div className="md:w-[40%] w-full flex flex-col gap-[8px]">
              <p className="text-[18px] md:text-[20px] font-semibold text-white">
                Product Sub-Category
              </p>
              <select
                className="bg-slate-600 text-white w-full md:w-[80%] px-3 py-2 rounded-lg border-2 border-transparent hover:border-[#46d1f7] focus:outline-none focus:border-[#46d1f7]"
                name="subCategory"
                id="subCategory"
                ref={subCategoryRef}
                onChange={handleOnChange}
              >
                <option value="TopWear">Top Wear</option>
                <option value="BottomWear">Bottom Wear</option>
                <option value="Winterwear">Winter Wear</option>
              </select>
            </div>
          </div>
          {/* Bestseller */}
          <div className="md:w-[40%] w-full flex flex-col gap-[8px] mb-[60px]">
            <p className="text-[18px] md:text-[20px] font-semibold text-white">
              Product Bestseller
            </p>
            <select
              className="bg-slate-600 text-white w-full md:w-[80%] px-3 py-2 rounded-lg border-2 border-transparent hover:border-[#46d1f7] focus:outline-none focus:border-[#46d1f7]"
              name="bestSeller"
              id="bestSeller"
              ref={bestSellerRef}
              onChange={handleOnChange}
            >
              <option value="false">False</option>
              <option value="true">True</option>
            </select>
          </div>
          {/* Product Price */}
          <div className="w-[90%] flex justify-start items-start flex-col gap-[1px]">
            <p className='text-[18px] md:text-[20px] font-semibold'>Product Price</p>
            <input type="Number" placeholder='₹ 2000' className='w-[100%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] py-[10px] text-[18px] placeholder:text-[#ffffffc2]' id='price' name='price' required value={productDetails.price} onChange={handleOnChange} />
          </div>
          {/* Product sizes */}
          <div className="w-[90%] h-[220px] md:h[100px flex flex-col justify-center items-start  gap-[1px] mb-[10px] py-[10px] md:py[0px] ">
            <p className='text-[18px] md:text-[20px] font-semibold'>Product Size</p>
            {/* Sizes */}
            <div className="flex flex-col lg:flex-row justify-start items-center gap-[15px] ">
              <div className='flex justify-start items-center gap-[15px]'>
                <div className={`w-[60px] px-[10px] py-[10px] flex justify-center rounded-lg ${productDetails.sizes.includes("XS") ? 'bg-red-400' : 'bg-slate-700'} text-[18px] hover:border-[#46d1f7]  border-[2px] cursor-pointer`} id='XS' onClick={() => { handleSizeClick("XS") }}>
                  XS
                </div>
                <div className={`w-[60px] px-[10px] py-[10px] flex justify-center rounded-lg ${productDetails.sizes.includes("S") ? 'bg-red-400' : 'bg-slate-700'} text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer`} id='S' onClick={() => { handleSizeClick("S") }}>
                  S
                </div>
                <div className={`w-[60px] px-[10px] py-[10px] flex justify-center rounded-lg ${productDetails.sizes.includes("M") ? 'bg-red-400' : 'bg-slate-700'} text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer`} id='M' onClick={() => { handleSizeClick("M") }}>
                  M
                </div>
              </div>
              <div className='flex justify-start items-center gap-[15px]'>
                <div className={`w-[60px] px-[10px] py-[10px] flex justify-center rounded-lg ${productDetails.sizes.includes("L") ? 'bg-red-400' : 'bg-slate-700'} text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer`} id='L' onClick={() => { handleSizeClick("L") }}>
                  L
                </div>
                <div className={`w-[60px] px-[10px] py-[10px] flex justify-center rounded-lg ${productDetails.sizes.includes("XL") ? 'bg-red-400' : 'bg-slate-700'} text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer`} id='XL' onClick={() => { handleSizeClick("XL") }}>
                  XL
                </div>
                <div className={`w-[60px] px-[10px] py-[10px] flex justify-center rounded-lg ${productDetails.sizes.includes("XXL") ? 'bg-red-400' : 'bg-slate-700'} text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer`} id='XXL' onClick={() => { handleSizeClick("XXL") }}>
                  XXL
                </div>
              </div>
            </div>
          </div>
          {/* Submit button */}
          <div className="flex justify-center items-center">
            <Button className='!w-[160px] !py-[16px] !text-[18px] !font-semibold' type="Submit" variant="info">Add Product</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
