// this file is not a part of the application, 
// but a second script we can use to import data

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        // clears all these models, so not created more than once
        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id
        // we can hardcode the first user because we made them an admin
        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser }
        })

        await Product.insertMany(sampleProducts)

        console.log('Data Imported!'.green.inverse)
        process.exit()
    } catch(error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data Imported!'.red.inverse)
        process.exit()
    } catch(error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

if(process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}