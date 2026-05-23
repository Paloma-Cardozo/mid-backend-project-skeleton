import express from "express";
import { listOrders, getOrder } from "#controllers/orders.js";
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

/**
 * @swagger
 * /api/orders/{orderId}:
 *   get:
 *     summary: Get order by ID
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order details
 *       403:
 *         description: Order does not belong to you
 *       404:
 *         description: Order not found
 */

ordersRouter.get("/", authenticate, listOrders);
ordersRouter.get("/:orderId", authenticate, getOrder);

export default ordersRouter;
