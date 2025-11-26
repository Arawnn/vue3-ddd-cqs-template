import { UseCase } from '@/core/application/UseCase'
import type { AuthRepository } from '../../domain/AuthRepository'

export class SignOutCommand extends UseCase<void, void> {
  constructor(private repository: AuthRepository) {
    super()
  }

  async execute(): Promise<void> {
    return this.repository.signOut()
  }
}
