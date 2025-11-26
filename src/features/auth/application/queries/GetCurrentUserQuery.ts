import { UseCase } from '@/core/application/UseCase'
import type { AuthRepository } from '../../domain/AuthRepository'
import { User } from '../../domain/User'

export class GetCurrentUserQuery extends UseCase<void, User | null> {
  constructor(private repository: AuthRepository) {
    super()
  }

  async execute(): Promise<User | null> {
    return this.repository.getCurrentUser()
  }
}
