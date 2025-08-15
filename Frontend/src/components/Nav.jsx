import React from 'react'
import {Link} from 'react-router';
import Logo from '../assets/logo-wo-background-c.png';
import ItemsButtonLarge from './ItemsButtonLarge';
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

export default function Nav() {
    return (
        <div className='w-[100vw] h-[70px] bg-[#597a7aec] z-10 fixed top-0 flex items0center justify-between px-[30px] shadow-xl shadow-black '>
            {/* Brand Logo */}
            <Link className='!no-underline' to='/'>
                <div className="brand-logo w-[100%] max-w-[380px] h-[100%] flex justify-start items-center gap-[20px] py-[auto]">
                    <img className="h-[8vh] object-cover" src={Logo} alt="Brnad logo" />
                    <span className="brand-name text-[24px] font-[600] text-[white]">ShopCart</span>
                </div>
            </Link>
            {/* Navbar items */}
            <div className="navbar-items w-[450px] bg-amber-400">
                <ul className="w-[100%] h-[100%] flex items-center justify-center gap-[20px] text-white ps-0">
                    <li> <ItemsButtonLarge text={'Home'}/> </li>
                    <li> <ItemsButtonLarge text={'Collections'}/> </li>
                    <li> <ItemsButtonLarge text={'About'}/> </li>
                    <li> <ItemsButtonLarge text={'Contact'}/> </li>
                </ul>
            </div>

            <div className="navbar-items w-[100px] bg-amber-400 flex items-center justify-end gap-[20px] relative">
                <FaSearch className='w-[50px] h-[25px]'/>
                <FaUserCircle className='w-[50px] h-[25px]'/>
                <FaCartShopping className='w-[50px] h-[25px]'/>
                <div className='w-[16px] h-[16px] bg-red-500 text-[8px] text-white rounded-full flex justify-center items-center absolute top-[12px] right-[-10px]' >
                    <span>10</span>
                </div>
            </div>
        </div>
    )
}
