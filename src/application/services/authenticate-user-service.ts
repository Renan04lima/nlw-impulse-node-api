import { LoadGithubUser } from '@/domain/contracts/gateways/load-github-user'
import { Authenticate } from '@/domain/usecases/authenticate'

export class AuthenticateUserService implements Authenticate {
  constructor (private readonly loadGithubUser: LoadGithubUser) {}
  async auth ({ code }: Authenticate.Input): Promise<Authenticate.Output> {
    await this.loadGithubUser.load({ code })
    return null
  }
}
