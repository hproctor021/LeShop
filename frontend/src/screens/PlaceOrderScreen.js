import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'

const PlaceOrderScreen = () => {

const cart = useSelector(state => state.cart)


const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
}

//Calculate Product Prices
cart.itemsPrice = addDecimals(cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
))

//Calculate Shipping Price
cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 75)

//Calculate Tax Price
cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))

//Calculate Total Price
cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
).toFixed(2)


const placeOrderHandler = () => {
    console.log('place order')
}

    return (
        <>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p className='ml-5'>
                            <strong>Address:</strong>
                            <h6 >{cart.shippingAddress.address}</h6>
                            <h6>{cart.shippingAddress.city}, 
                            {cart.shippingAddress.postalCode}</h6>
                            <h6>{cart.shippingAddress.country}</h6>
                        </p>
                    </ListGroup.Item>
                    
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <strong className='ml-5'>Method:</strong>
                        <h6 className='ml-5'>{cart.paymentMethod}</h6>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items:</h2>
                        {cart.cartItems.length === 0 
                            ? <Message>Your cart is empty</Message>
                            : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image 
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = {item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary:</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button 
                            type='button'
                            className='btn-block'
                            disabled={cart.items === 0}
                            onClick={placeOrderHandler}
                        >
                            Place Order
                        </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
            
        </>
    )
}

export default PlaceOrderScreen
