import { ErrorReplaceMediaQuery } from '../errors/errors';

/**
 * @description Replace media query sugar syntax from Figma description block
 *
 * @param str String from Figma description block
 * @param match Matching string (regex?)
 */
export function replaceMediaQuery(str: string, match: string): string {
  if (!str || !match) throw new Error(ErrorReplaceMediaQuery);

  const index = str.indexOf(match);
  if (index === -1) return str;

  // Set media query, assume only "upto" or "min"
  const queryType = match === '@upto' ? 'max' : 'min';

  // Get the right parts
  const sliceStart = match.length + 1;
  const sliceLength = sliceStart + 6;
  const query = str.slice(index, index + sliceLength);
  const size = query.slice(sliceStart, sliceLength);
  const remainder = query.replace(match, '');

  // If match was too greedy
  size.replace(/![0-9]/gi, '').trim();

  return str
    .replace(match, `@media query and (${queryType}-width: ${size}px) {`)
    .replace(remainder, '');
}
