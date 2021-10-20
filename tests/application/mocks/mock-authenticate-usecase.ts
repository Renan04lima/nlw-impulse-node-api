import { Authenticate } from '@/domain/usecases/authenticate'
import faker from 'faker'
export class AuthenticateSpy implements Authenticate {
  params: Authenticate.Input
  result = {
    user: {
      github_id: faker.datatype.uuid(),
      login: faker.name.firstName(),
      avatar_url: faker.image.imageUrl(),
      name: faker.name.findName()
    },
    accessToken: faker.datatype.string()
  }

  async auth (params: Authenticate.Input): Promise<Authenticate.Output> {
    this.params = params
    return this.result
  }
}
