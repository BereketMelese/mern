import { useEffect, useState } from "react";
import { ChangeEvent } from "react";
import axios from "axios";
import { Card, Button, Input } from "@repo/ui";
import { MainLayout } from "../components/MainLayout";
import type { User, Product } from "@shared/utils";

const API_BASE_URL = "http://localhost:4000";

export const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    stock: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [usersRes, productsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/users`),
          axios.get(`${API_BASE_URL}/products`),
        ]);
        setUsers(usersRes.data);
        setProducts(productsRes.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/products`, newProduct);
      setProducts([...products, res.data]);
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        category: "",
        stock: 0,
      });
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>

        {/* Users Section */}
        <Card>
          <Card.Header>
            <h2 className="text-2xl font-semibold">Users ({users.length})</h2>
          </Card.Header>
          <Card.Body>
            {loading ? (
              <p className="text-gray-600">Loading users...</p>
            ) : users.length === 0 ? (
              <p className="text-gray-600">No users found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="pb-2 font-semibold text-gray-700">
                        Email
                      </th>
                      <th className="pb-2 font-semibold text-gray-700">Name</th>
                      <th className="pb-2 font-semibold text-gray-700">Role</th>
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
            )}
          </Card.Body>
        </Card>

        {/* Products Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <Card.Header>
                <h2 className="text-2xl font-semibold">
                  Products ({products.length})
                </h2>
              </Card.Header>
              <Card.Body>
                {products.length === 0 ? (
                  <p className="text-gray-600">No products found.</p>
                ) : (
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
                              ${product.price}
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
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <Input
                    label="Name"
                    value={newProduct.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="Description"
                    value={newProduct.description}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setNewProduct({
                        ...newProduct,
                        description: e.target.value,
                      })
                    }
                  />
                  <Input
                    label="Price"
                    type="number"
                    value={newProduct.price}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setNewProduct({
                        ...newProduct,
                        price: Number(e.target.value),
                      })
                    }
                    required
                  />
                  <Input
                    label="Category"
                    value={newProduct.category}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setNewProduct({ ...newProduct, category: e.target.value })
                    }
                  />
                  <Input
                    label="Stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setNewProduct({
                        ...newProduct,
                        stock: Number(e.target.value),
                      })
                    }
                    required
                  />
                  <Button type="submit" variant="primary" className="w-full">
                    Add Product
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
