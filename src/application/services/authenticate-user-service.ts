import { LoadGithubUser } from '@/domain/contracts/gateways/load-github-user'
import { SaveWithGithub } from '@/domain/contracts/repos/user-account'
import { Authenticate } from '@/domain/usecases/authenticate'

export class AuthenticateUserService implements Authenticate {
  constructor (
    private readonly loadGithubUser: LoadGithubUser,
    private readonly saveWithGithub: SaveWithGithub
  ) {}

  async auth ({ code }: Authenticate.Input): Promise<Authenticate.Output> {
    const { id, login, avatar_url, name } = await this.loadGithubUser.load({ code })

    await this.saveWithGithub.save({
      github_id: id,
      login,
      name,
      avatar_url
    })

    return null
  }
}
