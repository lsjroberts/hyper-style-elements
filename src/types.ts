// -- Elements
export type Element = string;
export type Row = string;
export type Column = string;
export type Layout = Row | Column;

// -- Attributes
export type Attribute = RootAttribute | StyleAttribute | SpacingAttribute;
export interface RootAttribute {
  key: string;
  value: string | number | Function;
  kind: 'root';
}
export interface StyleAttribute {
  key: string;
  value: string;
  kind: 'style';
}
export interface SpacingAttribute {
  key: 'xy' | 'x' | 'y';
  value: number;
  kind: 'spacing';
}
export type TransformedAttributes = {
  style?: object;
  spacing?: { xy?: number; x?: number; y?: number };
};

// -- Style
export type StyleSheet = Array<ResolvedStyle>;

export interface Classes {
  [name: string]: string;
}

export interface ResolvedStyle {
  name: string;
  props: Array<ResolvedStyleProp>;
}

export interface Style {
  name: string;
  props: Array<StyleProp>;
}

export type StyleProp = (...any) => ResolvedStyleProp | ResolvedStyleProp;
export type ResolvedStyleProp = [string, string];
