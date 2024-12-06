// @ts-check

import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "@eslint-react/eslint-plugin";
import * as tsParser from "@typescript-eslint/parser";

export default tseslint.config(
  { ignores: [".vinxi/*", ".vercel/*", ".sst/*", ".output/*", "sst-env.d.ts"] },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, React: true, JSX: true },
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...react.configs.recommended,
    languageOptions: {
      parser: tsParser,
    },
  },
);
