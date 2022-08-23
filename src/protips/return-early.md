---
title: Return early from a function when checking initial conditions
tags: []
---

When conditionally executing logic in a function based on some initial
condition(s), consider returning early.

[Guards][guard] implement this pattern.

[guard]: https://en.wikipedia.org/wiki/Guard_(computer_science)

::: bad :::

```js
function getConfigOption(filePath, key) {
  if (typeof filePath === 'string') {
    const contents = fs.readFileSync(filePath, 'utf8');
    const configJson = JSON.parse(contents);
    return configJson[key];
  } else {
    throw new Error('No config file path was supplied');
  }
}
```

::: good :::

```js
function getConfigOption(filePath, key) {
  if (!filePath) {
    throw new Error('No config file path was supplied');
  }

  const contents = fs.readFileSync(filePath, 'utf8');
  const configJson = JSON.parse(contents);
  return configJson[key];
}
```

By returning (or throwing!) early, we reduce the level of nesting for the rest of
the function, improving readability.

You can write multiple guards at the top of the function:

```js
function getConfigOption(filePath, key) {
  assert(typeof filePath === 'string', 'config file path must be supplied');
  assert(typeof key === 'string', 'config key must be supplied');

  const contents = fs.readFileSync(filePath, 'utf8');
  const configJson = JSON.parse(contents);
  return configJson[key];
}
```

**Note:** This doesn't advocate for randomly returning in the _middle_ of a
function - which would be somewhat chaotic :)

Further reading:

- <https://wiki.c2.com/?GuardClause>
- <https://forum.freecodecamp.org/t/the-return-early-pattern-explained-with-javascript-examples/19364>
- <https://www.google.com/search?q=return+early>
