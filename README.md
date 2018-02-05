# Hyper Style Elements

A partial port of the Elm library [style-elements][1] built upon [hyperHTML][2].

* [RealWorld App][3]

## Why?

It aims to provide a separation between layout and style, with a bonus of type safe styling and css classes.

## Examples

```js
import Style from 'hyper-style-elements/style';
import Color from 'hyper-style-elements/style/color';
import Font from 'hyper-style-elements/style/font';
import Element, { el } from 'hyper-style-elements/elements';
import Attributes from 'hyper-style-elements/elements/attributes';

const styles = Style.styleSheet([
  Style.style('title', [
    Color.text(Color.rgb(30, 30, 30)),
    Color.background(Color.white),
    Font.size(28)
  ])
]);

const view = Element.layout(
  styles(),
  el(styles.title, [Attributes.padding(10)], 'Hello!')
);

ReactDOM.render(view, document.getElementById('main'));
```

### Layouts

```js
import { row, column } from "react-style-elements/elements";

const view = Element.layout(
  styles(),
  column(
    null,
    [Attributes.spacing(10)],
    [
      el(styles.title, [Attributes.padding(10)], "Hello!"),
      row(
        null,
        [Attributes.spacing(10)],
        [
          el(styles.content, [], "One"),
          el(styles.content, [], "Two"),
          el(styles.content, [], "Three")
        ]
    ]
  )
);
```

<!--
### Themes

Each property in the array passed into the second argument of `style()` can be a callback. The arguments passed in are those given to the `styles()` in `layout()`, and it should return an array of properties.

```js
const styles = styleSheet([
  style('app', [
    size(16),
    weight(700),
    arg => {
      // arg === 'some value'
      // return [...];
    }
  ])
]);

layout(styles('some value'));
```

This can be used to create a themed stylesheet that can be changed at runtime.

```js
const styles = styleSheet([
  style('app', [
    size(16),
    weight(700),
    (theme = 'light') =>
      theme === 'light'
        ? [
            background(rgb(240, 240, 240)),
            text(rgb(30, 30, 30)),
          ],
        : [
            background(rgb(30, 30, 30)),
            text(rgb(240, 240, 240)),
          ]
  ])
  ),
]);

const view = connect(({ theme }) =>
  layout(
    styles(theme),
    null,
    el(styles.app, [], 'Hello!')
  )
);
```

This could be cleaner with a custom `themed()` function.

```js
const themed = (theme = 'light') => themedStyles => themedStyles[theme] || [];

const styles = styleSheet([
  style('app', [
    size(16),
    weight(700),
    themed({
      light: [background(rgb(240, 240, 240)), text(rgb(30, 30, 30))],
      dark: [background(rgb(30, 30, 30)), text(rgb(240, 240, 240))]
    })
  ])
]);
```
-->

[1]: http://package.elm-lang.org/packages/mdgriffith/style-elements/latest/
[2]: https://viperhtml.js.org/
[3]: https://github.com/lsjroberts/hyper-style-elements-realworld
