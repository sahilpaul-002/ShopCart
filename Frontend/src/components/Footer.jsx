import React from 'react'
import logo from '../assets/logo-w-background-c.png';
import Separator90 from './Separator90';

export default function Footer() {
    return (
        <div className='bg-blue-300 w-[100vw] h-[30vh] md:h-[40vh] pb-[70px] md:pb-[40px]'>
            <div className="-[100%] md:h-[90%] h-[20vh] flex justify-center items-center md:px-[50px] px-[5px]">
                <div className="-[60%] md:w-[60%] h-[100%] flex flex-col justify-center items-start gap-[5px]">
                    <div className="flex justify-start items-start gap-[20px] mt-[10px] md:mt-[40px]">
                        <img src={logo} alt="Logo" className='md:w-[60px] md:h-[60px] w-[30px] h-[30px]' />
                        <p className="text-[19px] md:text-[24px] text-black">ShopCart</p>
                    </div>
                    <p className="text[15px] text-[#1e2223] hidden md:block">ShopCart is your all-in-one online shopping destination, offering top-quality products, unbeatable deals, and fast delivery-all backed by trusted service designed to make your life easier every day.</p>
                    <p className="text[15px] text-[#1e2223] flex md:hidden">Fast. Easy. Reliable. ShopCart Shopping</p>
                </div>
                <div className="w-[30%] md:w-[25%] h-[100%] flex flex-col justify-center items-center gap-[5px] text-center">
                    <div className="lex justify-center tirms-center gap-[5px] mt-[10px] md:mt-[40px]">
                        <p className="text-[19px] md:text-[24px] text-[#le2223] font-sans">COMPANY</p>
                    </div>
                    <ul className='!m-0 !p-0'>
                        <li className="text-[15px] text-[#le2223] md:block cursor-pointer">Home</li>
                        <li className="text-[15px] text-[#le2223] md:block cursor-pointer">About Us</li>
                        <li className="text-[15px] text-[#le2223] md:block cursor-pointer">Delivery</li>
                        <li className="text-[15px] text-[#le2223] md:block cursor-pointer">Privacy Policy</li>
                    </ul>
                </div>
                <div className="-[40%] md:w-[30%] h-[100%] flex flex-col justify-center items-center gap-[5px] text-center">
                    <div className="lex justify-center tirms-center gap-[5px] mt-[10px] md:mt-[40px]">
                        <p className="text-[19px] md:text-[24px] text-[#le2223] font-sans">GET IN TOUCH</p>
                    </div>
                    <ul className='!m-0 !p-0'>
                        <li className="text-[15px] text-[#le2223] md:block cursor-pointer">+91 7439475212</li>
                        <li className="text-[15px] text-[#le2223] md:block cursor-pointer">paulcode1234@gmail.com</li>
                        <li className="text-[15px] text-[#le2223] md:block cursor-pointer">+1-123-1234-12345</li>
                        <li className="text-[15px] text-[#le2223] md:block cursor-pointer">admin@shopCart.com</li>
                    </ul>
                </div>
            </div>
            <Separator90 />
            <div className="w-[100%] h-[5vh] bg-blue-300 flex items-center justify-center pb-[100px] md:pb-0">Copyright 2025@shopcart.com-All Rights Reserved</div>
        </div>
    )
}
