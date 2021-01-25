---
title: Return early from a function when checking initial conditions
tags: []
---

When conditionally executing logic in a function based on some initial
condition(s), consider returning early.

[Guards][guard] implement this pattern.

[guard]: https://en.wikipedia.org/wiki/Guard_(computer_science)

**Bad Example**

```js
function parseConfigFile(filePath) {
  if (typeof filePath === 'string') {
    const contents = fs.readFileSync(filePath, 'utf8');
    const configJson = JSON.parse(contents);
    const { projectName } = configJson;
    // ...
    // ...
    // ... more function logic
    // ...
    return configJson;
  } else {
    throw new Error('No config file path was supplied');
  }
}
```

**Prefer**

```js
function parseConfigFile(filePath) {
  if (!filePath) {
    throw new Error('No config file path was supplied');
  }

  const contents = fs.readFileSync(filePath, 'utf8');
  const configJson = JSON.parse(contents);
  const { projectName } = configJson;
  // ...
  // ...
  // ... more function logic
  // ...
  return configJson;
}
```

By returning (or throwing!) early, we reduce the level of nesting for the rest of
the function, improving readability.

You can write multiple guards (not _too_ many!) at the top of the function when
checking inputs.

**Note:** This doesn't advocate for randomly returning in the _middle_ of a
function - which would be somewhat chaotic :)

Further reading:

- <https://www.google.com/search?q=return+early>
