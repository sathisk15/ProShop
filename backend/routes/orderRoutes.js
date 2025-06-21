import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
router.route('/allOrders').get(protect, getAllOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, updateOrderToDelivered);

export default router;
