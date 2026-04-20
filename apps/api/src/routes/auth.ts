import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { generateToken, AuthRequest } from "../middleware/auth.js";
import type {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from "@shared/utils";

const router = Router();
const prisma = new PrismaClient();

/**
 * POST /auth/register
 * Register a new user
 */
router.post("/register", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body as RegisterCredentials;

    // Validate input
    if (!email || !password || !name) {
      res.status(400).json({ error: "Email, password, and name are required" });
      return;
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: "User with this email already exists" });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "user",
      },
    });

    // Generate token
    const token = generateToken(user.id);

    // Return user without password
    const authResponse: AuthResponse = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role as "admin" | "user" | "guest",
      },
      token,
    };

    res.status(201).json(authResponse);
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * POST /auth/login
 * Login user and return token
 */
router.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as LoginCredentials;

    // Validate input
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    // Generate token
    const token = generateToken(user.id);

    // Return user without password
    const authResponse: AuthResponse = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role as "admin" | "user" | "guest",
      },
      token,
    };

    res.json(authResponse);
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * POST /auth/logout
 * Logout user (token invalidation happens on client side)
 */
router.post(
  "/logout",
  async (_req: AuthRequest, res: Response): Promise<void> => {
    // In a real app, you might want to blacklist tokens here
    // For now, just return success
    res.json({ message: "Logged out successfully" });
  },
);

export default router;
