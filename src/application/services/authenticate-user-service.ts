import { LoadGithubUser } from '@/domain/contracts/gateways/load-github-user'
import { TokenGenerator } from '@/domain/contracts/gateways/token'
import { SaveWithGithub } from '@/domain/contracts/repos/user-account'
import { AccessToken } from '@/domain/entities/access-token'
import { Authenticate } from '@/domain/usecases/authenticate'

export class AuthenticateUserService implements Authenticate {
  constructor (
    private readonly loadGithubUser: LoadGithubUser,
    private readonly saveWithGithub: SaveWithGithub,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  async auth ({ code }: Authenticate.Input): Promise<Authenticate.Output> {
    const { id, login, avatar_url, name } = await this.loadGithubUser.load({ code })

    const user = await this.saveWithGithub.save({
      github_id: id,
      login,
      name,
      avatar_url
    })

    const accessToken = await this.tokenGenerator.generate({ key: user.id.toString(), expirationInMs: AccessToken.expirationInMs })

    return { accessToken, user }
  }
}
