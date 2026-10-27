import { UpdateUserService } from './update-user.js'
import { Failure, Success } from '../../utils/either.js'
import { MockProxy, mock } from 'jest-mock-extended'
import { UserRepository } from '../../repositories/user.js'
import { Encrypter } from '../../providers/encrypter.js'
import { User } from '@prisma/client'

describe('UpdateUserService', () => {
  let sut: UpdateUserService
  let userRepository: MockProxy<UserRepository>
  let encrypter: MockProxy<Encrypter>

  const existingUser = {
    id: 'user1',
    name: 'Old Name',
    email: 'old@mail.com',
    password: 'old-password',
  } as User

  const updatedUser = {
    id: 'user1',
    name: 'New Name',
    email: 'newmail@mail.com',
    password: 'encrypted-password',
  } as User

  beforeAll(() => {
    userRepository = mock<UserRepository>()
    encrypter = mock<Encrypter>()
    sut = new UpdateUserService(encrypter, userRepository)
    userRepository.findById.mockResolvedValue(existingUser)
    userRepository.update.mockResolvedValue(updatedUser)
    encrypter.encrypt.mockReturnValue('encrypted-password')
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  const defaultParams = {
    id: 'user1',
    data: {
      name: 'New Name',
      email: 'newmail@mail.com',
      password: 'new-password',
    },
  }

  test('should return failure if no update data provided', async () => {
    const result = await sut.execute({ ...defaultParams, data: {} })
    expect(result).toEqual(
      Failure.create({ message: 'Nenhum dado foi informado' }),
    )
  })

  test('should call findById with correct id', async () => {
    await sut.execute(defaultParams)
    expect(userRepository.findById).toHaveBeenCalledWith(defaultParams.id)
  })

  test('should return failure if user not found', async () => {
    userRepository.findById.mockResolvedValueOnce(null)
    const result = await sut.execute(defaultParams)
    expect(result).toEqual(
      Failure.create({ message: 'Usuário não encontrado' }),
    )
  })

  test('should call encrypter with correct password', async () => {
    await sut.execute(defaultParams)
    expect(encrypter.encrypt).toHaveBeenCalledWith(defaultParams.data.password)
  })

  test('should not call encrypter if password was not sent', async () => {
    await sut.execute({ ...defaultParams, data: { name: 'New Name' } })
    expect(encrypter.encrypt).not.toHaveBeenCalled()
  })

  test('should update user with correct data', async () => {
    await sut.execute(defaultParams)
    expect(userRepository.update).toHaveBeenCalledWith({
      id: defaultParams.id,
      data: {
        ...defaultParams.data,
        password: 'encrypted-password',
      },
    })
  })

  test('should return updated user on success', async () => {
    const result = await sut.execute(defaultParams)
    expect(result).toEqual(Success.create(updatedUser))
  })
})
