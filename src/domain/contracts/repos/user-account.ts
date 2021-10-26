import { UserAccount } from '@/domain/entities/user-account'

export interface SaveWithGithub {
  save: (input: SaveWithGithub.Input) => Promise<SaveWithGithub.Output>
}

export namespace SaveWithGithub {
  export type Input = {
    github_id: number
    login: string
    avatar_url: string
    name: string
  }
  export type Output = UserAccount
}
