import { AuthenticateController } from '@/application/controllers/authenticate-controller'
import { AuthenticateSpy } from '@/tests/application/mocks/mock-authenticate-usecase'
import faker from 'faker'

const mockRequest = (): AuthenticateController.Request => ({
  code: faker.datatype.string()
})

type SutTypes = {
  sut: AuthenticateController
  authenticateSpy: AuthenticateSpy
}

const makeSut = (): SutTypes => {
  const authenticateSpy = new AuthenticateSpy()
  const sut = new AuthenticateController(authenticateSpy)
  return {
    sut,
    authenticateSpy
  }
}

describe('AuthenticateController', () => {
  test('should call Authenticate with correct values', async () => {
    const { sut, authenticateSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)

    expect(authenticateSpy.params).toEqual(request)
  })
})
