import { ICommandHandler } from '@/core/application/ICommandHandler'
import type { IAuthService, SignInInput } from '../../domain/IAuthService'
import type { IUserRepository } from '../../domain/IUserRepository'
import type { IEventBus } from '@/core/domain/EventBus'
import { SignInCommand } from './SignInCommand'
import { User } from '../../domain/User'
import { UserId } from '../../domain/UserId'
import { Email } from '../../domain/Email'
import { Password } from '../../domain/Password'

export class SignInCommandHandler extends ICommandHandler<SignInCommand, User> {
  constructor(
    private authService: IAuthService,
    private userRepository: IUserRepository,
    private eventBus: IEventBus,
  ) {
    super()
  }

  async handle(command: SignInCommand): Promise<User> {
    const credentials: SignInInput = {
      email: new Email(command.email),
      password: new Password(command.password),
    }
    const authResult = await this.authService.signIn(credentials)

    if (!authResult) {
      // TODO: Better error handling
      throw new Error('Failed to sign in')
    }

    const user = await this.userRepository.findById(new UserId(authResult.id))
    if (!user) {
      // TODO: Better error handling
      throw new Error('User not found')
    }
    user.signIn()
    await this.userRepository.save(user)
    this.eventBus.publishAndClear(user)
    return user
  }
}
