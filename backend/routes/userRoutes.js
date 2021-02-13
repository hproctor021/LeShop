import express from 'express'
const router = express.Router()
import { authUser,
         getUserProfile 
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'


router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)
// because we want to apply our middleware to protect the getUserProfile route,
// we inclue it as a first argument in .get()

// only use '/login' because this will already be linked to /api/users


export default router

// Routes should just point to controller methods