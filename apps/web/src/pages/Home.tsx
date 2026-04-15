import { Button, Card } from "@repo/ui";
import { MainLayout } from "../components/MainLayout";

export const Home = () => {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to MERN
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            A modern monorepo setup with Express API, React UI, and shared
            types.
          </p>
          <Button variant="primary" size="lg">
            Get Started
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <Card.Header>
              <h3 className="text-lg font-semibold">API Endpoints</h3>
            </Card.Header>
            <Card.Body>
              <p className="text-gray-600">
                Fetch users and products from the Express API using Axios.
              </p>
            </Card.Body>
          </Card>

          <Card className="p-6">
            <Card.Header>
              <h3 className="text-lg font-semibold">UI Components</h3>
            </Card.Header>
            <Card.Body>
              <p className="text-gray-600">
                Reusable React components with Tailwind CSS styling.
              </p>
            </Card.Body>
          </Card>

          <Card className="p-6">
            <Card.Header>
              <h3 className="text-lg font-semibold">Shared Types</h3>
            </Card.Header>
            <Card.Body>
              <p className="text-gray-600">
                Type-safe imports from @shared/utils across packages.
              </p>
            </Card.Body>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};
