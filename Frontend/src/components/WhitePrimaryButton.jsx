import React from 'react'

export default function WhitePrimaryButton(props) {
    // Destructuring props
    const {disabled, buttonText} = props;
    return (
        <button className="w-[100%] h-[50px] !text-[18px] sm:!text-[20px] font-[600] !rounded-[10px] bg-[white] backdrop-blur-xs text-[black] hover:bg-[transparent] hover:text-[white] disabled:opacity-50  disabled:hover:bg-[white] disabled:hover:text-[black]" type="submit" disabled={disabled}>
            {buttonText}
        </button>
    )
}
