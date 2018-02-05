// import { bind } from 'hyperhtml';
import { map, merge, partial } from 'lodash';

const { bind, wire } = require('hyperhtml/cjs');

import {
  createSingle,
  createMulti,
  transformAttrs,
  normalized
} from './internal';
import { Attribute, Column, Element, Layout, Row, StyleSheet } from './types';

normalized; // HACK: force import

// -- Layout
export const layout = (
  styleSheet: StyleSheet,
  child: Element | Layout
): void => {
  const styles = styleSheet
    .map(
      ({ name, props }) =>
        `.${name}{${props.map(([key, value]) => `${key}:${value};`).join('')}}`
    )
    .join('');

  console.log(styleSheet);

  addEventListener('DOMContentLoaded', () => {
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.appendChild(
      document.createTextNode(`${normalized}\n${styles}`)
    );
    document.head.appendChild(styleElement);

    bind(document.body)`
      <div class="style-elements">
        ${child}
      </div>
    `;
  });
};

const createMultiDiv = partial(
  createMulti,
  (className, style, children) =>
    wire()`<div class=${className} style=${style}>${children}</div>`
);

export const row = partial(createMultiDiv, {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap'
});
export const wrappedRow = partial(createMultiDiv, {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap'
});
export const column = partial(createMultiDiv, {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap'
});
export const wrappedColumn = partial(createMultiDiv, {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap'
});

// -- Single Child Elements
export const el = partial(
  createSingle,
  (className, style, child) =>
    wire()`<div class=${className} style=${style}>${child}</div>`,
  {}
);

export const text = t => wire()`${t}`;

export const paragraph = partial(
  createMulti,
  (className, style, children) =>
    wire()`<p class=${className} style=${style}>${children}</p>`,
  {}
);

export const link = partial(
  createSingle,
  (className, style, child) =>
    wire()`<a class=${className} style=${style}>${child}</a>`,
  {}
);

export const h1 = partial(
  createSingle,
  (className, style, child) =>
    wire()`<h1 class=${className} style=${style}>${child}</h1>`,
  {}
);
export const h2 = partial(
  createSingle,
  (className, style, child) =>
    wire()`<h2 class=${className} style=${style}>${child}</h2>`,
  {}
);
export const h3 = partial(
  createSingle,
  (className, style, child) =>
    wire()`<h3 class=${className} style=${style}>${child}</h3>`,
  {}
);
export const h4 = partial(
  createSingle,
  (className, style, child) =>
    wire()`<h4 class=${className} style=${style}>${child}</h4>`,
  {}
);
export const h5 = partial(
  createSingle,
  (className, style, child) =>
    wire()`<h5 class=${className} style=${style}>${child}</h5>`,
  {}
);
export const h6 = partial(
  createSingle,
  (className, style, child) =>
    wire()`<h6 class=${className} style=${style}>${child}</h6>`,
  {}
);

export const article = partial(
  createSingle,
  (className, style, child) =>
    wire()`<article class=${className} style=${style}>${child}</article>`,
  {}
);
export const footer = partial(
  createSingle,
  (className, style, child) =>
    wire()`<footer class=${className} style=${style}>${child}</footer>`,
  {}
);
export const header = partial(
  createSingle,
  (className, style, child) =>
    wire()`<header class=${className} style=${style}>${child}</header>`,
  {}
);
export const navigation = partial(
  createSingle,
  (className, style, child) =>
    wire()`<nav class=${className} style=${style}>${child}</nav>`,
  {}
);
