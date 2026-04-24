import bcrypt from "bcrypt";
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

const prismaMock = vi.hoisted(() => ({
  user: {
    findUnique: vi.fn(),
    create: vi.fn(),
  },
  product: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  $connect: vi.fn(),
  $disconnect: vi.fn(),
}));

vi.mock("@prisma/client", () => ({
  PrismaClient: vi.fn(() => prismaMock),
}));

import app from "../src/app.js";

describe("api app", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the health payload", async () => {
    prismaMock.$connect.mockResolvedValueOnce(undefined);
    prismaMock.$disconnect.mockResolvedValueOnce(undefined);

    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
    expect(response.body.uptime).toEqual(expect.any(Number));
    expect(prismaMock.$connect).toHaveBeenCalledTimes(1);
    expect(prismaMock.$disconnect).toHaveBeenCalledTimes(1);
  });

  it("registers a new user", async () => {
    prismaMock.user.findUnique.mockResolvedValueOnce(null);
    prismaMock.user.create.mockResolvedValueOnce({
      id: "user_1",
      email: "new@example.com",
      password: "hashed-password",
      name: "New User",
      role: "user",
    });

    const response = await request(app).post("/auth/register").send({
      email: "new@example.com",
      password: "password123",
      name: "New User",
    });

    expect(response.status).toBe(201);
    expect(response.body.user).toMatchObject({
      email: "new@example.com",
      name: "New User",
      role: "user",
    });
    expect(typeof response.body.token).toBe("string");
  });

  it("logs in an existing user", async () => {
    const passwordHash = await bcrypt.hash("password123", 10);

    prismaMock.user.findUnique.mockResolvedValueOnce({
      id: "user_2",
      email: "login@example.com",
      password: passwordHash,
      name: "Login User",
      role: "user",
    });

    const response = await request(app).post("/auth/login").send({
      email: "login@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body.user.email).toBe("login@example.com");
    expect(typeof response.body.token).toBe("string");
  });

  it("blocks protected routes without a token", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: "No token provided" });
  });
});
