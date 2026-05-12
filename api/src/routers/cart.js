import express from "express";
import { getCart, addItem } from "#controllers/cart.js";
import { authenticate } from "#middlewares/auth.js";

const cartRouter = express.Router();

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get current active cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns active cart with items
 *       401:
 *         description: Authentication required
 */

/**
 * @swagger
 * /api/cart/items:
 *   post:
 *     summary: Add item to cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - event_id
 *               - quantity
 *             properties:
 *               event_id:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Item added to cart
 *       400:
 *         description: Invalid fields
 *       404:
 *         description: Event not found
 */

cartRouter.get("/", authenticate, getCart);
cartRouter.post("/items", authenticate, addItem);

export default cartRouter;
