import { AuthenticateUserService } from '@/application/services/authenticate-user-service'
import { mock, MockProxy } from 'jest-mock-extended'
import faker from 'faker'
import { LoadGithubUser } from '@/domain/contracts/gateways/load-github-user'
import { SaveWithGithub } from '@/domain/contracts/repos/user-account'
import { TokenGenerator } from '@/domain/contracts/gateways/token'
import { AccessToken } from '@/domain/entities/access-token'

describe('AuthenticateUserService', () => {
  let code: string
  let loadGithubUser: MockProxy<LoadGithubUser>
  let saveWithGithub: MockProxy<SaveWithGithub>
  let tokenGenerator: TokenGenerator
  let sut: AuthenticateUserService
  let fakeGithubAccount: LoadGithubUser.Output
  let fakeUser: SaveWithGithub.Output

  beforeAll(() => {
    loadGithubUser = mock()
    saveWithGithub = mock()
    tokenGenerator = mock()
  })

  beforeEach(() => {
    fakeGithubAccount = {
      id: faker.datatype.number(),
      login: faker.internet.email(),
      avatar_url: faker.image.avatar(),
      name: faker.name.findName()
    }
    fakeUser = {
      id: faker.datatype.number(),
      github_id: fakeGithubAccount.id,
      login: fakeGithubAccount.login,
      avatar_url: fakeGithubAccount.avatar_url,
      name: fakeGithubAccount.name
    }
    code = faker.datatype.string()
    loadGithubUser.load.mockResolvedValue(fakeGithubAccount)
    saveWithGithub.save.mockResolvedValue(fakeUser)

    sut = new AuthenticateUserService(
      loadGithubUser,
      saveWithGithub,
      tokenGenerator)
  })

  test('should call LoadGithubUser with correct input', async () => {
    await sut.auth({ code })

    expect(loadGithubUser.load).toHaveBeenCalledWith({ code })
  })

  test.todo('should throw AuthenticateError if LoadGithubUser return undefined')

  test('should call SaveWithGithub with correct input', async () => {
    await sut.auth({ code })

    expect(saveWithGithub.save).toHaveBeenCalledWith({
      github_id: fakeGithubAccount.id,
      login: fakeGithubAccount.login,
      name: fakeGithubAccount.name,
      avatar_url: fakeGithubAccount.avatar_url
    })
  })

  test('should call TokenGenerator with correct input', async () => {
    await sut.auth({ code })

    expect(tokenGenerator.generate).toHaveBeenCalledWith({
      key: fakeUser.id.toString(),
      expirationInMs: AccessToken.expirationInMs
    })
  })
})
