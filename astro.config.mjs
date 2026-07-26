// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// `site` is the ONLY place the base URL is declared. chat-cms derives every
// published URL from this value plus Astro's routing conventions — it stores no
// URL map (spec §5).
export default defineConfig({
  site: 'https://chat-cms-sandbox.iterativerefinement.com',
  integrations: [mdx(), sitemap()],
});
