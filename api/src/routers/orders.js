import express from "express";
import { checkout, listOrders } from "#controllers/orders.js";
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

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders for authenticated user
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 *       401:
 *         description: Authentication required
 */

ordersRouter.get("/", authenticate, listOrders);

export default ordersRouter;
