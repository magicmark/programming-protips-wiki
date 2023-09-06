---
title: Don't try and outsmart the linter
tags: ['supression-statements']
---

If the linter (e.g. eslint) complains at you, try and fix the underlying issue before using a supression statement.

If it's complaining at you, it's warning you about what it thinks is bad code - which we're expected to actually fix, and not just ignore :)

You can always google the rule (e.g. [no-unused-vars](https://eslint.org/docs/latest/rules/no-unused-vars)) to learn more about why it's complaining, and how to resolve.

If you decide that in your case, the rule doesn't apply and there's a legimate reason for supressing - that's totally cool! Be sure to follow [give-reason-for-suppression](https://programming.protips.wiki/give-reason-for-suppression/) :D
