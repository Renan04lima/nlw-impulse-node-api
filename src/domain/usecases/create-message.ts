import { UserAccount } from '@/domain/entities/user-account'

export interface CreateMessage {
  create: (input: CreateMessage.Input) => Promise<CreateMessage.Output>
}

export namespace CreateMessage {
  export type Input = {
    text: string
    user_id: string
  }

  export type Output = {
    user: UserAccount
    text: string
    user_id: string
    created_at: string
  }
}
