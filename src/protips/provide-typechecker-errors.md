---
title: Copy and paste the error message from the typechecker (e.g. TypeScript, Flow) when using supression statements
tags: ['typechecker', 'supression-statements']
---

**❌ &nbsp;Bad:**

```js
// $FlowFixMe: Ignoring this because `greeting` isn't actually null
sayHello(greeting);
```

**✅ &nbsp;Good:**

```js
// $FlowFixMe: Flow thinks `greeting` is null, but it isn't (https://i.fluffy.cc/bsJdpV7pq69PFvX0sCJplgdGxFwqJTHH)
sayHello(greeting);
```

(Or link to the error in an inline comment during code review.)

## Why?

Your code reviewer can't easily run your code to see what the actual error was. Help them by showing them the error that
the typechecker produced. Either:

- copy and paste it as an inline comment in Github (or whatever code review tool you use)
- copy and paste it into a public pastebin (e.g. [fluffy.cc](fluffy.cc)) and link to it in-code in the supression statement comment

Using a supression statement, especially for typecheckers, is a [code smell](http://wiki.c2.com/?CodeSmell). Something
has gone wrong if we're resorting to using one, and it usually indicates that something somewhere _else_ needs to be
fixed, such as library type definitions, generated client libraries from swagger specs, or perhaps a bug in the
typechecker itself.

This implies that if we're turning off the typechecker, it's either:

1. a placeholder until the underlying issue is fixed (in which case, [also give this reason in the supression comment][give-reason])
2. we're simply turning it off for this line because it's complex to resolve

Either way, **you should always copy and paste the error message from the typechecker**, so your code reviewer can
confirm that your error fits the reason given for (1), or help provide a fix in code to help resolve (2).

[give-reason]: /give-reason-for-suppression
