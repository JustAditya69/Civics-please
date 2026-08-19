import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Explicitly use the DIRECT URL here so CLI commands (like db push) work seamlessly
    url: env("DIRECT_URL"),
  },
});