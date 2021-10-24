import { HttpGetClient, HttpPostClient } from '@/infra/gateways/client'
import { GitHubApi } from '@/infra/gateways/github-api'
import faker from 'faker'
import { mock, MockProxy } from 'jest-mock-extended'

describe('GitHubApi', () => {
  let code: string, urlPostClient: string, clientId: string, clientSecret: string, urlGetClient: string, headers: object, fakeUser: object
  let sut: GitHubApi
  let postClient: MockProxy<HttpPostClient>
  let getClient: MockProxy<HttpGetClient>

  beforeAll(() => {
    postClient = mock()
    getClient = mock()
    urlPostClient = 'https://github.com/login/oauth/access_token'
    urlGetClient = 'https://api.github.com/user'
    clientId = 'any_client_id'
    clientSecret = 'any_client_secret'
    headers = {
      authorization: 'Bearer ' + 'valid_token'
    }
    fakeUser = {
      id: faker.datatype.number(),
      name: faker.name.findName(),
      login: faker.internet.email(),
      avatar_url: faker.image.avatar()
    }
  })

  beforeEach(() => {
    postClient.post.mockResolvedValue({
      access_token: 'valid_token'
    })
    getClient.get.mockResolvedValue(fakeUser)
    code = faker.datatype.string()

    sut = new GitHubApi(postClient, getClient,clientId, clientSecret)
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
    })

    it('should get user info', async () => {
      await sut.load({ code })

      expect(getClient.get).toHaveBeenCalledWith({
        url: urlGetClient,
        params: null,
        headers
      })
    })

    it('should return github user', async () => {
      const result = await sut.load({ code })

      expect(result).toEqual(fakeUser)
    })

    it('should return undefined if HttpGetClient throws', async () => {
      getClient.get.mockRejectedValueOnce(new Error('github_error'))

      const githubUser = await sut.load({ code })

      expect(githubUser).toBeUndefined()
    })
  })
})
