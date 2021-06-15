import { FRAME as Frame } from '../../../contracts/Figma';
import { ColorTokens } from '../../../contracts/Tokens';

import { camelize } from '../../../frameworks/string/camelize';
import { createSolidColorString } from '../../../frameworks/string/createSolidColorString';
import { createLinearGradientString } from '../../../frameworks/string/createLinearGradientString';
import { createRadialGradientString } from '../../../frameworks/string/createRadialGradientString';

import {
  ErrorMakeColorTokensNoFrame,
  ErrorMakeColorTokensNoChildren
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma color frames into a clean object
 */
export function makeColorTokens(colorFrame: Frame): ColorTokens {
  if (!colorFrame) throw new Error(ErrorMakeColorTokensNoFrame);
  if (!colorFrame.children) throw new Error(ErrorMakeColorTokensNoChildren);

  const colors: Record<string, unknown> = {};
  const TOKENS = colorFrame.children;
  console.log('!!!!');
  TOKENS.forEach((item: Frame) => makeColorToken(item, colors));
  console.log('TOKENS', TOKENS);

  return colors;
}

function makeColorToken(item: Frame, colors: Record<string, unknown>) {
  // @ts-ignore
  if (!item.fills || item.fills.length === 0) return null;

  const NAME = camelize(item.name);
  const FILLS = item.fills[0];

  if (FILLS.type === 'SOLID') colors[NAME] = createSolidColorString(FILLS);
  else if (FILLS.type === 'GRADIENT_LINEAR') colors[NAME] = createLinearGradientString(FILLS);
  else if (FILLS.type === 'GRADIENT_RADIAL') colors[NAME] = createRadialGradientString(FILLS);
}
