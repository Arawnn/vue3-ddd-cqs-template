import { Entity } from '@core/domain/Entity'
import { UserId } from './UserId'
import { Email } from './Email'

export class User extends Entity<UserId> {
  public readonly email: Email
  public readonly createdAt: Date

  private constructor(id: UserId, email: Email, createdAt: Date) {
    super(id)
    this.email = email
    this.createdAt = createdAt
  }

  static create(id: UserId, email: Email, createdAt: Date): User {
    return new User(id, email, createdAt)
  }
}
