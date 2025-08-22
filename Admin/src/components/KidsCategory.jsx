import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { deleteProductDetails } from '../apiCalls/AdminProductDetails.js'

export default function KidsCategory(props) {
    // Destructure props
    const { kidProducts, loading, setLoading } = props;
    console.log(kidProducts)

    // Local state to manage products
    const [products, setProducts] = useState(kidProducts);

    // ----------------------------- Logic update the local state of products list  ----------------------------- \\
    useEffect(() => {
        setProducts(kidProducts);
    }, [kidProducts]);
    // ----------------------------- *********************** ----------------------------- \\

    // ----------------------------- Logic to handle delete product logic ----------------------------- \\
    const handleProductDelete = async (product) => {
        try {
            // Update deleteProduct Loading state
            setLoading((prev) => ({
                ...prev,
                deleteProductLoading: true
            }));

            const productId = product._id;

            // Call delet API to delete from database
            const deletedProduct = await deleteProductDetails(product);

            // Check api response
            if (!deletedProduct.success) {
                throw deletedProduct
            }

            // Remove the item from the local state to update the UI
            setProducts(products.filter(product => product._id !== productId));

            console.log({ success: true, message: deletedProduct.message, deletedProduct: deletedProduct.product })

            // Reset deleteProduct Loading state
            setLoading((prev) => ({
                ...prev,
                deleteProductLoading: false
            }));

        }
        catch (e) {
            // Reset deleteProduct Loading state
            setLoading((prev) => ({
                ...prev,
                deleteProductLoading: false
            }));

            console.error({ success: false, message: e.message });
        }
    }
    // ----------------------------- *************************** ----------------------------- \\

    return (
        <>
            {products && products.length > 0 ? (
                products.map((product, idx) => (
                    <Card key={idx} className="!w-[300px] mb-2">
                        <Card.Img
                            variant="top"
                            className="!h-[200px] !w-full !object-fill"
                            src={product.image1}
                        />
                        <Card.Body>
                            <div className="!w-[100] flex flex-col md:flex-row justify-between items-start md:items-center">
                                <Card.Title className='!line-clamp-1'>{product.name}</Card.Title>
                                <span className="!px-[2px] !py-[1px] !mb-[0.5rem] !rounded-[2px] !bg-gray-200 !text-red-500 !text-[12px]">
                                    Bestseller
                                </span>
                            </div>
                            <Card.Text className='!line-clamp-1'>{product.description}</Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>₹ {product.price}</ListGroup.Item>
                            <ListGroup.Item>{product.subCategory}</ListGroup.Item>
                            <ListGroup.Item className="!flex !justify-start !items-center !gap-[4%]">
                                {product.sizes.map((size, id) => (
                                    <span
                                        key={id}
                                        className="!w-[40px] !bg-gray-300 !px-[4px] !py-[2px] !rounded-[5px] !flex !justify-center !items-center"
                                    >
                                        {size}
                                    </span>
                                ))}
                            </ListGroup.Item>
                        </ListGroup>
                        <Card.Body className='!flex !justify-start !items-center !gap-[20px]'>
                            {/* Buttons or links can go here */}
                            <div className="delete-button w-[25px] h-[25px] !px-[4px] !py-[2px] bg-gray-300 rounded-[6px] flex justify-center items-center hover:bg-red-400 cursor-pointer">
                                <MdOutlineDelete onClick={() => { handleProductDelete(product) }} />
                            </div>
                            <div className="edit-button w-[25px] h-[25px] !px-[4px] !py-[2px] bg-gray-300 rounded-[6px] flex justify-center items-center hover:bg-green-300 cursor-pointer">
                                <FaRegEdit />
                            </div>
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <h3 className='w-[100vw] my-[auto] text-white '>No products found. Please add products</h3>
            )}
        </>
    )
}
