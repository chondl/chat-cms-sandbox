import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { describe, expect, it } from 'vitest';
import { contentFiles } from './content-files';

function frontmatter(text: string): Record<string, unknown> {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  if (!match) throw new Error('no frontmatter block');
  return parse(match[1]!) as Record<string, unknown>;
}

/**
 * Deliberately shallow: the YAML parses and there is a title.
 *
 * Typed-schema conformance is the BUILD's job, not this check's. Spec §11's
 * acceptance test 3 needs one failure mode that survives the pull-request check
 * and breaks the deploy build (`order: "first"` parses as YAML and is rejected
 * by the Zod schema at build time). Do not add schema validation here — see
 * README.md, "Why the PR check is narrower than the build".
 */
describe('frontmatter sanity', () => {
  for (const path of contentFiles()) {
    it(`${path} has parseable frontmatter with a title`, () => {
      const data = frontmatter(readFileSync(path, 'utf8'));
      expect(typeof data.title).toBe('string');
      expect((data.title as string).length).toBeGreaterThan(0);
    });
  }
});
