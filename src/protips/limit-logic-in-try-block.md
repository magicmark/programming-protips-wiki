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

There's _lots_ of things could throw inside our original try block. We may accidentally silence and ignore unrelated errors.

(e.g. Maybe the config file _was_ found, but `scanPaths` wasn't specified - so `scanPaths.forEach` throws, but we silenced it! Uh oh!)
