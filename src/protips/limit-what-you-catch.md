---
title: Limit what errors you catch in a try/catch block
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
errors types than you expect!

For example, someone could accidentally rename the `divideNumbers` function - and
now we'd also be catching a `ReferenceError` - but still displaying the "you
can't divide by zero!" error message.

If you have custom error handling or "recovery" logic, be specific what errors
you want to handle, and re-throw all others.

### Further reading

- <https://gist.github.com/jehugaleahsa/f3c43d41e68a6b4bc73d2d6cbaee876a#within-a-limited-scope>
