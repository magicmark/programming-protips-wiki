---
title: Give a reason when using suppression statements
tags: ['typechecker', 'linter', 'supression-statements']
---

Add a description to suppression statements telling us why it's being silenced. A comment like "x is wrong" is almost never sufficient (if it really is wrong, please file a bug report and link to it in the comment).

::: bad :::

```js
// $FlowFixMe
```

```js
// $FlowFixMe: typedefs for this function is wrong
```

```js
/* istanbul ignore if */
```

```js
// eslint-disable-next-line no-alert
```

::: good :::

```js
// $FlowFixMe: The typings for this method are out of date. TODO: Use new version when released (MYJIRA-1234)
```

```js
/* istanbul ignore if: sanity check for garbage input */
```

```js
// TODO(MYJIRA-1234): Create and use a design system modal component. For now, we're using alert :(
// eslint-disable-next-line no-alert
```

Tips:

- [Include a sample stack trace so readers can understand the failure case, and to make it searchable](https://programming.protips.wiki/provide-typechecker-errors/)
- If your project uses a bug tacker or GitHub issues, create or link to a ticket in the description

## Why?

Without a description, it may not be obvious to the reader of the code why the
line is being suppressed, and if or when in the future it can be removed.

Suppression statements are powerful and can mask buggy code that would otherwise
be caught - it's usually good to communicate why it's being used, so readers of
the code can understand the tradeoff and the need for employing it.
