import { UseCase } from '@/core/application/UseCase'
import type { IEventBus } from '@/core/infrastructure/EventBus'
import type { AuthRepository, SignUpInput } from '../../domain/AuthRepository'
import { User } from '../../domain/User'
import { UserCreatedEvent } from '../../domain/events/UserCreatedEvent'

export class SignUpCommand extends UseCase<SignUpInput, User> {
  constructor(
    private repository: AuthRepository,
    private eventBus: IEventBus,
  ) {
    super()
  }

  async execute(input: SignUpInput): Promise<User> {
    console.log('execute', input)
    const user = await this.repository.signUp(input)

    const event = new UserCreatedEvent(user)
    this.eventBus.publish(event)

    return user
  }
}
