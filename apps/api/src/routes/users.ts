import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import type { User as SharedUser } from "@shared/utils";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (_req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users as SharedUser[]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

export default router;
