import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import morgan from "morgan";
import usersRouter from "./routes/users.js";
import productsRouter from "./routes/products.js";
import authRouter from "./routes/auth.js";

const prisma = new PrismaClient();
const allowedOrigins = (
  process.env.CORS_ORIGIN ??
  "http://localhost:5173,http://localhost:8080,http://127.0.0.1:5173"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export const app = express();

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json());

app.get("/", (_req, res) => res.json({ status: "ok", version: "0.0.1" }));

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.get("/health", async (_req, res) => {
  try {
    await prisma.$connect();
    await prisma.$disconnect();
    res.json({ status: "ok", uptime: process.uptime() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error" });
  }
});

export default app;
