import 'dotenv/config'

export const env = {
  github: {
    clientId: process.env.GITHUB_CLIENT_ID ?? '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET ?? ''
  },
  port: process.env.PORT ?? 3333
}
