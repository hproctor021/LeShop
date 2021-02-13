// Setting all of the routes

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

