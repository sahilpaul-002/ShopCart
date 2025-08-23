import React, {useContext} from 'react'
import SearchCollapseContext from '../contexts/SearchCollapseContext';

export default function Collections() {
  // Destruct the context props
  const { searchbarCollapse } = useContext(SearchCollapseContext);

  return (
    <div className="home-container w-[100vw] min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[70px] pb-[100px] flex fles-col md:fles-row justify-start items-start overflow-x-hidden z-[2]">
      {/* Transparent div to manage the searchbar display action */}
      {!searchbarCollapse && <div className="transparent-navbar w-[100%] h-[75px] mb-[5px]"></div>}

      <div className="w-[100vw] md:w-[30vw] lg:[20vw] md:min-h-screen px-[20px] py-[40px] border-r-[1px] border-gray-400 text-[#aaf5fa] lg:fixed bg-amber-400">
        <p className="txt-[25px] font-semibold flex  justify-start items-center gap-[5px]">FILTERS</p>

        <div className="border-[2px] border-[#dedcdc] pl-5 py-3 lt-6 rounded-md bg-slate-600">
          <p className="text-[18px] text-[#f8fafa]">CATEGORIES</p>
          <div className="w-[230px] h-[120px] flex flex-col justify-start items-start gap-[5px] pl-[5px]">
            <p className="flesx justify-center items-center gap-[10px] text-[16px] font-light ">
              <input type="checkbox" value={"men"} className='w-3 px-[10px]'/>
              Men
            </p>
            <p className="flesx justify-center items-center gap-[10px] text-[16px] font-light">
              <input type="checkbox" value={"women"} className='w-3 px-[10px]'/>
              Women
            </p>
            <p className="flesx justify-center items-center gap-[10px] text-[16px] font-light">
              <input type="checkbox" value={"Kid"} className='w-3 px-[10px]'/>
              Kid
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
