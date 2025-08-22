import React from 'react'
import LatestCollections from './LatestCollections'
import BestSeller from './BestSeller'

export default function Product() {
  return (
    <div className='products w-[100%] h-[100%] flex flex-col justify-start items-center gap-[100px] bg-amber-300' >
      {/* Latest Collections */}
      <div className="latest-collections w-[100%] min-h[70px] bg-green-400 flex flex-col justify-center items-center gap-[10px]">
        <LatestCollections />
      </div>

      {/* Best Seller */}
      <div className="best-seller w-[100%] min-h[70px] bg-green-400 flex flex-col justify-center items-center gap-[10px]">
        <BestSeller />
      </div>
    </div>
  )
}
