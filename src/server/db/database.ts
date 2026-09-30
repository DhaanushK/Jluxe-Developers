import { mkdirSync } from "node:fs";
import { dirname, isAbsolute, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";

const defaultDatabasePath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../../data/jluxe.sqlite",
);

export function getDatabasePath() {
  const configuredPath = process.env.DATABASE_URL?.trim();
  if (!configuredPath) return defaultDatabasePath;
  if (configuredPath.startsWith("file:")) return fileURLToPath(configuredPath);
  return isAbsolute(configuredPath) ? configuredPath : resolve(process.cwd(), configuredPath);
}

export function openDatabase() {
  const databasePath = getDatabasePath();
  mkdirSync(dirname(databasePath), { recursive: true });
  const database = new DatabaseSync(databasePath);
  database.exec("PRAGMA foreign_keys = ON;");
  return database;
}

export function applySchema(database: DatabaseSync) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  return database;
}
