import { ecosystems, services } from "../src/lib/site.ts";
import { openDatabase } from "../src/server/db/database.ts";

const database = openDatabase();
const insertEcosystem = database.prepare(`
  INSERT OR IGNORE INTO ecosystems
    (id, slug, name, short, summary, audience_json, cta, display_index, status, published_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'PUBLISHED', CURRENT_TIMESTAMP)
`);
const insertService = database.prepare(`
  INSERT OR IGNORE INTO services
    (id, ecosystem_id, slug, name, short_description, audience_json, offerings_json, display_order, status, published_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'PUBLISHED', CURRENT_TIMESTAMP)
`);

for (const ecosystem of ecosystems) {
  insertEcosystem.run(
    ecosystem.slug,
    ecosystem.slug,
    ecosystem.name,
    ecosystem.short,
    ecosystem.summary,
    JSON.stringify(ecosystem.audience),
    ecosystem.cta,
    ecosystem.index,
  );
}

for (const service of services) {
  const ecosystemId = service.ecosystemSlugs[0];
  if (!ecosystemId) continue;
  insertService.run(
    service.id,
    ecosystemId,
    service.slug,
    service.name,
    service.shortDescription ?? null,
    JSON.stringify(service.audience ?? []),
    JSON.stringify(service.offerings ?? []),
    service.order,
  );
}

console.log(`Seeded ${ecosystems.length} ecosystems and ${services.length} services.`);
database.close();
