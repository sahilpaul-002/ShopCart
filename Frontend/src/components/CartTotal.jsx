import React, { useContext, useState, useEffect } from 'react'
import Title from './Title'
import AllProductsContext from '../contexts/AllProductsContext'
import UserCartContext from '../contexts/UserCartContext'

export default function CartTotal() {
  // Destructure context props
  const { currency, deliveryCharge } = useContext(AllProductsContext)
  const { cartProducts, totalCartAmount } = useContext(UserCartContext)

  return (
    <div className='w-full lg:ml-[30px]'>
      <div className='text-xl py-[10px]'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm p-[30px] border-[2px] border-[#4d8890]'>
        <div className='flex justify-between text-white text-[18px] p-[10px]'>
          <p >Subtotal</p>
          <p>{currency} {totalCartAmount && `${totalCartAmount}.00`}</p>
        </div>
        <hr />
        <div className='flex justify-between text-white text-[18px] p-[10px]'>
          <p>Shipping Fee</p>
          <p>{currency} {deliveryCharge}</p>
        </div>
        <hr />
        <div className='flex justify-between text-white text-[18px] p-[10px]'>
          <b>Total</b>
          <b>{currency} {totalCartAmount != null ? (totalCartAmount === 0 ? 0 : totalCartAmount + deliveryCharge) : "Error getting the quote"}</b>
        </div>

      </div>

    </div>
  )
}