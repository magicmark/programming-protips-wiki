---
title: Give a reason when using suppression statements
tags: ['types', 'linter']
---

Add a description to suppression statements used to silence warnings from linters
and type checkers to show us _why_ it's being silenced.

Give us enough information to verify. Comments like "x is wrong" without any detail
means we have to trust humans, and aren't able to easily verify over time if that
assumption has changed. Link to a stack trace in a JIRA ticket or pastebin if
appropriate.

**Bad Examples**

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

**Prefer**

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

- Include a sample stack trace so readers can understand the failure case, and to make it searchable
- If your project uses a bug tacker or GitHub issues, create or link to a ticket in the description

## Why?

Without a description, it may not be obvious to the reader of the code why the
line is being suppressed, and if or when in the future it can be removed.

Suppression statements are powerful and can mask buggy code that would otherwise
be caught - it's usually good to communicate why it's being used, so readers of
the code can understand the tradeoff and the need for employing it.
