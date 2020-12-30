import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true }
}, {
    timestamps: true
})

const productSchema = mongoose.Schema({
    user: {
        tyoe: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
        // adds a relationship between the object and the user
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviewa: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    numInStock: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
    // by passing in timestamp as second set of options, 
 })

 const Product = mongoose.model('Produc', productSchema)
//  creates model called 'Product'. using the productSchema
 export default Product