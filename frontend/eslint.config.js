import ts from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import eslintPluginReact from "eslint-plugin-react";

export default [
  {
    ignores: ["node_modules", "dist"],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: ts,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "react": eslintPluginReact,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "react/jsx-uses-react": "off", // React 17+ doesn't require `React` in scope
      "react/react-in-jsx-scope": "off", // React 17+ doesn't require `React` in scope
      "indent": ["error", 2],
      "react/prop-types": "off", // If using TypeScript, no need for prop-types
    },
  },
  {
    files: ["**/*.jsx", "**/*.tsx"],
    rules: {
      "react/react-in-jsx-scope": "off", // Not needed with React 17+ JSX Transform
      "react/jsx-uses-react": "off",     // Not needed with React 17+ JSX Transform
    }
  }
];
