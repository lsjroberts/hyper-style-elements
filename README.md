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

Element.fullscreen(
  styles(),
  el(styles.title, [Attributes.padding(10)], 'Hello!')
);
```

### Layouts

```js
import { row, column } from "react-style-elements/elements";

const view = Element.fullscreen(
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

### State & Redux

```js
import { connectFullscreen } from 'hyper-style-elements/redux';
import { createStore } from 'redux';

import reducers from './reducers';

const store = createStore(reducers);

connectFullscreen(store)(
  () => styles(),
  (state, dispatch) => el(styles.app, null, app(state, dispatch))
);
```

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

fullscreen(styles('some value'));
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

const view = connectFullscreen(store)(
  (state) => styles(state.theme),
  () => el(styles.app, [], 'Hello!')
);
```

[1]: http://package.elm-lang.org/packages/mdgriffith/style-elements/latest/
[2]: https://viperhtml.js.org/
[3]: https://github.com/lsjroberts/hyper-style-elements-realworld
