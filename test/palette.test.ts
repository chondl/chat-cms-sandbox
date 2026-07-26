import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { contentFiles } from './content-files';

/**
 * The palette map is what chat-cms derives this site's block palette from
 * (spec §7, layer 2 — derived facts). Asserting it here means a change to the
 * palette is a visible, reviewed change rather than a silent one.
 */
describe('content-block palette', () => {
  const source = readFileSync('src/components/palette.ts', 'utf8');

  it('exposes exactly CTAButton, Hero and Reasons to content files', () => {
    const match = /export const palette = \{([^}]*)\}/.exec(source);
    expect(match).not.toBeNull();
    const names = match![1]!
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .sort();
    expect(names).toEqual(['CTAButton', 'Hero', 'Reasons']);
  });

  it('no content file imports a component', () => {
    // Editable files must contain zero executable content (spec §5): the
    // palette reaches MDX through the `components` prop, never an import.
    const offenders = contentFiles().filter((path) =>
      /^\s*import\s/m.test(readFileSync(path, 'utf8')),
    );
    expect(offenders).toEqual([]);
  });

  it('no content file contains a script tag or a JSX expression', () => {
    const offenders = contentFiles().filter((path) => {
      const text = readFileSync(path, 'utf8');
      return /<script/i.test(text) || /\{[^}\n]*\}/.test(text.replace(/^---[\s\S]*?\n---/, ''));
    });
    expect(offenders).toEqual([]);
  });
});
