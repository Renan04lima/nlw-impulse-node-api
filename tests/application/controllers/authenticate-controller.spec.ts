import { AuthenticateController } from '@/application/controllers/authenticate-controller'
import { ok, serverError } from '@/application/helpers/http'
import { AuthenticateUserService } from '@/application/services/authenticate-user-service'
import { UserAccount } from '@/domain/entities/user-account'
import faker from 'faker'
import { mock, MockProxy } from 'jest-mock-extended'

const mockRequest = (): AuthenticateController.Request => ({
  code: faker.datatype.string()
})

describe('AuthenticateController', () => {
  let sut: AuthenticateController
  let authenticateUserService: MockProxy<AuthenticateUserService>
  let fakerUser: UserAccount

  beforeAll(() => {
    authenticateUserService = mock()
    fakerUser = {
      id: 1,
      avatar_url: 'any_url',
      github_id: 1,
      login: 'any_login',
      name: 'any_name'
    }
  })

  beforeEach(async () => {
    authenticateUserService.auth.mockResolvedValue({
      accessToken: 'any_token',
      user: fakerUser
    })
    sut = new AuthenticateController(authenticateUserService)
  })

  test('should call Authenticate with correct values', async () => {
    const request = mockRequest()
    await sut.handle(request)

    expect(authenticateUserService.auth).toHaveBeenCalledWith(request)
  })

  test('should return 500 on infra error', async () => {
    const error = new Error('infra_error')
    authenticateUserService.auth.mockRejectedValueOnce(error)
    const result = await sut.handle(mockRequest())

    expect(result).toEqual(serverError(error))
  })

  test('should return 200 on success', async () => {
    const result = await sut.handle(mockRequest())

    expect(result).toEqual(ok({
      accessToken: 'any_token',
      user: fakerUser
    }))
  })
})
