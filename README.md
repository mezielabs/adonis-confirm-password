# adonis-confirm-password
> GitHub-like password confirmation.

[![npm-image]][npm-url] [![license-image]][license-url] [![typescript-image]][typescript-url]

Ensure users confirms their passwords before taking certain actions on your application.

## Installation

```bash
npm install @mezielabs/adonis-confirm-password
```
Then configure the package:

```bash
node ace configure @mezielabs/adonis-confirm-password
```

## Usage

Register the middleware:

```ts
Server.middleware.registerNamed({
  // ...other middlewares
  confirmPassword: () => import('@ioc:Mezielabs/ConfirmPasswordMiddleware'),
})
```

```ts
await ConfirmPassword.confirm(auth, auth.user!.email, request.input('password'), session)
```

[npm-image]: https://img.shields.io/npm/v/adonis-confirm-password.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/adonis-confirm-password "npm"

[license-image]: https://img.shields.io/npm/l/adonis-confirm-password?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md "license"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]:  "typescript"
