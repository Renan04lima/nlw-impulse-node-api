import { HttpResponse } from '@/application/protocols/http'

export const ok = <T = any> (data: T): HttpResponse<T> => ({
  statusCode: 200,
  data
})
