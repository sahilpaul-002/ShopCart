import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

export default function Loader(props) {
  // Destructure the props
  const { loaderVariant } = props;

  return (
    <>
      {loaderVariant === "addProduct" && (
        <Spinner animation="grow" variant="light" className="!w-[80px] !h-[80px] !z-50" />
      )}
    </>
  )
}
