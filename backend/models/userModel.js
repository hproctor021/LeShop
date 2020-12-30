import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
    // by passing in timestamp as second set of options, 
 })

 const User = mongoose.model('User', userSchema)
//  creates model called 'User'. using the userSchema
 export default User