---
title: Avoid hidden or implicit dependencies between modules
tags: []
---

Avoid "hidden dependencies" - aka "_implicit dependencies_" between different
packages or parts of the codebase.

**Bad Example**

```js

```

In an application,
```js
app.use((req, res, next) => {
  // Grab the planet specified from the request
  const planet = req.headers['x-user-planet'];

  next();
});
```

prior art:

https://blog.thecodewhisperer.com/permalink/the-pain-of-implicit-dependencies
