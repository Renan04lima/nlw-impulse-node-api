import { forbidden, ok } from '@/application/helpers/http'
import { HttpResponse } from '@/application/protocols/http'
import { Middleware } from '@/application/protocols/middleware'

type Request = { authorization: string}
type Authorize = (input: {token: string}) => Promise<string>
export class AuthMiddleware implements Middleware {
  constructor (private readonly authorize: Authorize) {}
  async handle ({ authorization }: Request): Promise<HttpResponse> {
    if (!this.validate({ authorization })) { return forbidden() }
    try {
      const userId = await this.authorize({ token: authorization })
      return ok(userId)
    } catch {
      return forbidden()
    }
  }

  private validate ({ authorization }: Request): boolean {
    const isValid = !(authorization === null || authorization === undefined || authorization === '')
    return isValid
  }
}
