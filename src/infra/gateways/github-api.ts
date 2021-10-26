import { LoadGithubUser } from '@/domain/contracts/gateways/load-github-user'
import { HttpGetClient, HttpPostClient } from '@/infra/gateways/client'

type IAccessTokenResponse = {
  access_token: string
}

type IUserResponse = {
  id: number
  name: string
  login: string
  avatar_url: string
}

export class GitHubApi implements LoadGithubUser {
  constructor (
    private readonly postClient: HttpPostClient,
    private readonly getClient: HttpGetClient,
    private readonly clientId: string,
    private readonly clientSecret: string
  ) {}

  async load ({ code }: LoadGithubUser.Input): Promise<LoadGithubUser.Output> {
    return this.getUserInfo(code)
      .then(({ login, id, avatar_url, name }) => ({
        login,
        id,
        avatar_url,
        name
      }))
      .catch(() => undefined)
  }

  private async getAccessToken (code: string): Promise<IAccessTokenResponse> {
    const url = 'https://github.com/login/oauth/access_token'
    const params = { client_id: this.clientId, client_secret: this.clientSecret, code }

    return this.postClient.post<IAccessTokenResponse>({ url, body: null, params })
  }

  private async getUserInfo (code: string): Promise<IUserResponse> {
    const accessToken = (await this.getAccessToken(code)).access_token
    const url = 'https://api.github.com/user'
    const headers = {
      authorization: 'Bearer ' + accessToken
    }

    return this.getClient.get<IUserResponse>({ url, params: null, headers })
  }
}
