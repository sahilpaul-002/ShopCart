import React, { useEffect, useState } from 'react'
import Background from '../components/Background';
import Hero from '../components/Hero';

export default function Home() {
  // Hero data texts
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
    setInterval(() => {
      setHeroCount(prev => (prev === 4 ? 0 : prev + 1))
    }, 5000);
  }, []);

  return (
    <>
      <div className="home-container w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[70px] md:px-[80px] px-[20px]">
        <Background heroCount={heroCount} />
        <Hero heroCount={heroCount} setHeroCount={setHeroCount} heroData={heroData[heroCount]} />
      </div>
      <div>Hello</div>
    </>
  )
}
