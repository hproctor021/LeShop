import express from 'express'
const router = express.Router()
import { authUser,
         getUserProfile,
         registerUser, 
         updateUserProfile,
         getUsers,
         deleteUser,
         getUserById,
         updateUser
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'


router.post('/login', authUser)
router.route('/').post(registerUser).get(protect, admin, getUsers)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser)
// because we want to apply our middleware to protect the getUserProfile route,
// we inclue it as a first argument in .get()

// only use '/login' because this will already be linked to /api/users


export default router

// Routes should just point to controller methods