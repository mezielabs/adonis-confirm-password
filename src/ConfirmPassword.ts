import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import { SessionContract } from '@ioc:Adonis/Addons/Session'
import { ConfirmPasswordConfig } from '@ioc:Mezielabs/ConfirmPassword'
import { DateTime } from 'luxon'

export class ConfirmPassword {
  constructor(private confirmPasswordConfig: ConfirmPasswordConfig) {}

  public async confirm(
    auth: AuthContract,
    email: string,
    password: string,
    session: SessionContract
  ) {
    await auth.verifyCredentials(email, password)

    session.put(this.confirmPasswordConfig.sessionKeyName, DateTime.now().toSeconds())
  }
}
