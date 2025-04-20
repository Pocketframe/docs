---
sidebar_position: 9
---

# CSRF Protection

### Introduction

Cross-site request forgeries are a type of malicious exploit whereby unauthorized action is performed on behalf of the user. In other words, a user is tricked into submitting a malicious form without their knowledge. By default, Pocketframe includes a middleware that will protect your application against cross-site request forgeries.

### Preventing CSRF Attacks
To prevent CSRF attacks, you should include a CSRF token in all your forms. You can generate a CSRF token using the `@csrf` helper function.

```html showLineNumbers
<form method="POST" action="/profile">
    @csrf

</form>
```

:::info
If you are using a framework like Vue or React, you should not use the `@csrf` helper function. Instead, you should use the `_token()` helper function. This will generate a CSRF token that is unique to the current user.
:::

