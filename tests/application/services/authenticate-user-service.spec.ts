import { AuthenticateUserService } from '@/application/services/authenticate-user-service'
import { mock, MockProxy } from 'jest-mock-extended'
import faker from 'faker'
import { LoadGithubUser } from '@/domain/contracts/gateways/load-github-user'

describe('AuthenticateUserService', () => {
  let code: string
  let loadGithubUser: MockProxy<LoadGithubUser>
  let sut: AuthenticateUserService
  beforeAll(() => {
    loadGithubUser = mock()
  })

  beforeEach(() => {
    code = faker.datatype.string()
    sut = new AuthenticateUserService(loadGithubUser)
  })

  test('should call LoadGithubUser with correct input', async () => {
    await sut.auth({ code })

    expect(loadGithubUser.load).toHaveBeenCalledWith({ code })
  })

  test.todo('should throw AuthenticateError if LoadGithubUser return undefined')
})
