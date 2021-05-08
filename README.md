# useUpdateEffect

[![version](https://img.shields.io/npm/v/use-update-effect.svg)](https://www.npmjs.com/package/use-update-effect)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/use-update-effect.svg)](https://www.npmjs.com/package/use-update-effect)
[![downloads](https://img.shields.io/npm/dt/use-update-effect.svg)](https://www.npmjs.com/package/use-update-effect)

`useUpdateEffect` is a React hook that mimics the behavior of
`componentDidUpdate` in function components.

You may also like
[`use-update-layout-effect`](https://www.npmjs.com/package/use-update-layout-effect).

## Install

- `npm install use-update-effect --save` or
- `yarn add use-update-effect`

## Use

You use the `useUpdateEffect` the same way you would use the `useEffect` hook.
Provide an effect callback and a dependency list, and the effect callback will
only execute when the dependency list updates.

For a behavior exactly the same as `componentDidUpdate`, provide an empty (`[]`)
or no (`undefined`) dependency list.

In the following example, there is no `alert` when the component mounts; but
when the username _changes_, an `alert` appears.

```javascript
import useUpdateEffect from 'use-update-effect';

function MyComponent({ username }) {
  useUpdateEffect(() => {
    alert(`Now logged in as ${username}!`);
  }, [username]);

  return <div>{username}</div>;
}
```

In the following example, a _controlled_ input is allowed to have an in-flight
value until "Apply" is clicked. By using an update effect, we override the
in-flight value when a _new_ controlled value is provided. This is useful when a
controlled value may have more than one controlling component.

```javascript
import { useState } from 'react';
import useUpdateEffect from 'use-update-effect';

function MyComponent({ onChange, value }) {
  const [localValue, setLocalValue] = useState(value);

  useUpdateEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <>
      <input
        onChange={e => {
          setLocalValue(e.target.value);
        }}
        value={localValue}
      />
      <input onClick={onChange} type="submit" value="Apply" />
    </>
  );
}
```
