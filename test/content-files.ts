import { readdirSync } from 'node:fs';
import { join } from 'node:path';

export const CONTENT_ROOT = 'src/content';

/** Every content file in every collection, repo-relative. */
export function contentFiles(): string[] {
  const out: string[] = [];
  for (const dir of readdirSync(CONTENT_ROOT)) {
    const full = join(CONTENT_ROOT, dir);
    for (const file of readdirSync(full)) out.push(join(full, file));
  }
  return out.sort();
}
