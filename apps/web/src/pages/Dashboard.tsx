import { useState } from "react";
import { ChangeEvent } from "react";
import { Card, Button, Input } from "@repo/ui";
import { MainLayout } from "../components/MainLayout";
import {
  useFetchUsers,
  useFetchProducts,
  useCreateProduct,
} from "../hooks/useQueries";
import { CreateProductSchema } from "@shared/utils";
import { ZodError } from "zod";

export const Dashboard = () => {
  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
  } = useFetchUsers();
  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useFetchProducts();
  const createProductMutation = useCreateProduct();

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    stock: 0,
  });

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [submitError, setSubmitError] = useState<string>("");
  const [submitSuccess, setSubmitSuccess] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
    // Clear error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");
    setValidationErrors({});

    try {
      // Validate with Zod
      const validatedData = CreateProductSchema.parse(newProduct);

      // Submit mutation
      await createProductMutation.mutateAsync(validatedData);

      // Reset form
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        category: "",
        stock: 0,
      });

      setSubmitSuccess("Product added successfully!");
      setTimeout(() => setSubmitSuccess(""), 3000);
    } catch (err) {
      if (err instanceof ZodError) {
        // Format Zod errors
        const errors: Record<string, string> = {};
        err.errors.forEach((error) => {
          const field = error.path[0] as string;
          errors[field] = error.message;
        });
        setValidationErrors(errors);
      } else if (err instanceof Error) {
        setSubmitError(err.message || "Failed to add product");
      } else {
        setSubmitError("Failed to add product. Please try again.");
      }
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>

        {/* Users Section */}
        <Card>
          <Card.Header>
            <h2 className="text-2xl font-semibold">
              Users ({users?.length ?? 0})
            </h2>
          </Card.Header>
          <Card.Body>
            {usersError ? (
              <div className="bg-red-50 border border-red-200 rounded px-4 py-3 text-red-700">
                Failed to load users. Please try again.
              </div>
            ) : usersLoading ? (
              <p className="text-gray-600">Loading users...</p>
            ) : users && users.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="pb-3 font-semibold text-gray-700">
                        Email
                      </th>
                      <th className="pb-3 font-semibold text-gray-700">Name</th>
                      <th className="pb-3 font-semibold text-gray-700">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 text-gray-600">{user.email}</td>
                        <td className="py-3 text-gray-600">{user.name}</td>
                        <td className="py-3 text-gray-600">{user.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600">No users found.</p>
            )}
          </Card.Body>
        </Card>

        {/* Products Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <Card.Header>
                <h2 className="text-2xl font-semibold">
                  Products ({products?.length ?? 0})
                </h2>
              </Card.Header>
              <Card.Body>
                {productsError ? (
                  <div className="bg-red-50 border border-red-200 rounded px-4 py-3 text-red-700">
                    Failed to load products. Please try again.
                  </div>
                ) : productsLoading ? (
                  <p className="text-gray-600">Loading products...</p>
                ) : products && products.length > 0 ? (
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                      >
                        <h3 className="font-semibold text-gray-900">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {product.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-lg font-bold text-primary-600">
                              ${product.price.toFixed(2)}
                            </span>
                            <span className="text-gray-600 ml-4">
                              Stock: {product.stock}
                            </span>
                          </div>
                          <span className="text-sm bg-gray-100 px-3 py-1 rounded">
                            {product.category}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No products found.</p>
                )}
              </Card.Body>
            </Card>
          </div>

          {/* Add Product Form */}
          <div>
            <Card>
              <Card.Header>
                <h3 className="text-xl font-semibold">Add Product</h3>
              </Card.Header>
              <Card.Body>
                {submitSuccess && (
                  <div className="mb-4 bg-green-50 border border-green-200 rounded px-4 py-3 text-green-700 text-sm">
                    {submitSuccess}
                  </div>
                )}
                {submitError && (
                  <div className="mb-4 bg-red-50 border border-red-200 rounded px-4 py-3 text-red-700 text-sm">
                    {submitError}
                  </div>
                )}

                <form onSubmit={handleAddProduct} className="space-y-3">
                  <div>
                    <Input
                      label="Name"
                      name="name"
                      value={newProduct.name}
                      onChange={handleInputChange}
                      required
                      disabled={createProductMutation.isPending}
                    />
                    {validationErrors.name && (
                      <p className="text-red-600 text-sm mt-1">
                        {validationErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <Input
                      label="Description"
                      name="description"
                      value={newProduct.description}
                      onChange={handleInputChange}
                      disabled={createProductMutation.isPending}
                    />
                    {validationErrors.description && (
                      <p className="text-red-600 text-sm mt-1">
                        {validationErrors.description}
                      </p>
                    )}
                  </div>

                  <div>
                    <Input
                      label="Price"
                      name="price"
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={handleInputChange}
                      required
                      disabled={createProductMutation.isPending}
                    />
                    {validationErrors.price && (
                      <p className="text-red-600 text-sm mt-1">
                        {validationErrors.price}
                      </p>
                    )}
                  </div>

                  <div>
                    <Input
                      label="Category"
                      name="category"
                      value={newProduct.category}
                      onChange={handleInputChange}
                      disabled={createProductMutation.isPending}
                    />
                    {validationErrors.category && (
                      <p className="text-red-600 text-sm mt-1">
                        {validationErrors.category}
                      </p>
                    )}
                  </div>

                  <div>
                    <Input
                      label="Stock"
                      name="stock"
                      type="number"
                      value={newProduct.stock}
                      onChange={handleInputChange}
                      required
                      disabled={createProductMutation.isPending}
                    />
                    {validationErrors.stock && (
                      <p className="text-red-600 text-sm mt-1">
                        {validationErrors.stock}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    disabled={createProductMutation.isPending}
                  >
                    {createProductMutation.isPending
                      ? "Adding..."
                      : "Add Product"}
                  </Button>
                </form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
