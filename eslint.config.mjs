import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-expressions": "off", // Désactive les erreurs pour les expressions non utilisées
      "@typescript-eslint/no-explicit-any": "warn",      // Émet un avertissement pour `any` au lieu d'une erreur
    },
  },
];

export default eslintConfig;
