# Description

[![Build Status](https://travis-ci.org/MihaiIon/classnames-helper.svg?branch=master)](https://travis-ci.org/MihaiIon/classnames-helper)
[![Coverage Status](https://coveralls.io/repos/github/MihaiIon/classnames-helper/badge.svg?branch=master)](https://coveralls.io/github/MihaiIon/classnames-helper?branch=master)

This small package is a simple alternative to other solutions available on **npm**.

The goal is to reduce the amount of code it takes to describe the structure of an element's classnames.

The `classnames-helper` offers a simple way to join classnames with **optional conditions** while removing unnecessary spaces.

## How to install

```
npm install classnames-helper
```

# Usage

```js
import cn from 'classnames-helper';
```

The function `cn` accepts an unlimited number of arguments.

## Arguments

Each argument must be one of the following:

| Shape                           | Effect                                                                                                                                                |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `string`                        | This classname will always be appended to the resulting classnames.                                                                                   |
| [`boolean`, `string`]           | If the **condition** is `true`, the classname will be appended to the resulting classnames.                                                           |
| [`boolean`, `string`, `string`] | If the **condition** is `true`, the **first** classname will be used. If the **condition** is `false`, the **second** classname will be used instead. |
| [`number`, `...string[]`]       | The appended classname will be selected by the provided `number` (index).                                                                             |

## Example

```jsx
import React { useState } from "react";
import cn from "classnames-helper";

const STATE = {
  DEFAULT: 0,
  PRIMARY: 1,
  DANGER: 2,
};

function ReactComponent() {
  const [isActive, setVisibility] = useState(true);
  const [isHidden, setHidden] = useState(false);
  const [state, setState] = useState(STATE.PRIMARY);

  // ...

  // Define order of classes and conditions
  const className = cn(
    "c-component-name",
    [isActive, "-active"],
    [isHidden, "-hide", "-show"],
    [state, "-default", "-primary", "-danger"],
    "some-other-class"
  );

  return (
    <button type="button" className={className} onClick={...}>Click Me</button>
  );
}

export default ReactComponent;
```

The ouput :

```js
`
<button type="button" className="c-component-name -active -show -primary some-other-class">
  Click Me
</button>
`;
```
