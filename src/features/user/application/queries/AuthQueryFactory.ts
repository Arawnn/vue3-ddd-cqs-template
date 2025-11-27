import type { IAuthService } from '../../domain/IAuthService'
import type { IQueryHandler } from '@/core/application/IQueryHandler'
import type { User } from '../../domain/User'
import type { GetCurrentUserQuery } from './GetCurrentUserQuery'
import { GetCurrentUserQueryHandler } from './GetCurrentUserQueryHandler'

export interface IAuthQueryFactory {
  createGetCurrentUserQuery(): IQueryHandler<GetCurrentUserQuery, User | null>
}

export class AuthQueryFactory implements IAuthQueryFactory {
  constructor(private authService: IAuthService) {
    this.authService = authService
  }

  createGetCurrentUserQuery(): IQueryHandler<GetCurrentUserQuery, User | null> {
    return new GetCurrentUserQueryHandler(this.authService)
  }
}
