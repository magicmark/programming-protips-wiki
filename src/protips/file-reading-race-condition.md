---
title: Don't check if a file exists before reading it
tags: ['file-system', 'error-handling', 'race-condition']
---

Don't check if a file exists before reading it - just read it, and use a
try/catch block to handle the case where the file doesn't exist.

**Bad Example**

```js
function getConfig(configPath) {
  if (!fs.existsSync(configPath)) {
    throw new Error(`Could not read config. Expected ${configPath} to exist`);
  }

  return fs.readFileSync(configPath, 'utf8');
}
```

**Prefer**

```js
function getConfig(configPath) {
  try {
    return fs.readFileSync(configPath, 'utf8');
  } catch (e) {
    return new AggregateError([`Could not read config file: ${configPath}`, e]);
  }
}
```

## Why?

The second example protects against race conditions causing a bug. It's possible
that the file could appear/disappear in between checking the existance of the
file and reading it.

This general coding style is known as ["Easier to ask for forgiveness than
permission" (EAFP)](https://docs.python.org/3.5/glossary.html#term-eafp).

### Further reading

- <https://en.wikipedia.org/wiki/Time-of-check_to_time-of-use>
- <https://stackoverflow.com/a/56036903>
