import { SaveWithGithub } from '@/domain/contracts/repos/user-account'
import { Repository } from '@/infra/repos/postgres/repository'

export class PgUserAccountRepository extends Repository implements SaveWithGithub {
  async save (input: SaveWithGithub.Input): Promise<SaveWithGithub.Output> {
    let user = await this.prisma.user.findFirst({
      where: {
        github_id: input.github_id
      }
    })
    if (!user) {
      user = await this.prisma.user.create({
        data: input
      })
    }
    return user
  }
}
