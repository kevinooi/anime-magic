import { mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";
import path from "path";

export default mergeConfig(viteConfig, {
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: path.resolve(__dirname, "vitest.setup.ts"),
    css: true,
    include: ["src/**/*.test.{ts,tsx}"],
    alias: {
      "@": path.resolve(__dirname, "src")
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/", "vitest.setup.ts", "src/main.tsx"]
    }
  }
});
