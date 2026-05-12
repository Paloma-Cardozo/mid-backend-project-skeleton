import bcrypt from "bcryptjs";
import { findUserByEmail, createUser } from "#models/auth.js";

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
