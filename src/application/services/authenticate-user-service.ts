import { Authenticate } from '@/domain/usecases/authenticate'
import { HttpPostClient } from '@/infra/gateways/client'
import { env } from '@/main/config/env'

export class AuthenticateUserService implements Authenticate {
  constructor (
    private readonly postClient: HttpPostClient
  ) {}

  async auth ({ code }: Authenticate.Input): Promise<Authenticate.Output> {
    const url = 'https://github.com/login/oauth/access_token'
    const { clientId, clientSecret } = env.github
    const params = { client_id: clientId, client_secret: clientSecret, code }
    await this.postClient.post({ url, body: null, params })
    return null
  }
}
