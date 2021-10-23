import { AuthenticateUserService } from '@/application/services/authenticate-user-service'
import { HttpPostClient } from '@/infra/gateways/client'

import { mock, MockProxy } from 'jest-mock-extended'
import faker from 'faker'

describe('AuthenticateUserService', () => {
  let postClient: MockProxy<HttpPostClient>
  let sut: AuthenticateUserService
  let code: string

  beforeAll(() => {
    postClient = mock()
  })

  beforeEach(() => {
    sut = new AuthenticateUserService(postClient)
    code = faker.datatype.string()
  })

  test('should call HttpPostClient with correct code', async () => {
    await sut.auth({ code })

    expect(postClient.post.mock.calls[0][0].params['code']).toEqual(code)
  })
})
