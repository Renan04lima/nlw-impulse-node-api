import { UserAccount } from '@/domain/entities/user-account'

export interface Authenticate {
  auth: (params: Authenticate.Input) => Promise<Authenticate.Output>
}

export namespace Authenticate {
  export type Input = {
    code: string
  }

  export type Output = {
    user: UserAccount
    accessToken: string
  }
}
