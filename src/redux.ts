const { bind, wire } = require('hyperhtml/cjs');

import { Element, Layout, StyleSheet } from './types';
import { normalized } from './internal';

normalized; // HACK: force import

export const connect = store => (node, createStyleSheet, createChild) => {
  const renderNode = bind(node);

  const normalizedStylesElement = document.createElement('style');
  normalizedStylesElement.type = 'text/css';
  normalizedStylesElement.appendChild(document.createTextNode(normalized));
  document.head.appendChild(normalizedStylesElement);

  const dispatch = store.dispatch;

  const renderer = renderAll(
    renderNode,
    createStyleSheet,
    createChild,
    dispatch
  );
  renderer(store.getState());

  store.subscribe(() => {
    renderer(store.getState());
  });
};

export const connectFullscreen = store => (createStyleSheet, createChild) => {
  addEventListener('DOMContentLoaded', () => {
    connect(store)(document.body, createStyleSheet, createChild);
  });
};

let nextStyles;
let prevStyles;
const renderAll = (
  renderNode,
  createStyleSheet,
  createChild,
  dispatch
) => state => {
  const styleSheet = createStyleSheet(state);
  const child = createChild(state, dispatch);

  nextStyles = styleSheet
    .map(
      ({ name, props }) =>
        `.${name}{${props.map(([key, value]) => `${key}:${value};`).join('')}}`
    )
    .join('');

  if (nextStyles !== prevStyles) {
    renderStyles(nextStyles);
  }

  prevStyles = nextStyles;

  renderNode`
    <div class="style-elements">
      ${child}
    </div>
  `;
};

let stylesElement;
let stylesElementTextNode;
const renderStyles = styles => {
  if (!stylesElement) {
    stylesElement = document.createElement('style');
    stylesElementTextNode = document.createTextNode(styles);
    stylesElement.type = 'text/css';
    stylesElement.appendChild(stylesElementTextNode);
    document.head.appendChild(stylesElement);
  } else {
    stylesElement.removeChild(stylesElementTextNode);
    stylesElementTextNode = document.createTextNode(styles);
    stylesElement.appendChild(stylesElementTextNode);
  }
};
