import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class ConfirmPasswordProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    const config = this.app.container
      .resolveBinding('Adonis/Core/Config')
      .get('confirm-password', {})

    this.app.container.singleton('Mezielabs/ConfirmPassword', () => {
      const { ConfirmPassword } = require('../src/ConfirmPassword')

      return new ConfirmPassword(config)
    })

    this.app.container.bind('Mezielabs/ConfirmPasswordMiddleware', () => {
      const { ConfirmPasswordMiddleware } = require('../src/middleware/ConfirmPasswordMiddleware')

      return new ConfirmPasswordMiddleware(config)
    })
  }
}
