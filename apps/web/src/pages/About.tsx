import { MainLayout } from "../components/MainLayout";

export const About = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">About</h1>

        <div className="prose max-w-4xl">
          <p className="text-lg text-gray-700 mb-4">
            This is a full-stack MERN application built with modern tools and
            best practices.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Tech Stack
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Frontend: React 18 + TypeScript + Tailwind CSS + Vite</li>
            <li>Backend: Express.js + TypeScript + Prisma ORM</li>
            <li>Database: SQLite (development)</li>
            <li>Monorepo: pnpm workspaces</li>
            <li>UI Components: Storybook documentation</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Features
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Type-safe shared utilities and types</li>
            <li>Reusable UI component library</li>
            <li>RESTful API with Express</li>
            <li>Multi-workspace build configuration</li>
            <li>Development tooling with nodemon and ts-node</li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
};
