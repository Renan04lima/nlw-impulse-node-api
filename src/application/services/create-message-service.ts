import { SaveMessage } from '@/domain/contracts/repos/save-message'
import { CreateMessage } from '@/domain/usecases/create-message'

export class CreateMessageService implements CreateMessage {
  constructor (
    private readonly saveMessage: SaveMessage
  ) {}

  async create (input: CreateMessage.Input): Promise<CreateMessage.Output> {
    await this.saveMessage.saveMessage(input)

    return null
  }
}
