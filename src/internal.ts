import {
  groupBy,
  flatten,
  map,
  mapValues,
  merge,
  omit,
  zipObject
} from 'lodash';

const { wire } = require('hyperhtml/cjs');

import { Attribute, Element, Layout, TransformedAttributes } from './types';

// -- Elements
export const createElement = (
  wrappedElement,
  fixedStyleAttr,
  style: string,
  attrs: Array<Attribute>,
  children: Array<Layout | Element | string> | Layout | Element | string
): Element => {
  const transformedAttrs = transformAttrs(attrs);

  const classAttr = ['el', style].filter(Boolean).join(' ');
  const styleAttr = merge(transformedAttrs.style, fixedStyleAttr);
  const extraAttrs = omit(transformedAttrs, ['style', 'spacing']);

  const element = wrappedElement(classAttr, styleAttr, children, extraAttrs);

  for (const key in extraAttrs) {
    if (!element.hasAttribute(key)) {
      console.log(element, 'setAttribute', key, extraAttrs[key]);
      element.setAttribute(key, extraAttrs[key]);
    }
  }

  return element;
};

export const createSingle = (
  wrappedElement,
  fixedStyleAttr,
  style: string,
  attrs: Array<Attribute>,
  child: Element
): Element => {
  return createElement(wrappedElement, fixedStyleAttr, style, attrs, child);
};

export const createMulti = (
  wrappedElement,
  fixedStyleAttr,
  style: string,
  attrs: Array<Attribute>,
  children: Array<Layout | Element | string>
): Element => {
  return createElement(wrappedElement, fixedStyleAttr, style, attrs, children);
};

// -- Attributes
export function transformAttrs(
  attrs: Array<Array<Attribute> | Attribute>
): TransformedAttributes {
  const groupedAttrs = mapValues(groupBy(flatten(attrs), 'kind'), group =>
    zipObject(map(group, 'key'), map(group, 'value'))
  );
  return merge(groupedAttrs.root, omit(groupedAttrs, 'root'));
}

// -- Style
export const normalized =
  'html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin:0;padding:0;border:0}body{margin:0}.style-elements{display:block;position:relative;margin:0;padding:0;border:0;font-size:100%;font:inherit;box-sizing:border-box;line-height:1.2}.el{display:block;position:relative;margin:0;padding:0;border:0;border-style:solid;font-size:100%;font:inherit;box-sizing:border-box}em.el{font-style:italic}b.el,strong.el{font-weight:bolder}strike.el{text-decoration:line-through}u.el{text-decoration:underline}a.el{text-decoration:none;color:inherit}img.el{border-style:none}sub.el,sup.el{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub.el{bottom:-0.25em}sup.el{top:-0.5em}';
