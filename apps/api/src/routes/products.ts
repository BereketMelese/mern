import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken, AuthRequest } from "../middleware/auth.js";
import type { Product as SharedProduct } from "@shared/utils";

const prisma = new PrismaClient();
const router = Router();

// Get all products (public)
router.get("/", async (_req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products as SharedProduct[]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Get product by ID (public)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json(product as SharedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// Create product (protected)
router.post("/", verifyToken, async (req: AuthRequest, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    // Validate required fields
    if (!name || price === undefined || price === null) {
      res.status(400).json({ error: "Name and price are required" });
      return;
    }

    const product = await prisma.product.create({
      data: {
        name,
        description: description || null,
        price: Number(price),
        category: category || null,
        stock: Number(stock) || 0,
        ownerId: req.userId,
      },
    });

    res.status(201).json(product as SharedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create product" });
  }
});

// Update product by ID (protected)
router.patch("/:id", verifyToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;

    // Check if product exists and user owns it
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    if (product.ownerId !== req.userId) {
      res.status(403).json({ error: "Cannot update product you don't own" });
      return;
    }

    // Build update object with only provided fields
    const updateData: {
      name?: string;
      description?: string | null;
      price?: number;
      category?: string | null;
      stock?: number;
    } = {};

    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = Number(price);
    if (category !== undefined) updateData.category = category;
    if (stock !== undefined) updateData.stock = Number(stock);

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    res.json(updatedProduct as SharedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update product" });
  }
});

// Delete product by ID (protected)
router.delete("/:id", verifyToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    // Check if product exists and user owns it
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    if (product.ownerId !== req.userId) {
      res.status(403).json({ error: "Cannot delete product you don't own" });
      return;
    }

    await prisma.product.delete({
      where: { id },
    });

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;
