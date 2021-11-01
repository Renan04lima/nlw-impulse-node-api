import { forbidden } from '@/application/helpers/http'
import { HttpResponse } from '@/application/protocols/http'
import { Middleware } from '@/application/protocols/middleware'

type Request = { authorization: string}

export class AuthMiddleware implements Middleware {
  async handle ({ authorization }: Request): Promise<HttpResponse> {
    if (!this.validate({ authorization })) { return forbidden() }
    return null
  }

  private validate ({ authorization }: Request): boolean {
    const isValid = !(authorization === null || authorization === undefined || authorization === '')
    return isValid
  }
}
