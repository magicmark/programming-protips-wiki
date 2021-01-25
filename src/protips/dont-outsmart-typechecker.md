---
title: Don't try and outsmart the type checker
tags: ['types']
---

When the type checker (e.g. Flow or TypeScript) complains about an issue, try and
fix the underlying issue first. Ignore directives should be used sparingly - as a
last resort.

**Bad Example**

```typescript
type Movie = {
  title: string;
  releaseDate: Date;
  rating: number | null;
};

async function getMovieRating(id: number): Promise<number> {
  const details: Movie = await fetchMovieDetails(id);

  // @ts-ignore: Type 'number | null' is not assignable to type 'number'
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

When the type checker complains about an issue, it's probably correct. In most
cases, it's warning you about a potential runtime error - in this case, perhaps
the movie hasn't been released yet, and therefore hasn't been assigned a rating.

(In general, we can't "trust" data that comes from "the outside world" - e.g. the
network, parsing files on disk etc. Using [guards](guards) or [schemas](ajv) may
help here.)

[guards]: https://programming.protips.wiki/return-early/
[ajv]: https://github.com/ajv-validator/ajv

In other cases, the type checker may complain due to some configuration error, or
it can't find the types for an imported module. In such cases, it's usually worth
spending some time trying to debug the issue. Popular type checkers such as Flow
and TypeScript are well battle-tested - most error scenarios you could run into
have probably been discussed before. You may be able to solve it with a quick
[googling of the stack trace](how-to-google), searching StackOverflow etc - and
avoid the nasty @ts-ignore!

[how-to-google]: https://dev.to/swyx/how-to-google-your-errors-2l6o