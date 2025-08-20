import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function KidsCategory(props) {
    // Destructure props
    const { kidProducts } = props;
    console.log(kidProducts)
    return (
        <>
            {kidProducts && kidProducts.length > 0 ? (
                kidProducts.map((product, idx) => (
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
                            <ListGroup.Item>{product.price}</ListGroup.Item>
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
                        <Card.Body>
                            {/* Buttons or links can go here */}
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <h3 className='text-white'>No products found. Please add products</h3>
            )}
        </>
    )
}
