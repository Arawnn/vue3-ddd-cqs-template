import { IQueryHandler } from '@/core/application/IQueryHandler'
import { User } from '../../domain/User'
import type { IAuthService } from '../../domain/IAuthService'

export class GetCurrentUserQueryHandler extends IQueryHandler<void, User | null> {
  constructor(private authService: IAuthService) {
    super()
  }

  async query(): Promise<User | null> {
    return this.authService.getCurrentUser()
  }
}
