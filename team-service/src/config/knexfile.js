import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    },
    pool: { min: 0, max: 5 }, // number of connection in pool
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/migrations",
      extension: "js",
    },
  },

  production: {
    client: "pg",
    connection: process.env.DB_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/migrations",
      extension: "js",
    },
  },
};

// npx knex --migrations-directory ./src/migrations migrate:make users  --esm