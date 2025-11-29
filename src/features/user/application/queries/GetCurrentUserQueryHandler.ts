import { IQueryHandler } from '@/core/application/IQueryHandler'
import { User } from '../../domain/User'
import type { IAuthService } from '../../domain/IAuthService'
import type { UserReadDTO } from './dto/UserReadDTO'

export class GetCurrentUserQueryHandler extends IQueryHandler<void, UserReadDTO | null> {
  constructor(private authService: IAuthService) {
    super()
  }

  async query(): Promise<UserReadDTO | null> {
    return this.authService.getCurrentUser()
  }
}
