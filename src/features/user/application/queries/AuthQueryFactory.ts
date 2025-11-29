import type { IAuthService } from '../../domain/IAuthService'
import type { IQueryHandler } from '@/core/application/IQueryHandler'
import type { GetCurrentUserQuery } from './GetCurrentUserQuery'
import { GetCurrentUserQueryHandler } from './GetCurrentUserQueryHandler'
import type { UserReadDTO } from './dto/UserReadDTO'

export interface IAuthQueryFactory {
  createGetCurrentUserQuery(): IQueryHandler<GetCurrentUserQuery, UserReadDTO | null>
}

export class AuthQueryFactory implements IAuthQueryFactory {
  constructor(private authService: IAuthService) {
    this.authService = authService
  }

  createGetCurrentUserQuery(): IQueryHandler<GetCurrentUserQuery, UserReadDTO | null> {
    return new GetCurrentUserQueryHandler(this.authService)
  }
}
