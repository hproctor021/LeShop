import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc: Auth user & GET token
// @route POST /api/users/login
// @access Public Route

const authUser = asyncHandler(async(req, res) => {
     // use async, because dealing with a promise below
     const { email, password } = req.body

     const user = await User.findOne({ email })

     if( user && (await user.matchPassword(password)) ){
    // see if user exists & password that we get from the body 
    //matched the encrypted password using bcrypt in the userModel
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        //generateToken takes the user id as an argument * incude that here
        token: generateToken(user._id)
    })
    //response returns all listed user info above
     } else {
         // if password doesn't match, throw error
         res.status(401)
         throw new Error('Invalid email or password')
     }
})

export { authUser }