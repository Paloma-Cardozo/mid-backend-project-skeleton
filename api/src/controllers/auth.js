import bcrypt from "bcryptjs";
import { findUserByEmail, createUser, findUserById } from "#models/auth.js";
import jwt from "jsonwebtoken";

export async function signup(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Name, email and password are required",
        status: 400,
      });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        error: "Email already in use",
        status: 400,
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser(name, email, passwordHash);

    return res.status(201).json({ data: user });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
        status: 400,
      });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password",
        status: 401,
      });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({
        error: "Invalid email or password",
        status: 401,
      });
    }

    const token = jwt.sign(
      { user_id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.status(200).json({
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function me(req, res, next) {
  try {
    const user = await findUserById(req.user.user_id);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
        status: 404,
      });
    }

    return res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
}
