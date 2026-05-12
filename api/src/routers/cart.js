import express from "express";
import { getCart } from "#controllers/cart.js";
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

cartRouter.get("/", authenticate, getCart);

export default cartRouter;