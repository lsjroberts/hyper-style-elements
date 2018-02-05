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

export const row = partial(createMulti, 'div', {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap'
});
export const wrappedRow = partial(createMulti, 'div', {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap'
});
export const column = partial(createMulti, 'div', {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap'
});
export const wrappedColumn = partial(createMulti, 'div', {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap'
});

// -- Single Child Elements
export const el = partial(createSingle, 'div', {});

export const paragraph = partial(createMulti, 'p', {});
export const link = partial(createSingle, 'a', {});
export const h1 = partial(createSingle, 'h1', {});
export const h2 = partial(createSingle, 'h2', {});
export const h3 = partial(createSingle, 'h3', {});
export const h4 = partial(createSingle, 'h4', {});
export const h5 = partial(createSingle, 'h5', {});
export const h6 = partial(createSingle, 'h6', {});

export const article = partial(createSingle, 'article', {});
export const footer = partial(createSingle, 'footer', {});
export const header = partial(createSingle, 'header', {});
export const navigation = partial(createSingle, 'nav', {});
