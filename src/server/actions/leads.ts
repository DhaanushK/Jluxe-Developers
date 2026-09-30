import { createServerFn } from "@tanstack/react-start";
import { openDatabase } from "@/server/db/database";
import { createEnquiry, createSiteVisit } from "@/server/repositories/leads";
import { enquiryInputSchema, siteVisitInputSchema } from "@/server/validation/enquiries";

function withTransaction<T>(operation: (database: ReturnType<typeof openDatabase>) => T) {
  const database = openDatabase();
  try {
    database.exec("BEGIN IMMEDIATE");
    const result = operation(database);
    database.exec("COMMIT");
    return result;
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  } finally {
    database.close();
  }
}

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => enquiryInputSchema.parse(input))
  .handler(({ data }) => {
    if (data.website.trim()) return { success: true, message: "Your enquiry has been received." };
    try {
      withTransaction((database) => createEnquiry(database, data));
      return { success: true, message: "Your enquiry has been received. Our team will get in touch with you." };
    } catch (error) {
      console.error("Enquiry submission failed", error);
      return { success: false, message: "We couldn't submit your enquiry right now. Please try again." };
    }
  });

export const submitSiteVisit = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => siteVisitInputSchema.parse(input))
  .handler(({ data }) => {
    if (data.website.trim()) return { success: true, message: "Your site visit request has been received." };
    try {
      withTransaction((database) => createSiteVisit(database, data));
      return { success: true, message: "Your site visit request has been received. Our team will get in touch with you." };
    } catch (error) {
      console.error("Site visit submission failed", error);
      return { success: false, message: "We couldn't submit your request right now. Please try again." };
    }
  });
