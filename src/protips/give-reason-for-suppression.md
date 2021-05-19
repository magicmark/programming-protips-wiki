---
title: Give a reason when using suppression statements
tags: ['types', 'linter']
---

Add a description to suppression statements used to silence warnings from linters
and type checkers to tell us _why_ it's being silenced.

**Bad Examples**

```js
// $FlowFixMe
```

```js
/* istanbul ignore if */
```

```js
// eslint-disable-next-line no-alert
```

**Prefer**

```js
// $FlowFixMe: The typings for this method are out of date. TODO: Use new version when released (MYJIRA-1234)
```

```js
/* istanbul ignore if: sanity check  */
```

```js
// TODO(MYJIRA-1234): Create and use a design system modal component. For now, we're using alert :(
// eslint-disable-next-line no-alert
```

If your project uses a bug tacker or GitHub issues, creating and linking to a
ticket in the description where appropriate is a good idea. Include a sample
stack trace so readers can understand the failure case, and that it's searchable.

## Why?

Without a description, it may not be obvious to the reader of the code why the
line is being suppressed, and if or when in the future it can be removed.

Suppression statements are powerful and can mask buggy code that would otherwise
be caught - it's usually good to communicate why it's being used, so readers of
the code can understand the tradeoff and the need for employing it.
