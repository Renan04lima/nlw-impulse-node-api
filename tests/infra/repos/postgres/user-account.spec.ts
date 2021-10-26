import { Repository } from '@/infra/repos/postgres/repository'
import { PgUserAccountRepository } from '@/infra/repos/postgres/user-account'

import { PrismaClient } from '.prisma/client'
import { mockDeep } from 'jest-mock-extended'
import faker from 'faker'

describe('PgUserAccountRepository', () => {
  let sut: PgUserAccountRepository
  let prismaMock: any

  beforeAll(() => {
    prismaMock = mockDeep<PrismaClient>()
    prismaMock.$connect.mockResolvedValue()

    prismaMock.user.create.mockImplementation()
    prismaMock.user.findFirst.mockImplementation()
  })
  beforeEach(() => {
    sut = new PgUserAccountRepository()
    sut.prisma = prismaMock
  })

  it('should extends Repository', async () => {
    expect(sut).toBeInstanceOf(Repository)
  })

  describe('save', () => {
    it('should call create with correct input', async () => {
      const input = {
        github_id: faker.datatype.number(),
        login: faker.internet.email(),
        avatar_url: faker.image.avatar(),
        name: faker.name.findName()
      }
      await sut.save(input)

      expect(prismaMock.user.create).toHaveBeenCalledWith({
        data: input
      })
    })
  })
})
