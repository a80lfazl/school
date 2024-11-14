import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().min(1).max(65535),
  NODE_ENV: z.enum(["development", "production", "test"]),
  MONGODB_URI: z.string().url(),
});

const parseEnv = envSchema.safeParse(process.env);

if (!parseEnv.success) {
  console.error("Invalid ENV variables", parseEnv.error.format());
  process.exit(1);
}

export const env = parseEnv.data;
