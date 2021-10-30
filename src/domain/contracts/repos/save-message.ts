import { UserAccount } from '@/domain/entities/user-account'

export interface SaveMessage {
  saveMessage: (input: SaveMessage.Input) => Promise<SaveMessage.Output>
}

export namespace SaveMessage {
  export type Input = {
    text: string
    user_id: string
  }

  export type Output = {
    user: UserAccount
    text: string
    user_id: string
    Saved_at: string
  }
}
