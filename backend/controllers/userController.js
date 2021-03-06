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
        token: generateToken(user._id),
    })
    //response returns all listed user info above
     } else {
         // if password doesn't match, throw error
         res.status(401)
         throw new Error('Invalid email or password')
     }
})


// @desc: Register a new user
// @route POST /api/users
// @access Public Route

const registerUser = asyncHandler(async(req, res) => {
    // use async, because dealing with a promise below
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if( userExists ){
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if( user ){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            //generateToken takes the user id as an argument * incude that here
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


// @desc: Get user profile
// @route GET /api/users/profile
// @access Private Route

const getUserProfile = asyncHandler(async(req, res) => {
    // use async, because dealing with a promise below
    const user = await User.findById(req.user._id)

    if( user ){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
    res.send('success')

})


// @desc: Update user profile
// @route  PUT /api/users/profile
// @access Private Route (need to be logged in)

const updateUserProfile = asyncHandler(async(req, res) => {
    // use async, because dealing with a promise below
    const user = await User.findById(req.user._id)

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })

    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc: Get all users
// @route  GET /api/users
// @access Private/ Admin Route (need to be logged in)

const getUsers = asyncHandler(async(req, res) => {
    // use async, because dealing with a promise below
    const users = await User.find({})
    res.json(users)

})

// @desc: Delete user
// @route  DELETE /api/users/:id
// @access Private/ Admin Route

const deleteUser = asyncHandler(async(req, res) => {
    // use async, because dealing with a promise below
    const user = await User.findById(req.params.id)
    
    if(user){
        await user.remove()
        res.json({ message: 'User Removed'})
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


// @desc: Get user by id
// @route  GET /api/users/:id
// @access Private/ Admin Route

const getUserById = asyncHandler(async(req, res) => {
    // use async, because dealing with a promise below
    const user = await User.findById(req.params.id).select('-password')
   if(user){ //if we're able to find that user
     res.json(user)
   } else {
       res.status(404)
       throw new Error('User not found')
   }

})


// @desc: Update user 
// @route  PUT /api/users/:id
// @access Private/ Admin Route 

const updateUser= asyncHandler(async(req, res) => {
    // use async, because dealing with a promise below

    const user = await User.findById(req.params.id)
    //use req.params.id to find NOT the logged in user, but the one we are searching for

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })

    } else {
        res.status(404)
        throw new Error('User not found')
    }
})



export { 
    authUser, 
    getUserProfile, 
    registerUser, 
    updateUserProfile, 
    getUsers, 
    deleteUser,
    getUserById,
    updateUser
}