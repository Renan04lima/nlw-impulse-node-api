export interface Authenticate {
  auth: (params: Authenticate.Input) => Promise<Authenticate.Output>
}

export namespace Authenticate {
  export type Input = {
    code: string
  }

  export type Output = {
    user: User
    accessToken: string
  }

  type User = {
    github_id: string
    login: string
    avatar_url: string
    name: string
  }
}
