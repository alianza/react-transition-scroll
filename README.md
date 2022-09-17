# react-transition-scroll

> Easily &amp; Beautifully create scroll transitions in react!

[![NPM](https://img.shields.io/npm/v/react-transition-scroll.svg)](https://www.npmjs.com/package/react-transition-scroll) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


## Introduction

`react-transition-scroll` is a lightweight library to easily and
beautifully implement scroll animations/transition in react. It is built on top of the modern
IntersectionObserver API. It covers most use cases for scroll animations and transitions.

Check out examples [here](https://alianza.github.io/react-transition-scroll/)!

## Install
Npm:
```bash
npm install --save react-transition-scroll
```
Yarn:
```bash
yarn add --save react-transition-scroll
```

## Usage

```jsx
import React, { Component } from 'react'

import { TransitionScroll } from 'react-transition-scroll'
import 'react-transition-scroll/dist/index.css'

class Example extends Component {
  render() {
    return(
      <TransitionScroll options... >
        <YourComponentToAnimate />
      </TransitionScroll>
    )
  }
}
```

## Options

| Name          | Type           | Default                                                    | Description                                                                                     |
|---------------|----------------|------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| `threshold`   | `number`       | `0`                                                        | `Percentage of element that has to be in view to trigger transition (number between 0 and 100)` |
| `reAnimate`   | `boolean`      | `false`                                                    | `Whether to reanimate if element enters viewport again`                                         |
| `baseStyle`   | `Style Object` | `{}`                                                       | `Base styles to apply to transition element`                                                    |
| `hiddenStyle` | `Style Object` | `{ opacity: 1, translate: '0 12px', filter: 'blur(4px)' }` | `Styles to apply to transition element when hidden`                                             |
| `showStyle`   | `Style Object` | `{ opacity: 0, translate: '0 0', filter: 'none' }`         | `Styles to apply to transition element when hidden`                                             |
| `className`   | `string`       | `''`                                                       | `Classname to apply to the transition element`                                                  |

## Features


👌 Honors prefers-reduced-motion media query  
🚀 Uses IntersectionObserver API (Blazingly fast)

## License

MIT © [alianza](https://github.com/alianza)
