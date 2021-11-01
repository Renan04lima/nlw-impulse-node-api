import { forbidden, ok } from '@/application/helpers/http'
import { AuthMiddleware } from '@/application/middlewares'

describe('AuthMiddleware', () => {
  let sut: AuthMiddleware
  let authorize: jest.Mock
  let authorization: string

  beforeAll(() => {
    authorization = 'any_string'
    authorize = jest.fn().mockResolvedValue('any_user_id')
  })

  beforeEach(() => {
    sut = new AuthMiddleware(authorize)
  })
  test('should return 403 if authorization is null', async () => {
    const result = await sut.handle({ authorization: null as any })

    expect(result).toEqual(forbidden())
  })

  it('should return 403 if authorization is empty', async () => {
    const httpResponse = await sut.handle({ authorization: '' })

    expect(httpResponse).toEqual(forbidden())
  })

  it('should return 403 if authorization is undefined', async () => {
    const httpResponse = await sut.handle({ authorization: undefined as any })

    expect(httpResponse).toEqual(forbidden())
  })

  it('should call Authorize with correct input',async () => {
    await sut.handle({ authorization })

    expect(authorize).toHaveBeenCalledWith({ token: authorization })
    expect(authorize).toHaveBeenCalledTimes(1)
  })

  it('should return 403 if Authorize throws', async () => {
    authorize.mockRejectedValueOnce(new Error('any_error'))

    const httpResponse = await sut.handle({ authorization })

    expect(httpResponse).toEqual(forbidden())
  })

  it('should return 200 with userId on success', async () => {
    const httpResponse = await sut.handle({ authorization })

    expect(httpResponse).toEqual(ok('any_user_id'))
  })
})
