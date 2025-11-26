import type { DomainEvent } from '@core/domain/DomainEvent'
import type { User } from '../User'
import { UserId } from '../UserId'

export class UserCreatedEvent implements DomainEvent {
  readonly eventId: Uint8Array
  readonly aggregateId: Uint8Array
  readonly eventName: string = 'UserCreated'
  readonly occurredAt: Date
  readonly user: User

  constructor(user: User) {
    this.user = user
    this.occurredAt = new Date()
    this.eventId = this.generateId()
    this.aggregateId = this.userIdToUint8Array(user.id)
  }

  private generateId(): Uint8Array {
    const id = crypto.randomUUID()
    return new TextEncoder().encode(id)
  }

  private userIdToUint8Array(userId: UserId): Uint8Array {
    return new TextEncoder().encode(userId.value)
  }
}
