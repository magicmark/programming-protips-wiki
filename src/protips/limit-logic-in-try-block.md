---
title: Limit the amount of logic in a try/catch block
tags: ['error-handling']
---

Keep the amount of logic in your try/catch blocks to a minimum.

**Bad Example**

```js
try {
  const config = yaml.safeLoad(fs.readFileSync(path.join(process.cwd(), configFile), 'utf8'));
  const { projectName, scanPaths } = config;
  const resolvedScanPaths = [];
  scanPaths.forEach(scanPath => {
    resolvedScanPaths.push(path.join(__dirname, scanPath));
  });
  ...
  ...
  27 lines later
  ...
} catch (e) {
  console.error('Could not read config file, assuming defaults.');
}
```

**Prefer**

```js
let config;

try {
  config = fs.readFileSync(path.join(process.cwd(), configFile), 'utf8');
} catch (e) {
  console.error('Could not read config file, assuming defaults.');
}
```

## Why?

There's _lots_ of things could throw inside our original try block. We may
accidentally silence and ignore unrelated errors.

For example, maybe the config file _was_ found, but `scanPaths` wasn't specified.
That would cause `scanPaths.forEach` to throw later on, but we would be silencing
it! Uh oh!

Avoid a giant "catch all" try block to avoid gobbling up errors.
