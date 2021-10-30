import { mock, MockProxy } from 'jest-mock-extended'
import { CreateMessageService } from '@/application/services/create-message-service'
import { SaveMessage } from '@/domain/contracts/repos/save-message'

describe('CreateMessageService', () => {
  let SaveMessage: MockProxy<SaveMessage>
  let sut: CreateMessageService

  beforeAll(() => {
    SaveMessage = mock()
  })

  beforeEach(() => {
    sut = new CreateMessageService(
      SaveMessage
    )
  })

  test('should call SaveMessage with correct input', async () => {
    const input = {
      text: 'any_text',
      user_id: 'any_id'
    }
    await sut.create(input)

    expect(SaveMessage.saveMessage).toHaveBeenCalledWith(input)
  })
})
