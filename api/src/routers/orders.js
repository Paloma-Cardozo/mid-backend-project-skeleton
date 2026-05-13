import express from "express";
import { checkout } from "#controllers/orders.js";
import { authenticate } from "#middlewares/auth.js";

const ordersRouter = express.Router();

/**
 * @swagger
 * /api/cart/checkout:
 *   post:
 *     summary: Checkout active cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Cart is empty
 *       401:
 *         description: Authentication required
 */

export default ordersRouter;
