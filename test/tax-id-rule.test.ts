import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { contentFiles } from './content-files';

const TAX_ID = '00-0000000';
const LEGAL_NAME = 'Sandbox Arts Boosters Foundation';

/**
 * The lintable house rule, asserted twice over.
 *
 * The structural assertion below is deliberately STRONGER than the regex
 * declared in `.chat-cms/config.json`: the regex only catches the tax ID and
 * the DBA sharing a line, while this test catches the tax ID appearing anywhere
 * in a file that never states the legal name. That gap is what spec §11's
 * acceptance test 2 drives through — a change that passes `propose_edit` and is
 * then stopped by this pull-request check, so `main` never moves.
 */
describe('house rule: the tax ID never travels without the legal name', () => {
  it('every content file mentioning the tax ID also carries the legal name', () => {
    const offenders = contentFiles().filter((path) => {
      const text = readFileSync(path, 'utf8');
      return text.includes(TAX_ID) && !text.includes(LEGAL_NAME);
    });
    expect(offenders).toEqual([]);
  });

  it('the declared lint rule does not fire on any current content file', () => {
    const config = JSON.parse(readFileSync('.chat-cms/config.json', 'utf8')) as {
      lintRules: Array<{ id: string; pattern: string; flags?: string }>;
    };
    const rule = config.lintRules.find((r) => r.id === 'tax-id-needs-legal-name');
    expect(rule).toBeDefined();
    const re = new RegExp(rule!.pattern, rule!.flags ?? '');
    const offenders = contentFiles().filter((path) =>
      re.test(readFileSync(path, 'utf8')),
    );
    expect(offenders).toEqual([]);
  });

  it('the declared lint rule does fire when the tax ID sits beside the DBA', () => {
    const config = JSON.parse(readFileSync('.chat-cms/config.json', 'utf8')) as {
      lintRules: Array<{ id: string; pattern: string; flags?: string }>;
    };
    const rule = config.lintRules.find((r) => r.id === 'tax-id-needs-legal-name');
    const re = new RegExp(rule!.pattern, rule!.flags ?? '');
    expect(re.test('Make checks out to Sandbox Arts Boosters, tax ID 00-0000000.')).toBe(
      true,
    );
  });
});
