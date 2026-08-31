import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: ["**/*.e2e.ts", "**/*.smoke.ts"],
  outputDir: "./test-results/playwright",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: "http://127.0.0.1:3013",
    trace: "on-first-retry",
  },
  webServer: {
    command:
      "VITE_GRAPHQL_SCHEMA_URL=http://127.0.0.1:3013/api/graphql VITE_PAYMENT_API_BASE_URL=http://127.0.0.1:3013 bunx vite --host 127.0.0.1 --port 3013 --strictPort",
    url: "http://127.0.0.1:3013",
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
