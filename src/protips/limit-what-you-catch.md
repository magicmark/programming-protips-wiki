---
title: Limit what you catch
tags: ['error-handling']
---

Be specific when catching an error. Re-throw all other errors.

**Bad Example**

```js
try {
  result = divideNumbers(3, 0);
} catch (e) {
  console.error("You can't divide by zero!");
}
```

**Prefer**

```js
try {
  result = divideNumbers(3, 0);
} catch (e) {
  if (e instanceof DivideByZeroError) {
    console.error("You can't divide by zero!");
  } else {
    throw e;
  }
}
```

## Why?

Lots of things could throw!

The message displayed to users or recovery logic inside the catch block may only
apply to a certain type of error. But the catch block may be triggered with more
errors types than you expect! (e.g. Someone accidentally renames the
`divideNumbers` function, and now we're also catching a `ReferenceError`!)

Avoid "catch all" blocks that gobble up errors we didn't intend to catch.

More reading: <https://gist.github.com/jehugaleahsa/f3c43d41e68a6b4bc73d2d6cbaee876a#within-a-limited-scope>
