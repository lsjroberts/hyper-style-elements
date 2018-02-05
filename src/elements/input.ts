import { merge, noop } from 'lodash';

const { wire } = require('hyperhtml/cjs');

import { Attribute, Element, Layout } from '../types';

import { createElement, transformAttrs } from '../internal';

// -- Wrappers

interface Form {
  onSubmit: () => void;
}

export function form(
  style: string,
  attrs: Array<Attribute>,
  form: Form,
  children: Layout | Element
): Element {
  const transformedAttrs = transformAttrs(attrs);

  return wire()`
    <form
      class=${['el', style].filter(Boolean).join(' ')}
      style=${transformedAttrs.style}
      onSubmit=${evt => {
        evt.preventDefault();
        form.onSubmit();
      }}
    >
      ${children}
    </form>
  `;
}

// -- Textual

interface Text {
  onChange: (value: string | number) => void;
  value: string | number | null;
  label: Element | string;
}

export function text(
  style: string,
  attrs: Array<Attribute>,
  input: Text = { onChange: noop, value: null, label: '' }
): Element {
  const transformedAttrs = transformAttrs(attrs);

  return wire()`
    <input
      class=${['el', style].filter(Boolean).join(' ')}
      style=${transformedAttrs.style}
      type="text"
      onChange=${evt => input.onChange(evt.target.value)}
      value=${input.value}
    />
  `;
}

// -- Controls

interface Checkbox {
  onChange: (value: boolean) => void;
  checked: boolean;
  label: Element | string;
}

export function checkbox(
  style: string,
  attrs: Array<Attribute>,
  checkbox: Checkbox
): Element {
  const transformedAttrs = transformAttrs(attrs);
  const styleAttr = merge(transformedAttrs.style, {
    display: 'flex'
  });

  return wire()`
    <label style=${styleAttr}>
      <input
        type="checkbox"
        checked=${checkbox.checked}
        onChange=${evt => checkbox.onChange(evt.target.checked)}
      />
      ${checkbox.label}
    </label>
  `;
}

// -- Buttons

interface Button {
  onPress: () => void;
  submit?: boolean;
}

export function button(
  style: string,
  attrs: Array<Attribute>,
  button: Button = { onPress: noop, submit: false },
  child: Element
): Element {
  return wire()`
    <button
      type=${(<Button>button).submit ? 'submit' : null}
      onClick=${evt =>
        (<Button>button).onPress ? (<Button>button).onPress() : noop}
    >
      ${child}
    </button>
  `;
}
