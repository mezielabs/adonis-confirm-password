declare module '@ioc:Mezielabs/ConfirmPassword' {
  import { AuthContract } from '@ioc:Adonis/Addons/Auth'
  import { SessionContract } from '@ioc:Adonis/Addons/Session'

  export interface ConfirmPasswordConfig {
    sessionKeyName: string
    passwordTimeout: number
    redirectTo: string
  }

  export interface ConfirmPasswordContract {
    confirm(
      auth: AuthContract,
      email: string,
      password: string,
      session: SessionContract
    ): Promise<any>
  }

  const ConfirmPassword: ConfirmPasswordContract

  export default ConfirmPassword
}
