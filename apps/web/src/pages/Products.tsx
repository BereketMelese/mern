import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "@repo/ui";
import { MainLayout } from "../components/MainLayout";
import { useFetchProducts } from "../hooks/useQueries";

export const Products = () => {
  const { data: products, isLoading, error } = useFetchProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Get unique categories
  const categories = Array.from(
    new Set(products?.map((p) => p.category).filter(Boolean) ?? []),
  );

  // Filter products by category
  const filteredProducts = selectedCategory
    ? products?.filter((p) => p.category === selectedCategory)
    : products;

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg text-gray-600">Loading products...</div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-red-50 border border-red-200 rounded px-4 py-3 text-red-700">
            Failed to load products. Please try again.
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Products</h1>
          <p className="text-gray-600">
            Browse {filteredProducts?.length ?? 0} product
            {filteredProducts?.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Categories Filter */}
        {categories.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Filter by Category</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "" ? "primary" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory("")}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts && filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-lg transition"
              >
                <Card.Header className="pb-3">
                  <h3 className="text-xl font-semibold line-clamp-2">
                    {product.name}
                  </h3>
                </Card.Header>
                <Card.Body className="space-y-4">
                  {product.description && (
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {product.description}
                    </p>
                  )}

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary-600">
                        ${product.price.toFixed(2)}
                      </span>
                      <span
                        className={`text-sm px-3 py-1 rounded ${
                          product.stock > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.stock > 0
                          ? `${product.stock} in stock`
                          : "Out of stock"}
                      </span>
                    </div>

                    {product.category && (
                      <div className="text-sm text-gray-600">
                        Category: {product.category}
                      </div>
                    )}
                  </div>
                </Card.Body>
                <Card.Footer className="space-x-2">
                  <Link to={`/products/${product.id}`} className="flex-1">
                    <Button variant="primary" className="w-full">
                      View Details
                    </Button>
                  </Link>
                  {product.stock > 0 && (
                    <Button variant="secondary" className="flex-1">
                      Add to Cart
                    </Button>
                  )}
                </Card.Footer>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <Card.Body>
              <p className="text-center text-gray-600 py-8">
                No products found. Try adjusting your filters.
              </p>
            </Card.Body>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};
