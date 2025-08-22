import React, { useState } from 'react'
import { Link } from 'react-router';
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoListSharp } from "react-icons/io5";
import { BsCartCheck } from "react-icons/bs";


export default function Sidebar() {
    // State to store the sidebar display action
    const [sidebarCollapse, setsidebarCollapse] = useState(true);

    // State to store the display of side bar text
    const [siderbarTextDisplay, setSidebarTextDislay] = useState(false);

    const handleSideBarMouseEnter = () => {
        // Set the sidebar display on
        setsidebarCollapse(false);

        // Set the sidebar text display with delay
        setTimeout(() => {
            setSidebarTextDislay(true);
        },350);
        // setSidebarTextDislay(true);
    }

    const handleSideBarMouseLeave = () => {
        // Set the sidebar display on
        setsidebarCollapse(true);

        // Set the sidebar text display with delay
        setTimeout(() => {
            setSidebarTextDislay(false);
        },350);
        // setSidebarTextDislay(false);
    }

    return (
        <>
            {sidebarCollapse ? (
                <div className='side-bar w-[60px] min-h-[calc(100vh-80px)] border-r-[1px] rounded-r-[20px] py-[20px] my-[5px] text-white fixed bottom-0 left-0 transition-all duration-[0.5s] ease-in-out' onMouseEnter={handleSideBarMouseEnter} onMouseLeave={handleSideBarMouseLeave}>
                    <div className="sidebar-items flex flex-col gap-4 py-[40px] ">
                        <Link className="sidebar-item-link !no-underline !text-white" to="/addproduct">
                            <div className='flex justify-center items-center md:justify-start gap-3 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89]'>
                                <IoIosAddCircleOutline className='h-[30px] w-[30px]' />
                            </div>
                        </Link>
                        <Link className="sidebar-item-link !no-underline !text-white" to="/itemlist">
                            <div className='flex justify-center items-center md:justify-start gap-3 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89]'>
                                <IoListSharp className='h-[30px] w-[30px]' />
                            </div>
                        </Link>
                        <Link className="sidebar-item-link !no-underline !text-white" to="/orders">
                            <div className='flex justify-center items-center md:justify-start gap-3 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89]'>
                                <BsCartCheck className='h-[30px] w-[30px]' />
                            </div>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className='side-bar w-[18%] min-h-[calc(100vh-80px)] border-r-[1px] rounded-r-[20px] py-[20px] my-[5px] text-white fixed bottom-0 left-0 transition-all duration-[0.5s] ease-in-out' onMouseEnter={handleSideBarMouseEnter} onMouseLeave={handleSideBarMouseLeave}>
                    <div className="sidebar-items flex flex-col gap-4 py-[40px] md:pl-[20%] ">
                        <Link className="sidebar-item-link !no-underline !text-white" to="/addproduct">
                            <div className='flex justify-center items-center md:justify-start gap-3 md:border md:border-gray-300 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89]'>
                                <IoIosAddCircleOutline className=' h-[30px] w-[30px]' />
                                {siderbarTextDisplay && <p className={`hidden md:text-[14px] lg:text-[18px] md:block !mb-0`}>Add Items</p>}
                            </div>
                        </Link>
                        <Link className="sidebar-item-link !no-underline !text-white" to="/itemlist">
                            <div className='flex justify-center items-center md:justify-start gap-3 md:border md:border-gray-300 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89]'>
                                <IoListSharp className=' h-[30px] w-[30px]' />
                                {siderbarTextDisplay && <p className='hidden md:text-[14px] lg:text-[18px]  md:block !mb-0'>List Items</p>}
                            </div>
                        </Link>
                        <Link className="sidebar-item-link !no-underline !text-white" to="/orders">
                            <div className='flex justify-center items-center md:justify-start gap-3 md:border md:border-gray-300 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89]'>
                                <BsCartCheck className=' h-[30px] w-[30px]' />
                                {siderbarTextDisplay && <p className='hidden md:text-[14px] lg:text-[18px]  md:block !mb-0'>Orders</p>}
                            </div>
                        </Link>
                    </div>
                </div>
            )}
        </>
    )
}

