---
title: Use assertions for possibly null values
tags: ['types']
---

Use `assert` or `if` statements to _refine_ a type when passing a possibly null
or undefined value to a function.

This is a subset problem of ["don't try and outsmart the typechecker"](/dont-outsmart-typechecker/).

::: bad :::

```jsx
function printMenu({ favoriteFoods }) {
  // @ts-ignore: favoriteFood should always be set!
  const menu = getMenu(favoriteFoods);

  // print the menu!
  console.log(`Today's menu is: ${menu}`);
}
```

::: bad :::

```jsx
function printMenu({ favoriteFoods }) {
  const menu = getMenu(favoriteFoods);

  /* istanbul ignore next: menu item always exists */
  if (!menu) return;

  // print the menu!
  console.log(`Today's menu is: ${menu}`);
}
```

::: good :::

```jsx
import { strict as assert } from 'node:assert';

function printMenu({ favoriteFoods }) {
  assert(Array.isArray(favoriteFoods), 'expected favoriteFoods to be set!');
  const menu = getMenu(favoriteFoods);

  // print the menu!
  console.log(`Today's menu is: ${menu}`);
}
```

::: good Also Good :::

```js
function printMenu({ favoriteFoods }) {
  if (!Array.isArray(favoriteFoods)) {
    throw new Error('expected favoriteFoods to be set!');
  }

  const menu = getMenu(favoriteFoods);
  
  // print the menu!
  console.log(`Today's menu is: ${menu}`);
}
```

## Why?

Despite the type for a value being nullable, as humans, we may know that it may
be guaranteed to be set in certain situations. But the type system doesn't - so
you may be tempted to disable the type checker in such situations. Don't!

In general, we should avoid trying to "outsmart the typechecker" _(see
["don't try and outsmart the typechecker"](/dont-outsmart-typechecker/)_).

There's no real proof or guarantee the code will behave the way you expect - just
your word for it. The best way to guarantee this expectation is to enforce it via
the code.

The benefits here are:

- provides a runtime check in case the expectation is violated, forcing the code
  to do the right thing rather than failing silently
- provides a regression test to prevent this expectation from changing over time
  as the codebase evolves
- removes the need to manually override the typechecker

### Further reading

- <https://medium.com/@thejameskyle/type-systems-refinements-explained-26f713c6cc2a>
