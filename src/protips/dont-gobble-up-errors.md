---
title: Do not gobble up errors
tags: ['error-handling']
---

Don't silently gobble up errors. If an error occurs, ensure it's logged and handled appropriately.

In many cases, letting an error bubble up is better than a try/catch block which incorrectly "handles" the error.

::: bad :::

```js
function getTraceId(request) {
  try {
    return request['trace_id'];
  } catch (e) {
    return null;
  }
}
```

😱 `null` is not actually a valid value! Assuming that requests should _always_ have a trace id,
this is a fatal error and should be allowed to bubble and crash the request.

::: good :::

```js
function getTraceId(request) {
  try {
    return request['trace_id'];
  } catch (e) {
    throw new Error('Could not find the trace id', { cause: e });
  }
}
```

::: good Also good :::

The try/catch above doesn't actually add much. Just let it fail!

```js
function getTraceId(request) {
  return request['trace_id'];
}
```

## Why?

In our example, `null` is not a sementically valid value, and may cause undefined behaviour and other errors later on in the app.

Catching the error and returning `null` silently gobbles up the original error. We have no way of knowing this error occured; no error is thrown, no logs are generated.
