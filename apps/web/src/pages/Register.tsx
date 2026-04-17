import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Button, Input } from "@repo/ui";
import { MainLayout } from "../components/MainLayout";
import { useAuth } from "../context/AuthContext";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await register(email, password, name);
      navigate("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Registration failed");
      } else {
        setError("Registration failed. Please try again.");
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
            <h1 className="text-3xl font-bold text-center">Register</h1>
          </Card.Header>
          <Card.Body>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded px-4 py-3 text-red-700">
                  {error}
                </div>
              )}

              <Input
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />

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

              <Input
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </Button>
            </form>

            <p className="text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary-600 hover:underline font-semibold"
              >
                Login here
              </Link>
            </p>
          </Card.Body>
        </Card>
      </div>
    </MainLayout>
  );
};
