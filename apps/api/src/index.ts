import express from "express";
import usersRouter from "./routes/users.js";
import productsRouter from "./routes/products.js";
import authRouter from "./routes/auth.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/", (_req, res) => res.json({ status: "ok", version: "0.0.1" }));

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

// Health check to ensure DB is reachable
app.get("/health", async (_req, res) => {
  try {
    await prisma.$connect();
    await prisma.$disconnect();
    res.json({ status: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error" });
  }
});

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});
// API entry point
export const API_NAME = "@mern/api";
