import React, { useContext, useEffect, useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import Separator90 from '../components/Separator90';
import Title from '../components/Title';
import AllProductsContext from '../contexts/AllProductsContext';
import ProductCard from '../components/ProductCard';
import HorizontalProductCard from '../components/HorizontalProductCard';
import SearchCollapseContext from '../contexts/SearchCollapseContext';
import Loader from '../components/Loader';

export default function Collections() {
  // Destructure context props
  const { products } = useContext(AllProductsContext);
  const { search } = useContext(SearchCollapseContext);

  // Retrieve search term from the url
  const query = new URLSearchParams(location.search);
  const searchTerm = query.get("search");

  // Statet to handle display filters in small device
  const [showFilters, setShowFilters] = useState(false);

  // State to store the filtered products
  const [filteredProducts, setFilteredProducts] = useState(products || null);

  // State to stroe the searched item
  const [searchedItem, setSearchedItem] = useState(null);

  // State to manage the loading state
  const [loading, setLoading] = useState(true);

  // UseEffect to store the searchedItem
  useEffect(() => {
    setSearchedItem(search);
  }, [search]);

  // UseEffect to initial update filteredProducts with products
  useEffect(() => {
    if (products) {
      // setFilteredProducts(products);

      // Reset the loading state
      // setLoading(false);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [products]);

  // ---------------------------- Logic to handle product filters ---------------------------- \\
  // State to store the applied filters
  const [productFilters, setProductFilters] = useState({
    categories: [],
    subCategories: [],
    sortBy: "relevant"
  });

  // Logic to handle the adding or removing category filter
  const toggleCategory = (e) => {
    if (productFilters.categories.includes(e.target.value)) {
      const appliedCategories = productFilters.categories.filter((category) => {
        return (
          category !== e.target.value
        )
      })
      setProductFilters((prev) => ({
        ...prev,
        categories: appliedCategories
      }))
    }
    else {
      const appliedCategories = [...productFilters.categories, e.target.value];
      setProductFilters((prev) => ({
        ...prev,
        categories: appliedCategories
      }));
    }
  }

  // Logic to handle adding or removing the subCategory filters
  const toggleSubCategory = (e) => {
    if (productFilters.subCategories.includes(e.target.value)) {
      const appliedSubCategories = productFilters.subCategories.filter((subCategory) => {
        return (
          subCategory !== e.target.value
        )
      })
      setProductFilters((prev) => ({
        ...prev,
        subCategories: appliedSubCategories
      }))
    }
    else {
      const appliedSubCategories = [...productFilters.subCategories, e.target.value];
      setProductFilters((prev) => ({
        ...prev,
        subCategories: appliedSubCategories
      }));
    }
  }

  // Logic to handle changing the sorting category
  const toggleSorting = (e) => {
    setProductFilters((prev) => ({ ...prev, sortBy: e.target.value }))
  }

  // UseEffect to change products UI based on criteria
  useEffect(() => {
    if (!products) return;

    let filtered = products;

    // URL search
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Context search (from SearchCollapseContext)
    if (searchedItem) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchedItem.toLowerCase()) ||
        product.description.toLowerCase().includes(searchedItem.toLowerCase())
      );
    }

    // Apply category / subCategory filters
    if (productFilters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        productFilters.categories.includes(product.category)
      );
    }
    if (productFilters.subCategories.length > 0) {
      filtered = filtered.filter((product) =>
        productFilters.subCategories.includes(product.subCategory)
      );
    }

    // Sorting
    if (productFilters.sortBy === "low-high") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (productFilters.sortBy === "high-low") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, searchedItem, productFilters]);
  // ---------------------------- ************************ ---------------------------- \\

  // ------------------------ Logic to handle reset filter ------------------------ \\
  const handleResetFilters = () => {
    setProductFilters({
      categories: [],
      subCategories: [],
      sortBy: "relevant"
    })
  }
  // ----------------------------- ********************* ----------------------------- \\

  // --------------------------- Logic to disable page scrolling when loading --------------------------- \\
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden"; // disable scroll
    } else {
      document.body.style.overflow = "auto"; // enable scroll
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [loading]);
  // --------------------------- ************** --------------------------- \\

  return (
    <div className="collections-page-container w-[100vw] min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[70px] ">
      <div className="w-[100%] h-[100%] flex flex-col md:flex-row">
        {/* Filters */}
        <div className={`filters w-[100vw] md:w-[46vw] lg:w-[30vw]  ${showFilters ? "h-[320px]" : "h-[50px]"} md:min-h-[100vh] px-[10px] md:pl-[20px] pb-[40px] pt-[80px] md:pt-[70px] border-r-[1px] border-gray-400 text-[#aaf5fa] md:sticky top-[70px] left-0 z-10`}>
          <div className="flex justify-between items-center">
            <p className="text-[24px] font-semibold flex justify-start items-center gap-[5px] cursor-pointer md:cursor-default" onClick={() => { setShowFilters(prev => !prev) }}>
              FILTERS
              {!showFilters ? <IoIosArrowDown className='inline-block md:hidden' /> : <IoIosArrowUp className='inline-block md:hidden' />}
            </p>
            <span className="!px-[4px] !py-[1px] !mb-[0.5rem] mr-10 md:mr-0 !rounded-[2px] border-gray-400 border-1 text-white !text-[12px] hover:bg-red-400 cursor-pointer" onClick={handleResetFilters}>
              Reset
            </span>
          </div>

          <div className={`w-[100%] ${showFilters ? "flex" : "hidden"} md:flex md:flex-col justify-start items-start gap-[10px] md:pl-0 pl-4`}>
            {/* Categories */}
            <div className="w-[70%] md:w-[95%] border-[2px] border-[#dedcdc] pl-2 md:pl-5 py-3 rounded-md bg-slate-600">
              <p className="text-[18px] text-[#f8fafa]">CATEGORIES</p>
              <div className="w-[140px] md:w-[100%] h-[90px] flex flex-col justify-start items-start gap-[2px] pl-[10px]">
                <p className="flex justify-center items-center gap-[10px] text-[16px] font-light mb-0">
                  <input type="checkbox" value={"Men"} className='w-3 px-[10px]' checked={productFilters.categories.includes("Men")} onChange={toggleCategory} />
                  Men
                </p>
                <p className="flex justify-center items-center gap-[10px] text-[16px] font-light mb-0">
                  <input type="checkbox" value={"Women"} className='w-3 px-[10px]' checked={productFilters.categories.includes("Women")} onChange={toggleCategory} />
                  Women
                </p>
                <p className="flex justify-center items-center gap-[10px] text-[16px] font-light mb-0">
                  <input type="checkbox" value={"Kids"} className='w-3 px-[10px]' checked={productFilters.categories.includes("Kids")} onChange={toggleCategory} />
                  Kid
                </p>
              </div>
            </div>

            {/* Sub-category */}
            <div className="w-[70%] md:w-[95%] border-[2px] border-[#dedcdc] pl-2 md:pl-5 py-3  rounded-md bg-slate-600">
              <p className="text-[18px] text-[#f8fafa]">SUB - CATEGORIES</p>
              <div className="w-[140px] md:w-[100%] h-[90px] flex flex-col justify-start items-start gap-[2px] pl-[10px]">
                <p className="flex justify-center items-center gap-[10px] text-[16px] font-light mb-0">
                  <input type="checkbox" value={"TopWear"} className='w-3 px-[10px]' checked={productFilters.subCategories.includes("TopWear")} onChange={toggleSubCategory} />
                  Top Wear
                </p>
                <p className="flex justify-center items-center gap-[10px] text-[16px] font-light mb-0">
                  <input type="checkbox" value={"BottomWear"} className='w-3 px-[10px]' checked={productFilters.subCategories.includes("BottomWear")} onChange={toggleSubCategory} />
                  Bottom Wear
                </p>
                <p className="flex justify-center items-center gap-[10px] text-[16px] font-light mb-0">
                  <input type="checkbox" value={"Winterwear"} className='w-3 px-[10px]' checked={productFilters.subCategories.includes("Winterwear")} onChange={toggleSubCategory} />
                  Winter Wear
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Separator for small screen */}
        <div className="w-[100vw] md:hidden">
          <Separator90 />
        </div>

        {/* Collections */}
        <div className="collections w-[100vw] md:w-[82vw] min-h-screen pb-[40px] md:pt-[70px] px-[20px] my-[20px]">
          <div className="w-[90vw] md:w-[66vw] lg:w-[76vw] flex  justify-between items-start lg:items-center">
            <Title text1={"All"} text2={"Collections"} />
            {/* w-[60%] */}
            <select name="" id="" className='bg-slate-600  w-[140px] h-[40px] px-[10px] text-white !text-[12px] rounded-lg hover:border-[#46d1f7] border-[2px]' value={productFilters.sortBy} onChange={toggleSorting}>
              <option value="relevant" className="w-[100%] h-[100%] !text-[12px]">
                Sort: Relevant
              </option>
              <option value="low-high" className="w-[100%] h-[100%] !text-[12px]">
                Sort: Low to High
              </option>
              <option value="high-low" className="w-[100%] h-[100%] !text-[12px]">
                Sort: High to Low
              </option>
            </select>
          </div>
          <div className="lg:w-[80vw] md:w-[70vw] w-[90vw] min-h-[70vh] pt-[20px] hidden lg:flex justify-center items-center gap-[30px] flex-wrap">
            {loading ? <Loader loaderVariant={"pageLoading"} /> :
              (
                filteredProducts ? filteredProducts.map(product => {
                  return (
                    <div key={product._id} className="mb-[20px]">
                      <ProductCard product={product} />
                    </div>
                  )
                }) : (
                  // <div className="w-[100%]">"No products available currently</div>
                  <div className='w-[100%] text-center mx-[auto] text-[18px] md:text-[25px] h-[100%] bg-gradient-to-r from-pink-400 to-red-500 flex items-center justify-center rounded-2xl backdrop-blur-sm my-[50px] p-[20px] font-bold bg-clip-text text-transparent'>
                    Opps! No products available currently.
                  </div>
                )
              )
            }
          </div>
          <div className="lg:w-[80vw] md:w-[70vw] w-[90vw] min-h-[70vh] pt-[20px] flex justify-center items-center gap-[30px] flex-wrap lg:hidden">
            {loading ? <Loader loaderVariant={"pageLoading"} /> :
              (
                filteredProducts ? filteredProducts.map(product => {
                  return (
                    <div key={product._id}>
                      <HorizontalProductCard product={product} />
                    </div>
                  )
                }) : (
                  // <div className="w-[100%]">"No products available currently</div>
                  <div className='w-[100%] text-center mx-[auto] text-[18px] md:text-[25px] h-[100%] bg-gradient-to-r from-pink-400 to-red-500 flex items-center justify-center rounded-2xl backdrop-blur-sm my-[50px] p-[20px] font-bold bg-clip-text text-transparent'>
                    Opps! No products available currently.
                  </div>
                )
              )
            }
          </div>
        </div>
      </div>
    </div>

  )


}