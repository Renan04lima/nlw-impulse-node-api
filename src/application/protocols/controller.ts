import { HttpResponse } from '@/application/protocols/http'

export interface Controller<T = any> {
  handle: (request: T) => Promise<HttpResponse>
}
