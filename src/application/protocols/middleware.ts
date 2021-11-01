import { HttpResponse } from '@/application/protocols/http'

export interface Middleware<T = any> {
  handle: (request: T) => Promise<HttpResponse>
}
