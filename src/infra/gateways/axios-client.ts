
import { HttpGetClient, HttpPostClient } from '@/infra/gateways/client'
import axios from 'axios'

export class AxiosHttpClient implements HttpGetClient, HttpPostClient {
  async get ({ url, params }: HttpGetClient.Input): Promise<any> {
    const result = await axios.get(url, { params })
    return result.data
  }

  async post ({ url, body, params }: HttpPostClient.Input): Promise<any> {
    const headers = { Accept: 'application/json' }
    const result = await axios.post(url, body,{ params, headers })
    return result.data
  }
}
