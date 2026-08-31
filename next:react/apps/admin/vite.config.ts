import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@tanstack/react-table": path.resolve(
        __dirname,
        "node_modules/@tanstack/react-table/src/index.tsx",
      ),
      "@tanstack/table-core": path.resolve(
        __dirname,
        "../../node_modules/.bun/@tanstack+table-core@8.21.3/node_modules/@tanstack/table-core/src/index.ts",
      ),
    },
  },
  server: {
    allowedHosts: true,
  },
});
