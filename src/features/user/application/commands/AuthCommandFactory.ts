import { SignUpCommand } from './SignUpCommand'
import { SignInCommand } from './SignInCommand'
import { SignOutCommand } from './SignOutCommand'
import type { IEventBus } from '@/core/domain/EventBus'
import type { IAuthService } from '../../domain/IAuthService'
import { SignUpCommandHandler } from './SignUpCommandHandler'
import type { IUserRepository } from '../../domain/IUserRepository'
import type { ICommandHandler } from '@/core/application/ICommandHandler'
import type { User } from '../../domain/User'
import { SignInCommandHandler } from './SignInCommandHandler'
import { SignOutCommandHandler } from './SignOutCommandHandler'

export interface IAuthCommandFactory {
  createSignUpCommand(): ICommandHandler<SignUpCommand, User>
  createSignInCommand(): ICommandHandler<SignInCommand, User>
  createSignOutCommand(): ICommandHandler<SignOutCommand, void>
}

export class AuthCommandFactory implements IAuthCommandFactory {
  constructor(
    private authService: IAuthService,
    private userRepository: IUserRepository,
    private eventBus: IEventBus,
  ) {
    this.authService = authService
    this.userRepository = userRepository
    this.eventBus = eventBus
  }

  createSignUpCommand(): ICommandHandler<SignUpCommand, User> {
    return new SignUpCommandHandler(this.authService, this.userRepository, this.eventBus)
  }
  createSignInCommand(): ICommandHandler<SignInCommand, User> {
    return new SignInCommandHandler(this.authService, this.userRepository, this.eventBus)
  }
  createSignOutCommand(): ICommandHandler<SignOutCommand, void> {
    return new SignOutCommandHandler(this.authService, this.eventBus)
  }
}
