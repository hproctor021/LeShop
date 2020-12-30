// Setting all of the routes

import express from 'express'
// const express = require('express')
import dotenv from 'dotenv'
// const dotenv = require('dotenv')
import connectDB from './config/db.js'
// connects the DB made with mongoDB
import colors from 'colors'
// imports colors package to add color to console
import products from './data/products.js'
// const products = require('./data/products.js')
// common js commented out, ES ( up to date version ) modules is used^^

dotenv.config()

connectDB()
// calls to connect what was imported on line 7
const app = express()

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.get('/api/products', (req, res) => {
    res.json(products)
})
// allows to fetch all products

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id)
    res.json(product)
})
// returns a SINGlE product


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))
// above lines allows the server to run on port 5000 which is define in the .env file || 
// if not found, on port 5000

