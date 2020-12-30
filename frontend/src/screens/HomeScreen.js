import React, { useState, useEffect } from 'react'
import Product from '../components/Product'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'

const HomeScreen = () => {

    const [products, setProducts] = useState([])
    // what we want the data to be called and what function we run to set that data into state
    
    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products')
            // destructured data as the Response, using async await for promise management
            setProducts(data)
        }
        fetchProducts()
        // call the function outside of itself to use
    }, [])
    // put dependencies inside the square brackets, what will fire off when fxn runs

    return (
        <>
            <h1> Latest Products </h1>
            <Row>
                {products.map(product => 
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        {/* when mapping through somehting to create a list, must add a 
                        unique key to the element containing the 'list' */}
                        <Product product={product} />
                    </Col>)}
            </Row>
        </>
    )
}

export default HomeScreen
