export interface LoadGithubUser {
  load: (input: LoadGithubUser.Input) => Promise<LoadGithubUser.Output>
}

export namespace LoadGithubUser {
  export type Input = {code: string}
  export type Output = {
    id: string
    name: string
    login: string
    avatar_url: string
  }
}
