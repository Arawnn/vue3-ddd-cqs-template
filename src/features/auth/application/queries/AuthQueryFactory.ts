import type { AuthRepository } from '../../domain/AuthRepository'
import { GetCurrentUserQuery } from './GetCurrentUserQuery'

export interface IAuthQueryFactory {
  createGetCurrentUserQuery(): GetCurrentUserQuery
}

export class AuthQueryFactory implements IAuthQueryFactory {
  constructor(private repository: AuthRepository) {
    this.repository = repository
  }

  createGetCurrentUserQuery(): GetCurrentUserQuery {
    return new GetCurrentUserQuery(this.repository)
  }
}
