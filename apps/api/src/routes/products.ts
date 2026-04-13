import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import type { Product as SharedProduct } from "@shared/utils";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (_req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products as SharedProduct[]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, description, price, category, stock, ownerId } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price) || 0,
        category,
        stock: Number(stock) || 0,
        ownerId: ownerId || undefined,
      },
    });
    res.status(201).json(product as SharedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create product" });
  }
});

export default router;
