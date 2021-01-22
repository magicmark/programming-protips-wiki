---
title: Only pass what you need to functions.
tags: []
---

Avoid passing huge objects or unnecessary arguments to functions. Only pass what
the function really needs.

**Bad Example**

```js
async function getFormattedName(context, id) {
  // Fetch the user object
  const user = await context.loaders.user.load(id);

  // e.g. returns "H. Simpson"
  return `${user.firstName.slice(0, 1)}. ${user.lastName}`;
}

getFormattedName(context, 4);
```

**Prefer**

```js
function getFormattedName(user) {
  // e.g. returns "H. Simpson"
  return `${user.firstName.slice(0, 1)}. ${user.lastName}`;
}

getFormattedName(await context.loaders.user.load(4));
```

## Why?

In the first example, we pass a GraphQL 'context' object, which may contain tens
or hundreds of other unrelated key/values. But our function only needs to call
one function contained within.

Passing the entire context object is bad because:

- It's harder to unit test `getFormattedName` - you'd need to conjure up a whole
  context object in the right structure.
- We expose `getFormattedName` to lots of other unrelated stuff we doesn't care
  about. It has to crawl through the context object, and call the
  `context.loaders.user.load` method, violating the [single responsibility
  principle](https://www.google.com/search?q=function+single+responsibility+principle)

(We could even simplify the signature of `getFormattedName` further, so as to not
take in the whole user object - e.g. `getFormattedName(firstName, lastName)`.)