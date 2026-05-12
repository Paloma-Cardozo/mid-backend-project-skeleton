import express from "express";
import { signup } from "#controllers/auth.js";

const authRouter = express.Router();

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Paloma Cardozo
 *               email:
 *                 type: string
 *                 example: paca@example.com
 *               password:
 *                 type: string
 *                 example: securepassword123
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Missing fields or email already in use
 */
authRouter.post("/signup", signup);

export default authRouter;
