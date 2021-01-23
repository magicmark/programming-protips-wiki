---
title: Avoid making network requests in unit tests
tags: ['testing']
---

Don't make network requests in unit tests.

**Bad Example**

```js
function logEvent(event, payload) {
  fetch('https://logging.internal.mycorp.com/log_event', {
    method: 'POST',
    body: JSON.stringify({ event, payload }),
  });
}

function rollDice() {
  const result = Math.floor(Math.random() * 6) + 1;
  logEvent('user_rolled_dice', { date: Date.now() });

  return result;
}

expect(rollDice()).toBeLessThanOrEqual(6);
```

**Prefer**

```js
function rollDice(_logEvent = logEvent) {
  const result = Math.floor(Math.random() * 6) + 1;
  _logEvent('user_rolled_dice', { date: Date.now() });

  return result;
}

expect(rollDice(jest.fn())).toBeLessThanOrEqual(6);
```

_Check out <https://github.com/magicmark/jest-how-do-i-mock-x> for more ways to
mock out functions in Jest._

## Why?

Unit tests should not make network requests - even by some deeply nested
function. The network should be mocked out, or replaced by a stub if you need to
check calls to it.

Making network requests implies a server needs to be running, in order to
successfully fulfil the request. This is usually the domain of End to End (E2E)
tests, Integration Tests or Acceptance Tests.

Even if we don't care about the response from the server, we may have to deal
with slow requests due to timeouts, the test process not shutting down gracefully
because it's awaiting a network response etc.

See more:

- <https://kentcdodds.com/blog/unit-vs-integration-vs-e2e-tests>
