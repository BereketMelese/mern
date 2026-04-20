import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken, AuthRequest } from "../middleware/auth.js";
import type { User as SharedUser } from "@shared/utils";

const prisma = new PrismaClient();
const router = Router();

// Get all users (protected)
router.get("/", verifyToken, async (_req: AuthRequest, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.json(users as SharedUser[]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Get user by ID (protected)
router.get("/:id", verifyToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(user as SharedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// Update user by ID (protected)
router.patch("/:id", verifyToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { name, role } = req.body;

    // Only allow users to update their own profile unless they're admin
    if (req.userId !== id && req.userId) {
      res.status(403).json({ error: "Cannot update other user profiles" });
      return;
    }

    const updateData: { name?: string | null; role?: string } = {};
    if (name !== undefined) updateData.name = name;
    if (role !== undefined && req.userId === id) updateData.role = role;

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json(user as SharedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// Delete user by ID (protected)
router.delete("/:id", verifyToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    // Only allow users to delete their own account
    if (req.userId !== id) {
      res.status(403).json({ error: "Cannot delete other user accounts" });
      return;
    }

    // Delete user's products first
    await prisma.product.deleteMany({
      where: { ownerId: id },
    });

    // Delete user
    await prisma.user.delete({
      where: { id },
    });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

export default router;
