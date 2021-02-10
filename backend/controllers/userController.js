import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// @desc: Auth user & GET token
// @route POST /api/users/login
// @access Public Route

const authUser = asyncHandler(async(req, res) => {
     // use async, because dealing with a promise below
     const { email, password } = req.body

     const user = await User.findOne({ email })

     if( user )
})

export { authUser }