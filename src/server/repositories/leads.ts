import type { DatabaseSync } from "node:sqlite";
import { randomUUID } from "node:crypto";
import type { EnquiryInput, SiteVisitInput } from "@/server/validation/enquiries";

function optional(value: string | undefined) {
  return value?.trim() || null;
}

function resolveContext(database: DatabaseSync, input: EnquiryInput) {
  const ecosystem = input.ecosystemSlug
    ? database.prepare("SELECT id FROM ecosystems WHERE slug = ? AND status = 'PUBLISHED'").get(input.ecosystemSlug) as { id?: string } | undefined
    : undefined;
  const service = input.serviceId
    ? database.prepare("SELECT id, ecosystem_id FROM services WHERE id = ? AND status = 'PUBLISHED'").get(input.serviceId) as { id?: string; ecosystem_id?: string } | undefined
    : undefined;
  const project = input.projectId
    ? database.prepare("SELECT id FROM projects WHERE id = ? AND status = 'PUBLISHED'").get(input.projectId) as { id?: string } | undefined
    : undefined;
  const property = input.propertyId
    ? database.prepare("SELECT id, project_id FROM properties WHERE id = ? AND published_at IS NOT NULL").get(input.propertyId) as { id?: string; project_id?: string | null } | undefined
    : undefined;
  const plot = input.plotId
    ? database.prepare("SELECT id, project_id FROM plots WHERE id = ? AND published_at IS NOT NULL").get(input.plotId) as { id?: string; project_id?: string } | undefined
    : undefined;

  if (input.ecosystemSlug && !ecosystem) throw new Error("Invalid ecosystem context");
  if (input.serviceId && !service) throw new Error("Invalid service context");
  if (input.projectId && !project) throw new Error("Invalid project context");
  if (input.propertyId && !property) throw new Error("Invalid property context");
  if (input.plotId && !plot) throw new Error("Invalid plot context");
  if (service?.ecosystem_id && ecosystem?.id !== service.ecosystem_id) {
    throw new Error("Service and ecosystem context do not match");
  }
  if (property?.project_id && project?.id !== property.project_id) {
    throw new Error("Property and project context do not match");
  }
  if (plot?.project_id && project?.id !== plot.project_id) {
    throw new Error("Plot and project context do not match");
  }

  return {
    ecosystemId: ecosystem?.id ?? service?.ecosystem_id ?? null,
    serviceId: service?.id ?? null,
    projectId: project?.id ?? property?.project_id ?? plot?.project_id ?? null,
    propertyId: property?.id ?? null,
    plotId: plot?.id ?? null,
  };
}

function resolveVisitContext(database: DatabaseSync, input: SiteVisitInput) {
  const project = input.projectId
    ? database.prepare("SELECT id FROM projects WHERE id = ? AND status = 'PUBLISHED'").get(input.projectId) as { id?: string } | undefined
    : undefined;
  const property = input.propertyId
    ? database.prepare("SELECT id, project_id FROM properties WHERE id = ? AND published_at IS NOT NULL").get(input.propertyId) as { id?: string; project_id?: string | null } | undefined
    : undefined;
  const plot = input.plotId
    ? database.prepare("SELECT id, project_id FROM plots WHERE id = ? AND published_at IS NOT NULL").get(input.plotId) as { id?: string; project_id?: string } | undefined
    : undefined;

  if (input.projectId && !project) throw new Error("Invalid project context");
  if (input.propertyId && !property) throw new Error("Invalid property context");
  if (input.plotId && !plot) throw new Error("Invalid plot context");
  if (property?.project_id && project?.id !== property.project_id) throw new Error("Property and project context do not match");
  if (plot?.project_id && project?.id !== plot.project_id) throw new Error("Plot and project context do not match");

  return {
    projectId: project?.id ?? property?.project_id ?? plot?.project_id ?? null,
    propertyId: property?.id ?? null,
    plotId: plot?.id ?? null,
  };
}

function findOrCreateLead(database: DatabaseSync, input: EnquiryInput, context: ReturnType<typeof resolveContext>) {
  const email = optional(input.email);
  const phone = optional(input.phone);
  let lead = email
    ? database.prepare("SELECT id FROM leads WHERE email = ? ORDER BY created_at DESC LIMIT 1").get(email) as { id?: string } | undefined
    : undefined;
  if (!lead && phone) {
    lead = database.prepare("SELECT id FROM leads WHERE phone = ? ORDER BY created_at DESC LIMIT 1").get(phone) as { id?: string } | undefined;
  }
  if (lead?.id) return lead.id;

  const id = randomUUID();
  database.prepare(`
    INSERT INTO leads (id, name, phone, email, company, requirement, ecosystem_id, service_id, project_id, property_id, plot_id, source)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    input.name,
    phone,
    email,
    optional(input.company),
    input.message,
    context.ecosystemId,
    context.serviceId,
    context.projectId,
    context.propertyId,
    context.plotId,
    input.source,
  );
  return id;
}

export function createEnquiry(database: DatabaseSync, input: EnquiryInput) {
  const context = resolveContext(database, input);
  const leadId = findOrCreateLead(database, input, context);
  const enquiryId = randomUUID();
  database.prepare(`
    INSERT INTO enquiries (id, lead_id, ecosystem_id, service_id, project_id, property_id, plot_id, subject, message, source, page_url, utm_source, utm_medium, utm_campaign)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    enquiryId,
    leadId,
    context.ecosystemId,
    context.serviceId,
    context.projectId,
    context.propertyId,
    context.plotId,
    null,
    input.message,
    input.source,
    optional(input.pageUrl),
    optional(input.utmSource),
    optional(input.utmMedium),
    optional(input.utmCampaign),
  );
}

export function createSiteVisit(database: DatabaseSync, input: SiteVisitInput) {
  const context = resolveVisitContext(database, input);
  const email = optional(input.email);
  const phone = input.phone.trim();
  let lead = email
    ? database.prepare("SELECT id FROM leads WHERE email = ? ORDER BY created_at DESC LIMIT 1").get(email) as { id?: string } | undefined
    : undefined;
  if (!lead) lead = database.prepare("SELECT id FROM leads WHERE phone = ? ORDER BY created_at DESC LIMIT 1").get(phone) as { id?: string } | undefined;
  const leadId = lead?.id ?? randomUUID();
  if (!lead?.id) {
    database.prepare("INSERT INTO leads (id, name, phone, email, project_id, property_id, plot_id, source) VALUES (?, ?, ?, ?, ?, ?, ?, 'PROJECT')").run(leadId, input.name, phone, email, context.projectId, context.propertyId, context.plotId);
  }
  database.prepare(`
    INSERT INTO site_visits (id, lead_id, project_id, property_id, plot_id, name, phone, email, preferred_date, preferred_time, message)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(randomUUID(), leadId, context.projectId, context.propertyId, context.plotId, input.name, phone, email, input.preferredDate, input.preferredTime, optional(input.message));
}
