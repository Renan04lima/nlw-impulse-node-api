import { Controller } from '@/shared/protocols/controller'
import { HttpResponse } from '@/shared/protocols/http'

export class AuthenticateController implements Controller {
  async handle (request: AuthenticateController.Request): Promise<HttpResponse> {
    return null
  }
}
export namespace AuthenticateController {
  export type Request = {
    code: string
  }
}
