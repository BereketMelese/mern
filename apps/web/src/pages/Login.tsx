import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Button, Input } from "@repo/ui";
import { MainLayout } from "../components/MainLayout";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Login failed");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md p-8">
          <Card.Header>
            <h1 className="text-3xl font-bold text-center">Login</h1>
          </Card.Header>
          <Card.Body>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded px-4 py-3 text-red-700">
                  {error}
                </div>
              )}

              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>

            <p className="text-center text-gray-600 mt-4">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary-600 hover:underline font-semibold"
              >
                Register here
              </Link>
            </p>
          </Card.Body>
        </Card>
      </div>
    </MainLayout>
  );
};
