import { LoadGithubUser } from '@/domain/gateways/loadGithubUser'
import { HttpPostClient } from '@/infra/gateways/client'

type IAccessTokenResponse = {
  access_token: string
}

export class GitHubApi implements LoadGithubUser {
  constructor (
    private readonly postClient: HttpPostClient,
    private readonly clientId: string,
    private readonly clientSecret: string
  ) {}

  async load ({ code }: LoadGithubUser.Input): Promise<LoadGithubUser.Output> {
    await this.getAccessToken(code)
    return null
  }

  private async getAccessToken (code: string): Promise<IAccessTokenResponse> {
    const url = 'https://github.com/login/oauth/access_token'
    const params = { client_id: this.clientId, client_secret: this.clientSecret, code }

    return this.postClient.post<IAccessTokenResponse>({ url, body: null, params })
  }
}
