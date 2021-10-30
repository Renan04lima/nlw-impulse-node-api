import { Authenticate } from '@/domain/usecases/authenticate'
import { Controller } from '@/application/protocols/controller'
import { HttpResponse } from '@/application/protocols/http'
import { ok } from '@/application/helpers/http'

export class AuthenticateController implements Controller {
  constructor (
    private readonly authenticate: Authenticate
  ) {}

  async handle (request: AuthenticateController.Request): Promise<HttpResponse> {
    const { code } = request
    const result = await this.authenticate.auth({ code })
    return ok(result)
  }
}
export namespace AuthenticateController {
  export type Request = {
    code: string
  }
}
