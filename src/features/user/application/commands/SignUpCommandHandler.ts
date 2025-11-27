import type { IAuthService } from '../../domain/IAuthService'
import type { IUserRepository } from '../../domain/IUserRepository'
import type { IEventBus } from '@/core/domain/EventBus'
import { SignUpCommand } from './SignUpCommand'
import { User } from '../../domain/User'
import { ICommandHandler } from '@/core/application/ICommandHandler'
import { Email, Password, type SignUpInput } from '../../domain'
import { UserId } from '../../domain/UserId'

export class SignUpCommandHandler extends ICommandHandler<SignUpCommand, User> {
  constructor(
    private authService: IAuthService,
    private userRepository: IUserRepository,
    private eventBus: IEventBus,
  ) {
    super()
  }
  async handle(command: SignUpCommand): Promise<User> {
    const credentials: SignUpInput = {
      email: new Email(command.email),
      password: new Password(command.password),
    }

    const authResult = await this.authService.signUp(credentials)

    if (!authResult) {
      // TODO: Better error handling
      throw new Error('Failed to sign up')
    }

    const user = User.create(
      new UserId(authResult.id),
      new Email(authResult.email),
      authResult.createdAt,
    )
    user.signUp()
    await this.userRepository.create(user)
    this.eventBus.publishAndClear(user)

    return user
  }
}
