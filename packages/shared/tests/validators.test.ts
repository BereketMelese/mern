import { describe, expect, it } from "vitest";
import {
  AuthUserSchema,
  CreateProductSchema,
  ProductSchema,
} from "../src/validators/index.js";

describe("shared validators", () => {
  it("accepts a valid product creation payload", () => {
    const parsed = CreateProductSchema.parse({
      name: "Desk Lamp",
      description: "A warm desk lamp",
      price: 49.99,
      category: "Home",
      stock: 12,
    });

    expect(parsed.name).toBe("Desk Lamp");
    expect(parsed.stock).toBe(12);
  });

  it("rejects invalid product names", () => {
    expect(() =>
      CreateProductSchema.parse({
        name: "Ab",
        price: 10,
        stock: 1,
      }),
    ).toThrowError("Name must be at least 3 characters");
  });

  it("parses normalized API shapes", () => {
    const parsed = ProductSchema.parse({
      id: "prod_1",
      name: "Keyboard",
      description: null,
      price: 79.5,
      category: null,
      stock: 4,
      createdAt: "2026-05-06T00:00:00.000Z",
      updatedAt: "2026-05-06T00:00:00.000Z",
    });

    expect(parsed.createdAt).toBeInstanceOf(Date);
  });

  it("validates auth user responses", () => {
    expect(
      AuthUserSchema.parse({
        id: "user_1",
        email: "user@example.com",
        name: "User",
        role: "user",
      }),
    ).toMatchObject({
      email: "user@example.com",
      role: "user",
    });
  });
});
