import { registerAs } from "@nestjs/config";

export default registerAs("config", () => ({
  database: {
    name: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
  },
  postgres: {
    pgHost: process.env.POSTGRES_HOST,
    pgUser: process.env.POSTGRES_USER,
    pgPassword: process.env.POSTGRES_PASSWORD,
    pgPort: parseInt(process.env.POSTGRES_PORT),
    pgDatabase: process.env.POSTGRES_DB,
  },
  apiKey: process.env.API_KEY,
}));
