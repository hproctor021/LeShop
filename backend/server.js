// Setting all of the routes

import path from 'path'
// node js module to work with file paths
import express from 'express'
// const express = require('express')
import dotenv from 'dotenv'
// const dotenv = require('dotenv')
import connectDB from './config/db.js'
// connects the DB made with mongoDB
import colors from 'colors'
// imports colors package to add color to console
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'


dotenv.config()

connectDB()
// calls to connect what was imported on line 7
const app = express()


app.use(express.json())
// allows us to accept json data in the body in userController


app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/products', productRoutes)
// anything that goes to '/api/products', this will be linked to productRoutes
app.use('/api/users', userRoutes)
// here we are moutning the userRoutes to '/api/users' (this is how we can just use '/login' in the userRoutes file)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
// set endpoint ^^ for admin to upload an image for a product


app.get('/api/config/paypal', (req, res) => 
    res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
// 
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
// to make a folder static ^^              ^^ takes us to the current folder (directory name)--> in this case the uploads folder
//                                        BUT that's only available when using common JS, NOT ES6, so we create the const __dirname to resolve that


app.use(notFound)
app.use(errorHandler)
// gives app access to our error middleware 

const PORT = process.env.PORT || 5000

app.listen(
    PORT, 
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
        ))
// above lines allows the server to run on port 5000 which is define in the .env file || 
// if not found, on port 5000

