import { MainLayout } from "../components/MainLayout";

export const About = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">About</h1>

        <div className="prose max-w-4xl">
          <p className="text-lg text-gray-700 mb-4">
            This is a full-stack MERN application built with modern tools and
            best practices, featuring JWT authentication, type-safe development,
            and a modular monorepo architecture.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Tech Stack
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Frontend: React 18 + TypeScript + Tailwind CSS + Vite</li>
            <li>Backend: Express.js + TypeScript + Prisma ORM</li>
            <li>Authentication: JWT + bcrypt for secure auth</li>
            <li>Database: SQLite (development)</li>
            <li>Monorepo: pnpm workspaces</li>
            <li>UI Components: Storybook documentation</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Features
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Type-safe shared utilities and types across packages</li>
            <li>Reusable UI component library with Tailwind CSS</li>
            <li>JWT authentication with register/login endpoints</li>
            <li>Protected routes and automatic token management</li>
            <li>bcrypt password hashing for security</li>
            <li>Session storage interceptor for token persistence</li>
            <li>RESTful API with Express and Prisma ORM</li>
            <li>Multi-workspace build configuration</li>
            <li>Development tooling with nodemon and ts-node</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Authentication Flow
          </h2>
          <p className="text-gray-600 mb-3">
            The application implements a complete authentication system:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Users can register with email, password, and name</li>
            <li>Passwords are hashed using bcrypt before storage</li>
            <li>Login returns a JWT token valid for 24 hours</li>
            <li>Token is stored in session storage automatically</li>
            <li>Protected routes require valid authentication</li>
            <li>Invalid or expired tokens redirect to login</li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
};
