import express from "express";
import { PrismaClient } from "@prisma/client";
import usersRouter from "./routes/users.js";
import productsRouter from "./routes/products.js";
import authRouter from "./routes/auth.js";

const prisma = new PrismaClient();

export const app = express();

app.use(express.json());

app.get("/", (_req, res) => res.json({ status: "ok", version: "0.0.1" }));

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.get("/health", async (_req, res) => {
  try {
    await prisma.$connect();
    await prisma.$disconnect();
    res.json({ status: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error" });
  }
});

export default app;
