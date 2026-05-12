import express from "express";
import { signup, login, me } from "#controllers/auth.js";
import { authenticate } from "#middlewares/auth.js";

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

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login with email and password
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: paca@example.com
 *               password:
 *                 type: string
 *                 example: securepassword123
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       401:
 *         description: Invalid email or password
 */

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current authenticated user
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns authenticated user data
 *       401:
 *         description: Missing or invalid token
 */

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/me", authenticate, me);

export default authRouter;
