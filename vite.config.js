import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";
import { pages } from "./src/data/nav.js";
import { course } from "./src/data/course.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The public address of the site, used for absolute share links, the sitemap and robots.txt.
// Set SITE_URL to a custom domain; on Vercel the production domain is picked up automatically.
function siteUrl() {
  const raw = process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "");
  return raw.replace(/\/+$/, "");
}

const IMAGE_ALT = "Applied AI Guide: Applied AI for Automation and Decision Support, Bacolod City, November 24 to 26, 2026";

function seo() {
  const base = siteUrl();
  const abs = (p) => `${base}${p}`;

  return {
    name: "seo",
    transformIndexHtml() {
      const image = abs("/og-image.png");
      const tags = [
        { tag: "meta", attrs: { property: "og:image", content: image } },
        { tag: "meta", attrs: { property: "og:image:type", content: "image/png" } },
        { tag: "meta", attrs: { property: "og:image:width", content: "1200" } },
        { tag: "meta", attrs: { property: "og:image:height", content: "630" } },
        { tag: "meta", attrs: { property: "og:image:alt", content: IMAGE_ALT } },
        { tag: "meta", attrs: { name: "twitter:image", content: image } },
        { tag: "meta", attrs: { name: "twitter:image:alt", content: IMAGE_ALT } },
      ];
      if (base) {
        tags.unshift(
          { tag: "link", attrs: { rel: "canonical", href: abs("/") } },
          { tag: "meta", attrs: { property: "og:url", content: abs("/") } }
        );
      }
      const event = {
        "@context": "https://schema.org",
        "@type": "EducationEvent",
        name: course.title,
        description:
          "Three hands-on days on using AI safely, responsibly, and productively in government work: prompting, office automation with free tools, agents and MCP, local AI, and AI-assisted decision support.",
        startDate: `${course.start}T08:00:00+08:00`,
        endDate: `${course.end}T17:00:00+08:00`,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        inLanguage: "en",
        location: {
          "@type": "Place",
          name: course.city,
          address: { "@type": "PostalAddress", addressLocality: "Bacolod City", addressRegion: "Negros Occidental", addressCountry: "PH" },
        },
        ...(base ? { url: abs("/"), image: image } : {}),
      };
      tags.push({ tag: "script", attrs: { type: "application/ld+json" }, children: JSON.stringify(event) });
      return tags.map((t) => ({ ...t, injectTo: "head" }));
    },
    generateBundle() {
      const robots = ["User-agent: *", "Allow: /", ...(base ? ["", `Sitemap: ${abs("/sitemap.xml")}`] : [])].join("\n");
      this.emitFile({ type: "asset", fileName: "robots.txt", source: `${robots}\n` });
      if (!base) return;
      const today = new Date().toISOString().slice(0, 10);
      const urls = pages
        .map((p) => `  <url><loc>${abs(p.to)}</loc><lastmod>${today}</lastmod>${p.to === "/" ? "<priority>1.0</priority>" : ""}</url>`)
        .join("\n");
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), seo()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
