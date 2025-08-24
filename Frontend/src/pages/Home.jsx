import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import Background from '../components/Background';
import Hero from '../components/Hero';
import SearchCollapseContext from '../contexts/SearchCollapseContext';
import Products from '../components/Products';

export default function Home() {
  const location = useLocation();

  // Destruct the context props
  const { searchbarCollapse, setSearchbarCollapse } = useContext(SearchCollapseContext);


  // ---------------------------- Logic for carosol display ---------------------------- \\
  const heroData = [
    { text1: "Discover fashion you’ll love.", text2: "Shop the latest trends now" },
    { text1: "Top-rated styles, handpicked for you.", text2: "Curated just for your needs" },
    { text1: "Step into trends trusted by thousands.", text2: "Join 10,000+ happy shoppers" },
    { text1: "Quality you can trust, prices you’ll love.", text2: "Your 5-star approved looks." },
    { text1: "Shop smart, wear bold, shine brighter.", text2: "Upgrade your style today" },
  ];

  // State to store the image number of the hero banner
  const [heroCount, setHeroCount] = useState(0)

  // UseEffect to auto rotate the images
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount(prev => (prev === 4 ? 0 : prev + 1))
    }, 5000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);
  // ------------------------ ********** ------------------------ \\

  // ------------------------------------- Logic to reset the UI while navigating ------------------------------------- \\
  useEffect(() => {
    setSearchbarCollapse(true);
  }, [location]);
  // ------------------------------------- **************************** ------------------------------------- \\

  return (
    <>
      <div className="home-container w-[100vw] min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[70px] pb-[100px] md:px-[80px] px-[20px]">
        {/* Transparent div to manage the searchbar display action */}
        {!searchbarCollapse && <div className="transparent-navbar w-[100%] h-[75px] mb-[5px]"></div>}

        <div className="w-[100%] h-[100%] px-[20px] flex justify-between items-start gap-[10%] pb-[50px]">
          <Hero heroCount={heroCount} setHeroCount={setHeroCount} heroData={heroData[heroCount]} />
          <Background heroCount={heroCount} />
        </div>

        {/* Products */}
        <div className='w-[100%] py-[50px]'>
          <Products />
        </div>
      </div>
    </>
  )
}
