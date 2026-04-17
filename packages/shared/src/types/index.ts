/**
 * User type definition
 */
export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user" | "guest";
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Product type definition
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Auth user type (without password)
 */
export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  role: "admin" | "user" | "guest";
}

/**
 * Login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Register credentials
 */
export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

/**
 * Auth response with token
 */
export interface AuthResponse {
  user: AuthUser;
  token: string;
}
