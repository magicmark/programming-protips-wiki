---
title: Use custom errors for error handling and control flow
tags: ['error-handling']
---

If we're explicitly throwing an error, that usually indicates it's a "known"
error state - for example, disallowing a bad user input. We can assume that
the calling code may want to handle these error states in a specific way.

It's especially important for reusable library code to do this, where we may not
be able to anticipate how callsites will need to handle errors from the library.

More generally, we can use custom errors to help with control flow in order to
handle different kinds of errors differently.

_(This pairs well with [limit-what-you-catch](../limit-what-you-catch/))._

**Bad Example**

```javascript
// Map movie name to id
const MOVIE_SEARCH_MAP = {
  'Star Wars': 1,
  'Toy Story': 2,
  'Die Hard': 3,
};

function getMovieRating(name) {
  const id = MOVIE_SEARCH_MAP[name];
  if (!id) {
    throw new Error(`Could not find movie with name ${name}!`);
  }

  const result = fetchMovieDetails(id);

  return result.reviewInfo.rating;
}
```

**Prefer**

```typescript
// Map movie name to id
const MOVIE_SEARCH_MAP = {
  'Star Wars': 1,
  'Toy Story': 2,
  'Die Hard': 3,
};

/**
 * A custom error class to be thrown when the user tries to find a movie that
 * doesn't exist in our database.
 *
 * This is exported so callsites can catch this error specifically.
 *
 * @see
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
 */
export class MovieNotFound extends Error {
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MovieNotFound);
    }

    this.name = 'MovieNotFound';
  }
}

function getMovieRating(name) {
  const id = MOVIE_SEARCH_MAP[name];
  if (!id) {
    throw new MovieNotFound(`Could not find movie with name ${name}!`);
  }

  const result = fetchMovieDetails(id);

  return result.reviewInfo.rating;
}
```

## Why?

Imagine we want to display a nice UI when the user tries to search for a movie
that doesn't exist.

With our **first example**, we might write something like this:

```js
function main(movieName) {
  try {
    console.log(`The rating for ${movieName} is: ${getMovieRating(movieName)}`);
  } catch (e) {
    // Display some UI specifically when the user input is bad
    console.error(`${movieName} doesn't exist in our database! :( Try again!`);
    console.error(e);
    process.exit(1);
  }
}
```

However, this suffers from [limit-what-you-catch](../limit-what-you-catch/).

There are many things that could potentially throw inside `getMovieRating`,
such as the request in `fetchMovieDetails`, or the property traversal of the
result object.

In the first example, **there's no great way to catch this error specifically**
since it throws a generic error.

(Yes, we could test the contents of the error message, but this may be brittle
due to being localized, changed between versions etc.)

With our **second example**, we can use `instanceof` to test for our custom error
class:

```js
function main(movieName) {
  try {
    console.log(`The rating for ${movieName} is: ${getMovieRating(movieName)}`);
  } catch (e) {
    if (e instanceof MovieNotFound) {
      // Display some UI specifically when the user input is bad
      console.error(`${movieName} doesn't exist in our database! :( Try again!`);
    }
    console.error(e);
    process.exit(1);
  }
}
```
