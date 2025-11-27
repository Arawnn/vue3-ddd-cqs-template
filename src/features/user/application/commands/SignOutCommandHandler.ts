import type { IAuthService } from '../../domain/IAuthService'
import type { SignOutCommand } from './SignOutCommand'
import { ICommandHandler } from '@/core/application/ICommandHandler'
import type { IEventBus } from '@/core/domain/EventBus'

export class SignOutCommandHandler extends ICommandHandler<SignOutCommand, void> {
  constructor(
    private authService: IAuthService,
    private eventBus: IEventBus,
  ) {
    super()
  }

  async handle(command: SignOutCommand): Promise<void> {
    const user = await this.authService.getCurrentUser()

    if (!user) {
      // TODO: Better error handling
      throw new Error('User not found')
    }

    await this.authService.signOut()
    user.signOut()
    this.eventBus.publishAndClear(user)
  }
}
