import { forbidden } from '@/application/helpers/http'
import { AuthMiddleware } from '@/application/middlewares'

describe('AuthMiddleware', () => {
  let sut: AuthMiddleware

  beforeEach(() => {
    sut = new AuthMiddleware()
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
})
