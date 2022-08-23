---
title: Use assertions for possibly null values
tags: ['types']
---

Use `assert` or `if` statements to _refine_ a type when passing a possibly null
or undefined value to a function.

This is a subset problem of ["don't try and outsmart the typechecker"](/dont-outsmart-typechecker/).

::: bad :::

```jsx
function getMenu(user: User): Menu {
  // $FlowFixMe: user.favoriteFood should always be set!
  const mealItems = getLunchMenu(user.favoriteFoods);

  return {
    name: 'lunch',
    items: mealItems,
  };
}
```

::: good :::

```jsx
import invariant from 'assert';

function getMenu(user: User): Menu {
  invariant(Array.isArray(user.favoriteFoods), 'expected favoriteFoods to be set!');
  const mealItems = getLunchMenu(user.favoriteFoods);

  return {
    name: 'lunch',
    items: mealItems,
  };
}
```

or

```js
function getMenu(user: User): Menu {
  if (!Array.isArray(user.favoriteFoods)) {
    throw new Error('expected favoriteFoods to be set!');
  }

  const mealItems = getLunchMenu(user.favoriteFoods);

  return {
    name: 'lunch',
    items: mealItems,
  };
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
