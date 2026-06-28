import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Root-level Node.js utility/migration scripts (not part of the Next.js app)
    "*.js",
    "*.mjs",
    "*.cjs",
    // Third-party vendor assets in public/ are not source code
    "public/**",
  ]),
]);

export default eslintConfig;
