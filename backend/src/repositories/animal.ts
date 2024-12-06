import { PrismaClient } from '@prisma/client'
import { prisma } from '../database.js'
import { CreateAnimalRepositoryDTO } from './animal.dto.js'

export class AnimalRepository {
  constructor(private readonly repository: PrismaClient) {}

  async create(
    params: CreateAnimalRepositoryDTO.Params,
  ): Promise<CreateAnimalRepositoryDTO.Result> {
    return this.repository.animal.create({ data: params })
  }
}

export const animalRepositoryInstance = new AnimalRepository(prisma)
