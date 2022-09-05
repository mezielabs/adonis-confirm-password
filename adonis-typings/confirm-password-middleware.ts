declare module '@ioc:Mezielabs/ConfirmPasswordMiddleware' {
  import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

  export interface ConfirmPasswordMiddlewareContract {
    new (): {
      handle(ctx: HttpContextContract, next: () => Promise<void>): any
    }
  }

  const ConfirmPasswordMiddleware: ConfirmPasswordMiddlewareContract

  export default ConfirmPasswordMiddleware
}
