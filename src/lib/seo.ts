export function pageMeta(
  title: string,
  description: string,
  canonicalPath?: string,
) {
  const full = `${title} | JLuxe`;
  return {
    meta: [
      { title: full },
      { name: "description", content: description },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    ...(canonicalPath
      ? { links: [{ rel: "canonical", href: canonicalPath }] }
      : {}),
  };
}
