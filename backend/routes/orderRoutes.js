import express from 'express'
const router = express.Router()
import { 
    addOrderItems,
    getOrderById,
    updateOrderToPaid
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'


router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)
// always put '/:id' route below the others so it doesn't get 
// confused by trying to use what follows the '/' as an :id
router.route('/:id/pay').put(protect, updateOrderToPaid)


export default router