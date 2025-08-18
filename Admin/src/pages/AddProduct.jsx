import React, { useContext, useState } from 'react'
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

  return (
    <div className={`home-container w-[100vw] ${navbarCollapse ? "h-[100%]" : ""} bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[70px] md:px-[80px] px-[20px]`}>
      {/* Transparent div to manage the navbar collapsing action */}
      {!navbarCollapse && <div className="transparent-navbar w-[100%] h-[250px]"></div>}

      {/* Sidebar */}
      <Sidebar />

      {/* absolute right-0 */}
      <div className={`add-product w-[100%] ${navbarCollapse ? "h-[100vh]" : ""} flex flex-col justify-start items-start gap-[30px] px-[20px] mx-[200px] mt-[40px] overflow-x-hidden text-white bg-amber-300`}>
        <div className="add-product-text w-[400px] h-[50px] text-[25px] md:text-[40px] font-bold">Add Products</div>
        <form action="" className="add-product-form w-[100%] md:w-[90%] h-[100%] flex flex-col justify-start items:start gap-[20px] px-[30px] md:px-[60px] bg-blue-700">
          <p className='upload-image-text text-[25px] md:text-[30px] font-semibold'> Upload Image</p>
          <div className="upload-image w-[100%]  flex justify-start items-center gap-[40px]">
            {/* Image1 upload */}
            <label htmlFor="image1" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer mb-[25px] hover:border-[#46d1f7]'>
              <img src={!image1 ? "./upload-image.png" : URL.createObjectURL(image1)} alt="image1" className='w-[80%] h-[80%] rounded-lg shadow-2xl bg-yellow-50 hover:border-[#1d1d1d] border-[2px] mb-[10px]' />
              <input type="file" className="add-image my-[10px] bg-white text-black hidden" id='image1' onChange={(e) => { setImage1(e.target.files[0]) }} />
            </label>
            {/* Image2 upload */}
            <label htmlFor="image2" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer mb-[25px] hover:border-[#46d1f7]'>
              <img src={!image2 ? "./upload-image.png" : URL.createObjectURL(image2)} alt="image2" className='w-[80%] h-[80%] rounded-lg shadow-2xl bg-yellow-50 hover:border-[#1d1d1d] border-[2px] mb-[10px]' />
              <input type="file" className="add-image my-[10px] bg-white text-black hidden" id='image2' onChange={(e) => { setImage2(e.target.files[0]) }} />
            </label>
            {/* Image3 upload */}
            <label htmlFor="image3" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer mb-[25px] hover:border-[#46d1f7]'>
              <img src={!image3 ? "./upload-image.png" : URL.createObjectURL(image3)} alt="image3" className='w-[80%] h-[80%] rounded-lg shadow-2xl bg-yellow-50 hover:border-[#1d1d1d] border-[2px] mb-[10px]' />
              <input type="file" className="add-image my-[10px] bg-white text-black hidden" id='image3' onChange={(e) => { setImage3(e.target.files[0]) }} />
            </label>
            {/* Image4 upload */}
            <label htmlFor="image4" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer mb-[25px] hover:border-[#46d1f7]'>
              <img src={!image4 ? "./upload-image.png" : URL.createObjectURL(image4)} alt="image4" className='w-[80%] h-[80%] rounded-lg shadow-2xl bg-yellow-50 hover:border-[#1d1d1d] border-[2px] mb-[10px]' />
              <input type="file" className="add-image my-[10px] bg-white text-black hidden" id='image4' onChange={(e) => { setImage4(e.target.files[0]) }} />
            </label>
          </div>
          {/* Other form details */}
          {/* Product Details */}
          <div className="w-[80%] flex justify-start items-start flex-col gap-[1px] mb-[10px]">
            <p className='text-[25px] md:text-[30px] font-semibold'>Product Detail</p>
            <input type="text" placeholder='Type here' className='w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2]' />
          </div>
          {/* Product Description */}
          <div className="w-[80%] flex justify-start items-start flex-col gap-[1px] mb-[10px]">
            <p className='text-[25px] md:text-[30px] font-semibold'>Product Descripotion</p>
            <textarea type="text" placeholder='Type here' className='w-[600px] max-w-[98%] h-[100px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] py-[10px] text-[18px] placeholder:text-[#ffffffc2]' />
          </div>
          {/* Product category */}
          <div className="w-[80%] flex justify-start items-start gap-[20px] flex-wrap">
            {/* Category */}
            <div className="md:w-[40%] w-full flex flex-col gap-[8px]">
              <p className="text-[16px] md:text-[20px] font-semibold text-white">
                Product Category
              </p>
              <select
                className="bg-slate-600 text-white w-full md:w-[80%] px-3 py-2 rounded-lg border-2 border-transparent hover:border-[#46d1f7] focus:outline-none focus:border-[#46d1f7]"
                name="category"
                id="category"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            {/* Sub-Category */}
            <div className="md:w-[40%] w-full flex flex-col gap-[8px]">
              <p className="text-[16px] md:text-[20px] font-semibold text-white">
                Product Sub-Category
              </p>
              <select
                className="bg-slate-600 text-white w-full md:w-[80%] px-3 py-2 rounded-lg border-2 border-transparent hover:border-[#46d1f7] focus:outline-none focus:border-[#46d1f7]"
                name="subcategory"
                id="subcategory"
              >
                <option value="TopWear">Top Wear</option>
                <option value="BottomWear">Bottom Wear</option>
                <option value="Winterwear">Winter Wear</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
