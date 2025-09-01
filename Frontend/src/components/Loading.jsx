import React, { useState, useEffect } from "react";

export default function Loading() {
    const [dots, setDots] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + "." : ""));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    // text-[#1f2b3c]
    return (
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center rounded-2xl backdrop-blur-sm bg-clip-text text-transparent text-[32px] md:text-[48px] font-semibold p-[20px]">
            Loading{dots}
        </div>
    )
}