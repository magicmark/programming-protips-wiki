---
title: Chain custom errors to preserve stack traces
tags: ['error-handling']
---

Don't gobble up underlying errors when (re)throwing a custom error. Instead,
chain the original error to preserve its stack trace in the output.

**Bad Example**

```js
try {
    doSomethingCool();
} catch (err) {
    throw new Error('Yikes! Failed to do anything cool :(')
}
```

**Prefer**

```js
import AggregateError from 'aggregate-error';

try {
    doSomethingCool();
} catch (err) {
    throw new AggregateError(['Yikes! Failed to do anything cool :(', err])
}
```

## Why?

The original error object (`err`) contains valuable stack trace information that
will indicate _why_ the operation failed. By simply throwing a new error and
discarding `err`, we gobble up that information and prevent the programmer from
ever seeing it.

Sometimes we want to throw [custom errors][custom-errors] - remember to throw a
combined error including the underlying error object if applicable.

[custom-errors]: https://programming.protips.wiki/custom-errors/

(This is also known as "exception chaining" in Python.)

Resources for chaining errors:
- [JS] <https://github.com/sindresorhus/aggregate-error>
- [JS] <https://github.com/joyent/node-verror>
- [Python] <https://docs.python.org/3/tutorial/errors.html#exception-chaining>
