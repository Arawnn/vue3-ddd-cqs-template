import { Entity } from '@core/domain/Entity'
import { UserId } from './UserId'
import { Email } from './Email'
import { UserSignedInEvent } from './events/UserSignedInEvent'
import { UserSignedUpEvent } from './events/UserSignedUpEvent'
import { UserSignOutEvent } from './events/UserSignOutEvent'
export class User extends Entity<UserId> {
  public readonly email: Email
  public readonly createdAt: Date
  private _lastSignedInAt: Date | null = null

  private constructor(
    id: UserId,
    email: Email,
    createdAt: Date,
    lastSignedInAt: Date | null = null,
  ) {
    super(id)
    this.email = email
    this.createdAt = createdAt
    this._lastSignedInAt = lastSignedInAt
  }

  get lastSignedInAt(): Date | null {
    return this._lastSignedInAt
  }

  static create(id: UserId, email: Email, createdAt: Date): User {
    const user = new User(id, email, createdAt)
    return user
  }

  signIn(): void {
    this._lastSignedInAt = new Date()
    this.addDomainEvent(new UserSignedInEvent(this))
  }

  static signUp(id: UserId, email: Email): User {
    const user = new User(id, email, new Date())
    user.addDomainEvent(new UserSignedUpEvent(user))
    return user
  }

  signOut(): void {
    this.addDomainEvent(new UserSignOutEvent(this))
  }
}
