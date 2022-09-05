import * as sinkStatic from '@adonisjs/sink'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { join } from 'path'

type InstructionsState = {
  sessionKeyName: string
  passwordTimeout: number
  redirectTo: string
}

function getStub(...relativePaths: string[]) {
  return join(__dirname, 'templates', ...relativePaths)
}

function makeConfig(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic,
  state: InstructionsState
) {
  const configDirectory = app.directoriesMap.get('config') || 'config'
  const configPath = join(configDirectory, 'confirm-password.ts')

  const template = new sink.files.MustacheFile(
    projectRoot,
    configPath,
    getStub('config/confirm-password.txt')
  )

  if (template.exists()) {
    sink.logger.action('create').skipped(`${configPath} file already exists`)
  } else {
    template.apply(state).commit()

    sink.logger.action('create').succeeded(configPath)
  }
}

async function getSessionKeyName(sink: typeof sinkStatic) {
  return sink.getPrompt().ask('Enter session key name', {
    validate(value) {
      return !!value.trim().length
    },
  })
}

async function getPasswordTimeout(sink: typeof sinkStatic) {
  return sink.getPrompt().ask('Enter confirm password timeout', {
    validate(value) {
      return !!value.trim().length
    },
  })
}

async function getRedirectTo(sink: typeof sinkStatic) {
  return sink.getPrompt().ask('Enter confirm password failed redirect', {
    validate(value) {
      return !!value.trim().length
    },
  })
}

export default async function instructions(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic
) {
  const state: InstructionsState = {
    sessionKeyName: 'confirmed_password_at',
    passwordTimeout: 60,
    redirectTo: 'confirm-password',
  }

  state.sessionKeyName = await getSessionKeyName(sink)
  state.passwordTimeout = Number(await getPasswordTimeout(sink))
  state.redirectTo = await getRedirectTo(sink)

  makeConfig(projectRoot, app, sink, state)
}
