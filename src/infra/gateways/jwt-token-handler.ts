import { TokenGenerator } from '@/domain/contracts/gateways/token'
import { sign } from 'jsonwebtoken'

export class JwtTokenHandler implements TokenGenerator {
  constructor (private readonly secret: string) {}

  async generate ({ expirationInMs, key }: TokenGenerator.Input): Promise<TokenGenerator.Output> {
    const expirationInSeconds = expirationInMs / 1000

    sign({ key }, this.secret, { expiresIn: expirationInSeconds })
    return null
  }
}
