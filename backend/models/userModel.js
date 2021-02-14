import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

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
    // by passing in timestamp as second argument of options, 
 })

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function(next){
    if( !this.isModified('password')){
        //isModified() is a mongoose method that allws us to check what we pass into the argument
        next()
    }
    //meaning if they are just updating- it is already encrypted, if not, encrypt
    const salt = await bcrypt.genSalt(10)
    // need to create salt to encrypt password BEFORE saving
    this.password = await bcrypt.hash(this.password, salt)
})

 const User = mongoose.model('User', userSchema)
//  creates model called 'User'. using the userSchema
 export default User