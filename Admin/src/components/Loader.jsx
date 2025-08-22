import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

export default function Loader(props) {
  // Destructure the props
  const { loaderVariant } = props;

  return (
      <>
        {loaderVariant === "pageLoading" && (
          <div className="spinner w-[100vw] h-[100vh] flex justify-center items-center">
            <Spinner animation="grow" variant="white" className='!w-[80px] !h-[80px]'/>
          </div>
        )}
  
        {(loaderVariant === "addProduct" || loaderVariant === "editProduct") && (
          <div className="spinner w-[100vw] h-[100vh] flex justify-center items-center">
            <Spinner animation="grow" variant="success" className='!w-[80px] !h-[80px]'/>
          </div>
        )}
  
        {(loaderVariant === "deleteProduct") && (
          <div className="spinner w-[100vw] h-[100vh] flex justify-center items-center">
            <Spinner animation="grow" variant="danger" className='!w-[80px] !h-[80px]'/>
          </div>
        )}
      </>
    )
}
