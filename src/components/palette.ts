import CTAButton from './CTAButton.astro';
import Hero from './Hero.astro';
import Reasons from './Reasons.astro';

/**
 * The content-block palette: the components this site exposes to MDX content
 * files. Content files never import anything — routes pass this map to
 * `<Content components={palette} />`, which is what keeps editable files free
 * of executable statements (spec §5).
 *
 * chat-cms derives the palette from this map; it is never a hand-maintained
 * list on the editor side.
 */
export const palette = { CTAButton, Hero, Reasons };
