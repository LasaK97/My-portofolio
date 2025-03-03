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
      // Disable exhaustive-deps warning for useEffect hooks
      "react-hooks/exhaustive-deps": "off",
      // Disable unused-vars warning for unused variables (like 'loading')
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];

export default eslintConfig;
