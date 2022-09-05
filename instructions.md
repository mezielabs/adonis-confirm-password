The package has been configured successfully. Make sure to register the `ConfirmPasswordMiddleware` inside the `start/kernel.ts` file:

```ts
Server.middleware.registerNamed({
  confirmPassword: () => import('@ioc:Mezielabs/ConfirmPasswordMiddleware')
})
```
