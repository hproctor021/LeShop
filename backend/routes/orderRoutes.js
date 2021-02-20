import express from 'express'
const router = express.Router()
import { 
    addOrderItems,
    getOrderById
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'


router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)
// always put '/:id' route below the others so it doesn't get 
// confused by trying to use what follows the '/' as an :id


export default router