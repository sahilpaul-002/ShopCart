import React, { useContext, useState, useEffect } from 'react'
import AppNavContext from '../context/AppNavContext';
import Sidebar from '../components/Sidebar';

export default function AddProduct() {
  // Destructure admin user context
  const { navbarCollapse, setNavbarCollapse } = useContext(AppNavContext);

  // 
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

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
      [name]: type === "file" ? files[0] : value
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
  // const handleOnChange = (e) => {
  //   const { name, type, value, files } = e.target;

  //   setProductDetails((prev) => ({
  //     ...prev,
  //     [name]: type === "file" ? files[0] : value
  //   }));
  // };
  // -------------------------- ********************************** -------------------------- \\ 

  useEffect(() => {
    console.log(productDetails);
  }, [productDetails]);

  return (
    <div className={`home-container w-[100vw] ${navbarCollapse ? "h-[100%]" : ""} bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[70px] md:px-[80px] px-[20px]`}>
      {/* Transparent div to manage the navbar collapsing action */}
      {!navbarCollapse && <div className="transparent-navbar w-[100%] h-[250px]"></div>}

      {/* Sidebar */}
      <Sidebar />

      {/* Add Product */}
      <div className={`add-product w-[80%] flex flex-col justify-start items-start gap-[30px] px-[20px] pb-[20px] relative left-[16%] mt-[40px] overflow-x-hidden text-white`}>
        <div className="add-product-text w-[400px] h-[50px] text-[25px] md:text-[40px] font-bold">Add Products</div>
        <form action="" className="add-product-form w-[100%] md:w-[90%] h-[100%] flex flex-col justify-start items:start gap-[20px] px-[30px] md:px-[60px]">
          <p className='upload-image-text text-[18px] md:text-[20px] font-semibold'> Upload Image</p>
          <div className="upload-image w-[100%]  flex flex-col lg:flex-row justify-start items:start lg:items-center gap-[20px]">
            <div className='flex justify-start items-center gap-[20px]'>
              {/* Image1 upload */}
              <label htmlFor="image1" className='w-[100px] h-[100px] cursor-pointer mb-[25px] hover:border-[#46d1f7]'>
                <img src={!productDetails.image1 ? "./upload-image.png" : URL.createObjectURL(productDetails.image1)} alt="image1" className='w-[80%] h-[80%] rounded-lg shadow-2xl bg-yellow-50 hover:border-[#1d1d1d] border-[2px] mb-[10px]' />
                <input type="file" className="add-image my-[10px] bg-white text-black hidden" id='image1' name='image1' onChange={handleOnChange} />
              </label>
              {/* Image2 upload */}
              <label htmlFor="image2" className='w-[100px] h-[100px] cursor-pointer mb-[25px] hover:border-[#46d1f7]'>
                <img src={!productDetails.image2 ? "./upload-image.png" : URL.createObjectURL(productDetails.image2)} alt="image2" className='w-[80%] h-[80%] rounded-lg shadow-2xl bg-yellow-50 hover:border-[#1d1d1d] border-[2px] mb-[10px]' />
                <input type="file" className="add-image my-[10px] bg-white text-black hidden" id='image2' name='image2' onChange={handleOnChange} />
              </label>
            </div>
            <div className='flex justify-start items-center gap-[20px]'>
              {/* Image3 upload */}
              <label htmlFor="image3" className='w-[100px] h-[100px] cursor-pointer mb-[25px] hover:border-[#46d1f7]'>
                <img src={!productDetails.image3 ? "./upload-image.png" : URL.createObjectURL(productDetails.image3)} alt="image3" className='w-[80%] h-[80%] rounded-lg shadow-2xl bg-yellow-50 hover:border-[#1d1d1d] border-[2px] mb-[10px]' />
                <input type="file" className="add-image my-[10px] bg-white text-black hidden" id='image3' name='image3' onChange={handleOnChange} />
              </label>
              {/* Image4 upload */}
              <label htmlFor="image4" className='w-[100px] h-[100px] cursor-pointer mb-[25px] hover:border-[#46d1f7]'>
                <img src={!productDetails.image4 ? "./upload-image.png" : URL.createObjectURL(productDetails.image4)} alt="image4" className='w-[80%] h-[80%] rounded-lg shadow-2xl bg-yellow-50 hover:border-[#1d1d1d] border-[2px] mb-[10px]' />
                <input type="file" className="add-image my-[10px] bg-white text-black hidden" id='image4' name='image4' onChange={handleOnChange} />
              </label>
            </div>
          </div>
          {/* Other form details */}
          {/* Product Details */}
          <div className="w-[90%] flex justify-start items-start flex-col gap-[1px] mb-[10px]">
            <p className='text-[18px] md:text-[20px] font-semibold'>Product Detail</p>
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
                Product Category
              </p>
              <select
                className="bg-slate-600 text-white w-full md:w-[80%] px-3 py-2 rounded-lg border-2 border-transparent hover:border-[#46d1f7] focus:outline-none focus:border-[#46d1f7]"
                name="bestseller"
                id="bestseller"
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
                <div className={`w-[60px] px-[10px] py-[10px] flex justify-center rounded-lg ${productDetails.sizes.includes("XS") ? 'bg-slate-400' : 'bg-slate-700'} text-[18px] hover:border-[#46d1f7]  border-[2px] cursor-pointer`} id='XS' onClick={() => { handleSizeClick("XS") }}>
                  XS
                </div>
                <div className={`w-[60px] px-[10px] py-[10px] flex justify-center rounded-lg ${productDetails.sizes.includes("S") ? 'bg-slate-400' : 'bg-slate-700'} text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer`} id='S' onClick={() => { handleSizeClick("S") }}>
                  S
                </div>
                <div className={`w-[60px] px-[10px] py-[10px] flex justify-center rounded-lg ${productDetails.sizes.includes("M") ? 'bg-slate-400' : 'bg-slate-700'} text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer`} id='M' onClick={() => { handleSizeClick("M") }}>
                  M
                </div>
              </div>
              <div className='flex justify-start items-center gap-[15px]'>
                <div className={`w-[60px] px-[10px] py-[10px] flex justify-center rounded-lg ${productDetails.sizes.includes("L") ? 'bg-slate-400' : 'bg-slate-700'} text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer`} id='L' onClick={() => { handleSizeClick("L") }}>
                  L
                </div>
                <div className={`w-[60px] px-[10px] py-[10px] flex justify-center rounded-lg ${productDetails.sizes.includes("XL") ? 'bg-slate-400' : 'bg-slate-700'} text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer`} id='XL' onClick={() => { handleSizeClick("XL") }}>
                  XL
                </div>
                <div className={`w-[60px] px-[10px] py-[10px] flex justify-center rounded-lg ${productDetails.sizes.includes("XXL") ? 'bg-slate-400' : 'bg-slate-700'} text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer`} id='XXL' onClick={() => { handleSizeClick("XXL") }}>
                  XXL
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
