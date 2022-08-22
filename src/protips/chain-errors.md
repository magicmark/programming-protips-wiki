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

If you don't want to do extra error handling to print the full stack trace,
and want something that "just works" (for one-off scripts):

```js
import ono from '@jsdevtools/ono';

try {
  doSomethingCool();
} catch (err) {
  throw ono(err, 'Yikes! Failed to do anything cool :(');
}
```

If you don't want extra libraries and want to use the new [built-in][error-cause]
spec, then you do this:

[error-cause]: https://github.com/tc39/proposal-error-cause

```js
try {
  doSomethingCool();
} catch (err) {
  throw new Error('Yikes! Failed to do anything cool :(', { cause: err });
}
```

Note: By default this will just print the last trace to the console - you'll
need to do a top-level catch-all clause and format the combined stack trace
to view the full trace (similar to [VError.fullStack()][verror]. If you don't
want to set this up, use something like [ono][ono] as shown above.

[verror]: https://github.com/joyent/node-verror#verrorfullstackerr
[ono]: https://github.com/JS-DevTools/ono

## Why?

The original error object (`err`) contains valuable stack trace information that
will indicate _why_ the operation failed. By simply throwing a new error and
discarding `err`, we gobble up that information and prevent the programmer from
ever seeing it.

Sometimes we want to throw [custom errors][custom-errors] - remember to throw a
combined error including the underlying error object if applicable.

[custom-errors]: https://programming.protips.wiki/custom-errors/ 'This is also known as "exception chaining" in Python.'

Resources for chaining errors:

- [JS] <https://github.com/tc39/proposal-error-cause>
- [JS] <https://github.com/voxpelli/pony-cause>
- [JS] <https://github.com/JS-DevTools/ono>
- [JS] <https://github.com/joyent/node-verror>
- [JS] <https://github.com/sindresorhus/aggregate-error>
- [Python] <https://docs.python.org/3/tutorial/errors.html#exception-chaining>
