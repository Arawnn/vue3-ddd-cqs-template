import { UseCase } from '@/core/application/UseCase'
import type { IEventBus } from '@/core/infrastructure/EventBus'
import type { AuthRepository, SignInInput } from '../../domain/AuthRepository'
import { User } from '../../domain/User'
import { UserSignedInEvent } from '../../domain/events/UserSignedInEvent'

export class SignInCommand extends UseCase<SignInInput, User> {
  constructor(
    private repository: AuthRepository,
    private eventBus: IEventBus,
  ) {
    super()
  }

  async execute(input: SignInInput): Promise<User> {
    const user = await this.repository.signIn(input)
    const event = new UserSignedInEvent(user)
    this.eventBus.publish(event)

    return user
  }
}
