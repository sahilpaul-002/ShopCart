import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

export default function Loader(props) {
  // Destructure the props
  const { loaderVariant } = props;

  return (
    <>
      {loaderVariant === "pageLoading" && (
        <div className="spinner w-[100vw] h-[100vh] flex justify-center items-center bg-gray-700/50 backdrop-blur-sm fixed z-50 top-0 left-0">
          <div
            className="w-[100px] h-[100px] rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
        animate-[grow_1.5s_ease-in-out_infinite]"
          ></div>
        </div>
      )}

      {(loaderVariant === "addProduct" || loaderVariant === "editProduct") && (
        <div className="spinner w-[100vw] h-[100vh] flex justify-center items-center bg-gray-700/50 backdrop-blur-sm fixed z-50 top-0 left-0">
          <Spinner animation="grow" variant="success" className='!w-[100px] !h-[100px]' />
        </div>
      )}

      {(loaderVariant === "deleteProduct") && (
        <div className="spinner w-[100vw] h-[100vh] flex justify-center items-center bg-gray-700/50 backdrop-blur-sm fixed z-50 top-0 left-0">
          <Spinner animation="grow" variant="danger" className='!w-[100px] !h-[100px]' />
        </div>
      )}
    </>
  )
}
