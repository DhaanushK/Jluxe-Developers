import { createServerFn } from "@tanstack/react-start";
import {
  getPublishedEcosystemBySlug,
  getPublishedEcosystems,
  getPublishedInsights,
  getPublishedPlotBySlug,
  getPublishedPlots,
  getPublishedProjectBySlug,
  getPublishedProjects,
  getPublishedProperties,
  getPublishedPropertyBySlug,
  getPublishedServiceBySlug,
  getPublishedServices,
  getPublishedTestimonials,
  getPublishedInsightBySlug,
  getRelatedPublishedInsights,
} from "@/server/repositories/content";

export const loadPublishedEcosystems = createServerFn({ method: "GET" }).handler(
  () => getPublishedEcosystems(),
);

export const loadPublishedEcosystem = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(({ data }) => getPublishedEcosystemBySlug(data));

export const loadPublishedServices = createServerFn({ method: "GET" }).handler(
  () => getPublishedServices(),
);

export const loadPublishedService = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(({ data }) => getPublishedServiceBySlug(data));

export const loadPublishedProjects = createServerFn({ method: "GET" }).handler(
  () => getPublishedProjects(),
);

export const loadPublishedProject = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(({ data }) => getPublishedProjectBySlug(data));

export const loadPublishedProperties = createServerFn({ method: "GET" }).handler(
  () => getPublishedProperties(),
);

export const loadPublishedProperty = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(({ data }) => getPublishedPropertyBySlug(data));

export const loadPublishedPlots = createServerFn({ method: "GET" }).handler(
  () => getPublishedPlots(),
);

export const loadPublishedPlot = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(({ data }) => getPublishedPlotBySlug(data));

export const loadPublishedTestimonials = createServerFn({ method: "GET" }).handler(
  () => getPublishedTestimonials(),
);

export const loadFeaturedTestimonials = createServerFn({ method: "GET" }).handler(
  () => getPublishedTestimonials(true),
);

export const loadPublishedInsights = createServerFn({ method: "GET" })
  .inputValidator((limit?: number) => limit)
  .handler(({ data }) => getPublishedInsights(data));

export const loadPublishedInsight = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(({ data }) => getPublishedInsightBySlug(data));

export const loadRelatedInsights = createServerFn({ method: "GET" })
  .inputValidator((input: { id: string; category?: string; tags: string[] }) => input)
  .handler(({ data }) => getRelatedPublishedInsights(data));
