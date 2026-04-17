import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken, AuthRequest } from "../middleware/auth.js";
import type { User as SharedUser } from "@shared/utils";

const prisma = new PrismaClient();
const router = Router();

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

export default router;
