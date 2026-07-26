import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Singleton pages — each entry is rendered by its own static route in
 * `src/pages/`. Fixture for URL derivation over file-based routing.
 */
const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.coerce.date().optional(),
  }),
});

/**
 * Multi-entry programs — rendered by the dynamic route
 * `src/pages/programs/[slug].astro`. Fixture for collection→dynamic-route URL
 * derivation, typed-number schema violations (`order`), boolean toggles
 * (`showDonate`) and optional-field block removal (`googleGroupUrl`).
 */
const programs = defineCollection({
  loader: glob({ base: './src/content/programs', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    summary: z.string(),
    icon: z.string(),
    showDonate: z.boolean(),
    googleGroupUrl: z.string().url().optional(),
  }),
});

export const collections = { pages, programs };
