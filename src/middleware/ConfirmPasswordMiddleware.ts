import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ConfirmPasswordConfig } from '@ioc:Mezielabs/ConfirmPassword'
import { DateTime } from 'luxon'

export class ConfirmPasswordMiddleware {
  constructor(private confirmPasswordConfig: ConfirmPasswordConfig) {}

  public async handle(
    { session, request, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    const confirmedAt = session.get(this.confirmPasswordConfig.sessionKeyName, 0)

    if (DateTime.now().toSeconds() - confirmedAt > this.confirmPasswordConfig.passwordTimeout) {
      session.put('intended_url', request.url())

      return response.redirect(this.confirmPasswordConfig.redirectTo)
    }

    await next()
  }
}
