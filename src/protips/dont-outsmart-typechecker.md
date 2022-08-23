---
title: Don't try and outsmart the typechecker
tags: ['types']
---

When the type checker (e.g. Flow or TypeScript) complains about an issue, try and
fix the underlying issue first. Ignore directives should be used sparingly - as a
last resort.

Consider the following [express][express] middleware to log how long the logic
layer in a request took:

[express]: https://expressjs.com/

::: bad :::

```js
app.use(function (req, res, next) {
  const { logicStart, logicEnd } = res.locals;

  // $FlowFixMe: logicStart and logicEnd are numbers
  const logicLayerTime = logicEnd - logicStart;
  console.log(`Time take for the logic layer: ${logicLayerTime}`);

  next();
});
```

::: good :::

```js
app.use(function (req, res, next) {
  const { logicStart, logicEnd } = res.locals;

  assert(typeof logicStart === 'number');
  assert(typeof logicEnd === 'number');

  const logicLayerTime = logicEnd - logicStart;
  console.log(`Time take for the logic layer: ${logicLayerTime}`);

  next();
});
```

Our middleware has an implicit dependency on someone else, somewhere else, in the
application setting values for `res.locals.logicStart` and `res.locals.logicEnd`.

If for whatever reason we never set those values (i.e. a bug), both values be
`null`. Which is particularly nasty for us, because when we come to do our
calculation for logging, `null - null` [coerces][coercion] to `0`! Which means
we'd happily continue, logging 0 as a 'valid' value for the time taken.

We'd never get an error, and it would be hard to notice this! 😱

[coercion]: https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion

The type checker is generally much smarter than us dumb humans :)

## Why

When the type checker complains about an issue, it's probably correct. In most
cases, it's warning you about a potential runtime error. In this case, perhaps
the movie hasn't been released yet, and therefore hasn't been assigned a rating.

In general, we can't "trust" data that comes from "the outside world" (the network,
parsing files on disk etc). Using [guards][guards] or [schemas](ajv) may help here.

[guards]: /return-early/
[ajv]: https://github.com/ajv-validator/ajv

In other cases, the type checker may complain due to some configuration error, or
it can't find the types for an imported module. In such cases, it's usually worth
spending some time trying to debug the issue. Popular type checkers such as Flow
and TypeScript are well battle-tested - most error scenarios you could run into
have probably been discussed before. You may be able to solve it with a quick
[googling of the stack trace][how-to-google], searching StackOverflow etc - and
avoid the nasty `@ts-ignore`!

[how-to-google]: https://dev.to/swyx/how-to-google-your-errors-2l6o

## More examples

**Bad Example**

```typescript
type Movie = {
  title: string;
  releaseDate: Date;
  rating: number | null;
};

async function getMovieRating(id: number): Promise<number> {
  const details: Movie = await fetchMovieDetails(id);

  // @ts-ignore: rating will always be not null!
  return details.rating;
}
```

**Prefer**

```typescript
type Movie = {
  title: string;
  releaseDate: Date;
  rating: number | null;
};

async function getMovieRating(id: number): Promise<number> {
  const details: Movie = await fetchMovieDetails(id);

  if (!details.rating) {
    throw new Error('Movie does not yet have a rating!');
  }

  return details.rating;
}
```

If there really is a bad definition from a library that needs fixing or
updating, consider pulling the new version of the library or attempting the fix.

If that's something you want to punt on for later, make a ticket or GitHub issue
that includes a sample stack trace, and link to it in the comment so other folks
can understand why the ignore comment is being used, and when it can be removed.

e.g.

```js
// $FlowFixMe: MYJIRA-1234 foo exists in the bar object, but the typedefs for MyBarLibrary aren't up to date yet.
const { foo } = bar;
```
