import { z } from "zod";

export const enquirySourceSchema = z.enum([
  "CONTACT",
  "ECOSYSTEM",
  "SERVICE",
  "PROJECT",
  "PROPERTY",
  "PLOT",
  "CAREER",
  "OTHER",
]);

export const enquiryInputSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(30),
  email: z.union([z.literal(""), z.string().trim().email("Please enter a valid email").max(255)]),
  company: z.string().trim().max(150).optional().default(""),
  message: z.string().trim().min(2, "Please tell us how we can help").max(2000),
  source: enquirySourceSchema,
  ecosystemSlug: z.string().trim().max(100).optional(),
  serviceId: z.string().trim().max(100).optional(),
  projectId: z.string().trim().max(100).optional(),
  propertyId: z.string().trim().max(100).optional(),
  plotId: z.string().trim().max(100).optional(),
  pageUrl: z.string().trim().max(2000).optional(),
  utmSource: z.string().trim().max(100).optional(),
  utmMedium: z.string().trim().max(100).optional(),
  utmCampaign: z.string().trim().max(150).optional(),
  website: z.string().max(200).optional().default(""),
});

export type EnquiryInput = z.infer<typeof enquiryInputSchema>;

export const siteVisitInputSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(30),
  email: z.union([z.literal(""), z.string().trim().email("Please enter a valid email").max(255)]),
  preferredDate: z.string().date("Please choose a valid date"),
  preferredTime: z.string().trim().min(1, "Please choose a preferred time").max(50),
  message: z.string().trim().max(2000).optional().default(""),
  projectId: z.string().trim().max(100).optional(),
  propertyId: z.string().trim().max(100).optional(),
  plotId: z.string().trim().max(100).optional(),
  website: z.string().max(200).optional().default(""),
});

export type SiteVisitInput = z.infer<typeof siteVisitInputSchema>;
