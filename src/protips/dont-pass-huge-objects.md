---
title: Don't pass huge monolithic objects to helper functions
tags: []
---

Avoid passing around huge, monolithic objects around to helper functions. Only
pass what the function really needs.

::: bad :::

```typescript
// A GraphQL 'context' object
interface Context {
  request: Request;
  headers: Headers;
  settings: AppSettings;
  loaders: DataLoaders;
  zipkinTracer: Tracer;
  // ...
  // ...
  // ... lots more items
  // ...
}

async function getFormattedName(context: Context, id: number): string {
  // Fetch the user object
  const user = await context.loaders.user.load(id);

  // e.g. returns "H. Simpson"
  return `${user.firstName.slice(0, 1)}. ${user.lastName}`;
}

getFormattedName(context, 4);
```

::: good :::

```js
function getFormattedName(user: User): string {
  // e.g. returns "H. Simpson"
  return `${user.firstName.slice(0, 1)}. ${user.lastName}`;
}

getFormattedName(await context.loaders.user.load(4));
```

## Why?

In the first example, we pass a [GraphQL 'context' object][context], which may
contain tens or hundreds of other unrelated key/values. But our
`getFormattedName` function only needed to call one function nested within.

[context]: https://graphql.org/learn/execution/#root-fields-resolvers

Passing the entire object is bad because:

- It's harder to unit test `getFormattedName` - you'd need to conjure up a whole
  context object in the right structure.
- Generally speaking, we expose `getFormattedName` to lots of other unrelated stuff we don't care
  about. It has to crawl through the context object, and call the
  `context.loaders.user.load` method, violating the [single responsibility
  principle](https://www.google.com/search?q=function+single+responsibility+principle)

(We could even simplify the signature of `getFormattedName` further, so as to not
take in the whole user object - e.g. `getFormattedName(firstName, lastName)`.)
