import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'


const protect = asyncHandler(async(req, res, next) => {
    //midddleware fnuction so we use request, response and next
    let token

    if( req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            //this splits the Bearer from the token & accesses JUST the token

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')
            // use .select() to get everything EXCEPT what is in the parenthesis

            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
            // insures that we recieved the token that was issued upon authentication
        }
    }
    if( !token ){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

export { protect }