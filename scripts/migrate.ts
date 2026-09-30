import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { applySchema, openDatabase } from "../src/server/db/database.ts";

const database = openDatabase();
applySchema(database);
const schema = readFileSync(resolve(process.cwd(), "src/server/db/schema.sql"), "utf8");
database.exec(schema);
const ensureColumn = (table: string, column: string, definition: string) => {
	const columns = database.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[];
	if (!columns.some((entry) => entry.name === column)) {
		database.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
	}
};
ensureColumn("testimonials", "ecosystem_id", "TEXT REFERENCES ecosystems(id)");
ensureColumn("testimonials", "service_id", "TEXT REFERENCES services(id)");
ensureColumn("insights", "category", "TEXT");
ensureColumn("insights", "tags_json", "TEXT NOT NULL DEFAULT '[]'");
ensureColumn("insights", "featured", "INTEGER NOT NULL DEFAULT 0");
database.prepare("INSERT OR IGNORE INTO schema_migrations (id) VALUES (?)").run("001_initial_schema");
console.log(`Database ready: ${resolve(process.cwd(), process.env.DATABASE_URL ?? "./data/jluxe.sqlite")}`);
database.close();
