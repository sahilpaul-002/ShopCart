import React from 'react'
import { Link } from 'react-router'
import Logo from '../assets/logo-wo-background-c.png';

export default function Navbar() {
    return (
        <div className='w-[100vw] h-[12vh] bg-[transparent] px-[30px] py-[10px] flex justify-start items-center gap-[10px]'>
            <Link className='!no-underline' to='/'>
                <div className="brand-logo w-[100%] max-w-[380px] h-[8vh] flex justify-start items-center gap-[20px]">
                    <img className="h-[8vh] object-cover" src={Logo} alt="Brnad logo" />
                    <span className="brand-name text-[24px] font-[600] text-[white]">ShopCart</span>
                </div>
            </Link>
        </div>
    )
}
