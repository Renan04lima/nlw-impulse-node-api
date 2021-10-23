import { AxiosHttpClient } from '@/infra/gateways/axios-client'
import axios from 'axios'
import faker from 'faker'

jest.mock('axios')

describe('AxiosHttpClient', () => {
  let sut: AxiosHttpClient
  let fakeAxios: jest.Mocked<typeof axios>
  let url: string
  let params: object
  let body: object

  beforeAll(() => {
    params = { any: 'any' }
    body = { any: 'any' }
    fakeAxios = axios as jest.Mocked<typeof axios>
    fakeAxios.get.mockResolvedValue({
      status: 200,
      data: 'any_data'
    })
    fakeAxios.post.mockResolvedValue({
      status: 200,
      data: 'any_data'
    })
  })

  beforeEach(() => {
    url = faker.internet.url()

    sut = new AxiosHttpClient()
  })

  describe('get', () => {
    it('should call get with correct input', async () => {
      await sut.get({ url, params })

      expect(fakeAxios.get).toHaveBeenCalledWith(url, { params })
      expect(fakeAxios.get).toHaveBeenCalledTimes(1)
    })

    it('should return data on success', async () => {
      const result = await sut.get({ url, params })

      expect(result).toEqual('any_data')
    })

    it('should rethrow if get throws', async () => {
      fakeAxios.get.mockRejectedValueOnce(new Error('http_error'))

      const promise = sut.get({ url, params })

      await expect(promise).rejects.toThrow(new Error('http_error'))
    })
  })

  describe('post', () => {
    it('should call post with correct input', async () => {
      await sut.post({ url, body, params })

      expect(fakeAxios.post).toHaveBeenCalledWith(url, body ,{ params })
      expect(fakeAxios.post).toHaveBeenCalledTimes(1)
    })

    it('should return data on success', async () => {
      const result = await sut.post({ url, body, params })

      expect(result).toEqual('any_data')
    })

    it('should rethrow if get throws', async () => {
      fakeAxios.post.mockRejectedValueOnce(new Error('http_error'))

      const promise = sut.post({ url, body, params })

      await expect(promise).rejects.toThrow(new Error('http_error'))
    })
  })
})
