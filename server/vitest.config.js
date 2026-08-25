import { defineConfig } from "vitest/config";

// Assumes a local Postgres with a `thrivemind_test` database owned by the
// current OS user (see server/README.md). This will need a CI-specific
// DATABASE_URL once these tests are wired into GitHub Actions.
export default defineConfig({
  test: {
    environment: "node",
    env: {
      NODE_ENV: "test",
      DATABASE_URL: `postgresql://${process.env.USER}@localhost:5432/thrivemind_test?host=/tmp`,
      SESSION_SECRET: "test-secret"
    },
    setupFiles: "./src/__tests__/setup.js",
    // Test files share one physical Postgres database (no per-file
    // isolation), and each file's afterEach does a global
    // prisma.user.deleteMany(). Running files in parallel let one file's
    // cleanup delete users a concurrently-running file had just created,
    // causing intermittent foreign-key failures. Serialize instead.
    fileParallelism: false
  }
});
