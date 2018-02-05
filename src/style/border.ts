import { ResolvedStyleProp } from '../types';

export function rounded(radius: number): ResolvedStyleProp {
  return ['border-radius', `${radius}px`];
}
