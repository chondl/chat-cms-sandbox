# House rules — Sandbox Arts Boosters

These are this site's own editing rules. chat-cms composes them into the
assistant's guidance after its universal tool guidance and this site's derived
facts (spec §7).

## Naming and the tax ID (enforced — this rule is checked, not merely requested)

The organisation has two names:

- **Legal name:** Sandbox Arts Boosters Foundation
- **Everyday name (DBA):** Sandbox Arts Boosters

Everyday copy uses the everyday name. Anything financial — checks, employer
matching forms, receipts, the tax ID — uses the **full legal name**.

**The tax ID never appears beside the everyday name alone.** Wherever the tax ID
`00-0000000` appears, the words "Sandbox Arts Boosters Foundation" must appear
with it. This rule is declared in [config.json](config.json) as the
`tax-id-needs-legal-name` lint rule, so a proposal that breaks it is rejected
before anyone sees a diff, and the site's own test suite asserts it again as a
pull-request check.

(The tax ID on this site is `00-0000000`, a deliberately impossible fixture
value. It is not a real EIN.)

## Voice (judgment — please follow it; nothing checks this for you)

Write the way a parent volunteer talks to another parent volunteer:

- Plain, warm, specific. Concrete details beat adjectives — "the truck rental
  for competition weekends" is better than "critical program needs".
- Never guilt anyone. Families give what they can; some give time instead.
- Say what the Boosters do and what the school does. The Boosters support; the
  school runs the programs. Do not imply the Boosters run classes, hire staff,
  or set curriculum.
- Prefer evergreen wording over wording that expires. "Each spring" outlives
  "this April".
- No exclamation marks in body copy. One in a headline, at most, and only if it
  has earned it.

## Dates

The season calendar uses the pattern `**Day DD** — Event, time, place.` Keep the
day of the week and the date consistent with each other; the school calendar
wins any disagreement.
