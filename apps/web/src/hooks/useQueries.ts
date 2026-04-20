import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../utils/apiClient";
import type { User, Product } from "@shared/utils";

/**
 * Query keys for React Query
 */
export const queryKeys = {
  users: ["users"] as const,
  user: (id: string) => ["users", id] as const,
  products: ["products"] as const,
  product: (id: string) => ["products", id] as const,
};

/**
 * Fetch all users
 */
export const useFetchUsers = () => {
  return useQuery({
    queryKey: queryKeys.users,
    queryFn: async () => {
      const response = await apiClient.get<User[]>("/users");
      return response.data;
    },
  });
};

/**
 * Fetch user by ID
 */
export const useFetchUser = (id: string | undefined) => {
  return useQuery({
    queryKey: id ? queryKeys.user(id) : [],
    queryFn: async () => {
      if (!id) throw new Error("User ID is required");
      const response = await apiClient.get<User>(`/users/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

/**
 * Update user
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: { name?: string; role?: string };
    }) => {
      const response = await apiClient.patch<User>(`/users/${id}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.user(data.id), data);
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
    },
  });
};

/**
 * Delete user
 */
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/users/${id}`);
      return id;
    },
    onSuccess: (id) => {
      queryClient.removeQueries({ queryKey: queryKeys.user(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
    },
  });
};

/**
 * Fetch all products
 */
export const useFetchProducts = () => {
  return useQuery({
    queryKey: queryKeys.products,
    queryFn: async () => {
      const response = await apiClient.get<Product[]>("/products");
      return response.data;
    },
  });
};

/**
 * Fetch product by ID
 */
export const useFetchProduct = (id: string | undefined) => {
  return useQuery({
    queryKey: id ? queryKeys.product(id) : [],
    queryFn: async () => {
      if (!id) throw new Error("Product ID is required");
      const response = await apiClient.get<Product>(`/products/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

/**
 * Create product
 */
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      description?: string | null;
      price: number;
      category?: string | null;
      stock: number;
    }) => {
      const response = await apiClient.post<Product>("/products", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products });
    },
  });
};

/**
 * Update product
 */
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<{
        name: string;
        description: string | null;
        price: number;
        category: string | null;
        stock: number;
      }>;
    }) => {
      const response = await apiClient.patch<Product>(`/products/${id}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.product(data.id), data);
      queryClient.invalidateQueries({ queryKey: queryKeys.products });
    },
  });
};

/**
 * Delete product
 */
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/products/${id}`);
      return id;
    },
    onSuccess: (id) => {
      queryClient.removeQueries({ queryKey: queryKeys.product(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.products });
    },
  });
};
