---
title: Link to code and docs with permalinks where possible
tags: []
---

When linking to a file or line of code on GitHub, SourceGraph, include the SHA to
make it a permalink.

## Why?

Source code changes over time, and line numbers may change. The file you're
linking to may even be deleted! In order to ensure that your link works over
time, **always use permalinks where available**.

Even if it's only a comment in JIRA or a quick slack message, it's still
good practice to get in the habit of always copying permalinks. You never know
when you might need to go back and reference a link you posted a while ago.

::: bad :::

```text
https://github.com/facebook/react/blob/master/packages/react/src/ReactElement.js#L54
```

::: good :::

```text
https://github.com/facebook/react/blob/ea155e2267b3/packages/react/src/ReactElement.js#L54
```

::: note 💡 Tip

Git SHAs can be shortened to just a few characters. So this:

`https://github.com/facebook/react/blob/ea155e2267b3e4fd958d174f8f0e2b09b1c8ecf/packages/react/src/ReactElement.js`

...can be condensed to:

`https://github.com/facebook/react/blob/ea155e22/packages/react/src/ReactElement.js#L54`

See more: <https://stackoverflow.com/a/18134919/4396258>
:::
