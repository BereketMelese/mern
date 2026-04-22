module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
  env: {
    es2022: true,
  },
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: [
    "dist",
    "build",
    "coverage",
    "storybook-static",
    "playwright-report",
    "test-results",
    "node_modules",
  ],
  overrides: [
    {
      files: ["apps/web/**/*.{ts,tsx}"],
      env: {
        browser: true,
      },
    },
    {
      files: ["apps/api/**/*.{ts,tsx}", "packages/**/*.{ts,tsx}"],
      env: {
        node: true,
      },
    },
    {
      files: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],
      env: {
        node: true,
        browser: true,
      },
      globals: {
        afterEach: "readonly",
        beforeEach: "readonly",
        describe: "readonly",
        expect: "readonly",
        it: "readonly",
        test: "readonly",
        vi: "readonly",
      },
    },
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
  },
};
