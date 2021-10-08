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
    throw new Error('Yikes! Failed to do anything cool :(');
}
```

**Prefer**

```js
import { ErrorWithCause } from 'pony-cause';

try {
    doSomethingCool();
} catch (err) {
    throw new ErrorWithCause('Yikes! Failed to do anything cool :(', { cause: err });
}
```

_Note: Support for
[`.cause` has been added to the JS `Error` spec][proposal-error-cause].  If
you're running in a modern environment, you can just use that - but you'll have
to do your own handling and printing to show the full combined stack trace (same
with VError)._

[proposal-error-cause]: (https://github.com/tc39/proposal-error-cause) 

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
- [JS] <https://github.com/tc39/proposal-error-cause>
- [JS] <https://github.com/voxpelli/pony-cause>
- [JS] <https://github.com/joyent/node-verror>
- [JS] <https://github.com/sindresorhus/aggregate-error>
- [Python] <https://docs.python.org/3/tutorial/errors.html#exception-chaining>
