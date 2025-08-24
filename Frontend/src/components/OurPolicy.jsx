import React from 'react'
import Title from './Title'
import { GiCardExchange } from "react-icons/gi";
import { GiReturnArrow } from "react-icons/gi";
import { BiSupport } from "react-icons/bi";

export default function OurPolicy() {
    return (
        <div className='w-[100%] min-h-[80vh] md:h-[80vh] flex flex-col justify-start items-center gap-[20px]'>
            {/* Title */}
            <div className="w-[100%] text-center">
                <Title text1={"OUR"} text2={"POLICIES"} />
                <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-200'>
                    Customer Friendly Polocies - Committed to Your Satisfaction and Safety
                </p>
            </div>
            {/* Policies */}
            <div className="w-[100%]  flex items-start justify-center flex-wrap gap-[10px] md:gap- lg:gap-[50px]">
                {/* Exchange */}
                <div className="w-[250px] md:w-[300px}] lg:w-[400px] h-[130px] md:h-[200px] flex flex-col justify-center items-center gap-[10px]">
                    <GiCardExchange className='md:w-[60px] w-[30px] h-[30px] md:h-[60px] text-[#90b9ff]' />
                    <div>
                        <p className="font-semibold md:text-[25px] text-[19px] text-[#a5e8f7] text-center !m-0">Easy Exchange Policy</p>
                        <p className="md:text-[14px] text-[12px] text-[aliceblue] text-center !m-0">Exchange Made Easy - Quick, Simple and Customer-Friendly Process
                        </p>
                    </div>
                </div>
                {/* Return */}
                <div className="w-[250px] md:w-[300px}] lg:w-[400px] h-[130px] md:h-[200px] flex flex-col justify-center items-center gap-[10px]">
                    <GiReturnArrow className='md:w-[60px] w-[30px] h-[30px] md:h-[60px] text-[#90b9ff]' />
                    <div>
                        <p className="font-semibold md:text-[25px] text-[19px] text-[#a5e8f7] text-center !m-0">10 Days Return Policy</p>
                        <p className="md:text-[14px] text-[12px] text-[aliceblue] text-center !m-0">Shop with Confidence - 10 Days Easy Return Guarantee
                        </p>
                    </div>
                </div>
                {/*  */}
                <div className="w-[250px] md:w-[300px}] lg:w-[400px] h-[130px] md:h-[200px] flex flex-col justify-center items-center gap-[10px]">
                    <BiSupport  className='md:w-[60px] w-[30px] h-[30px] md:h-[60px] text-[#90b9ff]' />
                    <div>
                        <p className="font-semibold md:text-[25px] text-[19px] text-[#a5e8f7] text-center !m-0">Best Customer Support</p>
                        <p className="md:text-[14px] text-[12px] text-[aliceblue] text-center !m-0">Your Satisfaction Is Our Priority.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
