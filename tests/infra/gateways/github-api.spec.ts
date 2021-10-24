import { HttpPostClient } from '@/infra/gateways/client'
import { GitHubApi } from '@/infra/gateways/github-api'
import faker from 'faker'
import { mock, MockProxy } from 'jest-mock-extended'

describe('GitHubApi', () => {
  let code: string, urlPostClient: string, clientId: string, clientSecret: string
  let sut: GitHubApi
  let postClient: MockProxy<HttpPostClient>

  beforeAll(() => {
    postClient = mock()
    urlPostClient = 'https://github.com/login/oauth/access_token'
    clientId = 'any_client_id'
    clientSecret = 'any_client_secret'
  })

  beforeEach(() => {
    sut = new GitHubApi(postClient, clientId, clientSecret)

    code = faker.datatype.string()
  })

  describe('load', () => {
    it('should get accessToken', async () => {
      await sut.load({ code })

      expect(postClient.post).toHaveBeenCalledWith({
        url: urlPostClient,
        body: null,
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          code
        }
      })
      expect(postClient.post).toHaveBeenCalledTimes(1)
    })
  })
})
