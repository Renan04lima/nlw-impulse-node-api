import { Authenticate } from '@/domain/usecases/authenticate'
import { Controller } from '@/application/protocols/controller'
import { HttpResponse } from '@/application/protocols/http'

export class AuthenticateController implements Controller {
  constructor (
    private readonly authenticate: Authenticate
  ) {}

  async handle (request: AuthenticateController.Request): Promise<HttpResponse> {
    const { code } = request
    await this.authenticate.auth({ code })
    return null
  }
}
export namespace AuthenticateController {
  export type Request = {
    code: string
  }
}
