import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc: FETCH ALL PRODUCTS
// @route GET /api/products
// @access Public Route

const getProducts = asyncHander(async(req, res) => {
     // use async, because dealing with a promise below
     const products = await Product.find({})
     // whenever we use a mongoose method, it returns a promises, so can use .then() OR await
     res.json(products)
})

// @desc: FETCH SINGLE PRODUCT
// @route GET /api/products/:id
// @access Public Route

const getProductById = asyncHander(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if (product){
        res.json(product)
    } else {
        res.status(404)
        // because we made custom errorHandler optional to set status ^^ 
        //if no status set, default will be 500 error
        // can use throw new Error INSTEAD of res.json() because of the errorHandler
        throw new Error('Product not found')
    }
})

export {
    getProducts,
    getProductById
}