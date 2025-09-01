import React, { useState, useEffect } from "react";

export default function Loading() {
    const [dots, setDots] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + "." : ""));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-[100%] h-[100%] bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center rounded-2xl backdrop-blur-sm text-[#1f2b3c] text-[24px] md:text-[36px] font-semibold p-[20px]">
            Loading{dots}
        </div>
    )
}