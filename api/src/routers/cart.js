import express from "express";
import { getCart, addItem, updateItem, removeItem } from "#controllers/cart.js";
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

/**
 * @swagger
 * /api/cart/items/{itemId}:
 *   put:
 *     summary: Update cart item quantity
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cart item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Cart item updated
 *       400:
 *         description: Invalid quantity
 *       403:
 *         description: Item does not belong to your cart
 *       404:
 *         description: Cart item not found
 */

/**
 * @swagger
 * /api/cart/items/{itemId}:
 *   delete:
 *     summary: Remove item from cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cart item ID
 *     responses:
 *       200:
 *         description: Item removed, returns updated cart
 *       403:
 *         description: Item does not belong to your cart
 *       404:
 *         description: Cart item not found
 */

cartRouter.get("/", authenticate, getCart);
cartRouter.post("/items", authenticate, addItem);
cartRouter.put("/items/:itemId", authenticate, updateItem);
cartRouter.delete("/items/:itemId", authenticate, removeItem);

export default cartRouter;
