import { AuthenticateController } from '@/application/controllers/authenticate-controller'
import { AuthenticateUserService } from '@/application/services/authenticate-user-service'
import faker from 'faker'
import { mock, MockProxy } from 'jest-mock-extended'

const mockRequest = (): AuthenticateController.Request => ({
  code: faker.datatype.string()
})

describe('AuthenticateController', () => {
  let sut: AuthenticateController
  let authenticateUserService: MockProxy<AuthenticateUserService>

  beforeAll(() => {
    authenticateUserService = mock()
  })

  beforeEach(async () => {
    sut = new AuthenticateController(authenticateUserService)
  })

  test('should call Authenticate with correct values', async () => {
    const request = mockRequest()
    await sut.handle(request)

    expect(authenticateUserService.auth).toHaveBeenCalledWith(request)
  })
})
