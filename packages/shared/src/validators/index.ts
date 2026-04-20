import { z } from "zod";

/**
 * User validation schema
 */
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().nullable(),
  role: z.enum(["admin", "user", "guest"]),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type UserValidated = z.infer<typeof UserSchema>;

/**
 * Product validation schema
 */
export const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Product name is required"),
  description: z.string().nullable(),
  price: z.number().positive("Price must be positive"),
  category: z.string().nullable(),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type ProductValidated = z.infer<typeof ProductSchema>;

/**
 * Create product validation schema
 */
export const CreateProductSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .min(3, "Name must be at least 3 characters"),
  description: z.string().optional().nullable(),
  price: z.number().positive("Price must be a positive number"),
  category: z.string().optional().nullable(),
  stock: z.number().int().min(0, "Stock must be a non-negative number"),
});

export type CreateProductInput = z.infer<typeof CreateProductSchema>;

/**
 * Update product validation schema
 */
export const UpdateProductSchema = CreateProductSchema.partial();

export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;

/**
 * Auth validation schema
 */
export const AuthUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().nullable(),
  role: z.enum(["admin", "user", "guest"]),
});

export type AuthUserValidated = z.infer<typeof AuthUserSchema>;
