import { defineConfig } from "@tanstack/start/config";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    compatibilityDate: "2024-11-05",
    preset: "aws-lambda",
  },
  vite: {
    plugins: [
      viteTsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
    test: {
      globals: true,
      environment: "node",
      alias: {
        "@": "/app",
      },
      coverage: {
        reporter: ["text", "json", "html"],
      },
      exclude: [
        ".env",
        "**/node_modules/**",
        "**/dist/**",
        "**/cypress/**",
        "**/.{idea,git,cache,output,temp}/**",
        "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
      ],
    },
  },
});
