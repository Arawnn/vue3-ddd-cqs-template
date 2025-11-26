import { SignUpCommand } from './SignUpCommand'
import { SignInCommand } from './SignInCommand'
import { SignOutCommand } from './SignOutCommand'
import type { AuthRepository } from '../../domain/AuthRepository'
import type { IEventBus } from '@/core/infrastructure/EventBus'

export interface IAuthCommandFactory {
  createSignUpCommand(): SignUpCommand
  createSignInCommand(): SignInCommand
  createSignOutCommand(): SignOutCommand
}

export class AuthCommandFactory implements IAuthCommandFactory {
  constructor(
    private repository: AuthRepository,
    private eventBus: IEventBus,
  ) {
    this.repository = repository
    this.eventBus = eventBus
  }

  createSignUpCommand(): SignUpCommand {
    return new SignUpCommand(this.repository, this.eventBus)
  }
  createSignInCommand(): SignInCommand {
    return new SignInCommand(this.repository, this.eventBus)
  }
  createSignOutCommand(): SignOutCommand {
    return new SignOutCommand(this.repository)
  }
}
