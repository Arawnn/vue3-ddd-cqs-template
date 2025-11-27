import type { DomainEvent } from '@core/domain/DomainEvent'
import type { User } from '../User'
import { UserId } from '../UserId'

/**
 * Event published when a user signs up.
 *
 * Example of usage in a Vue component or a store:
 *
 * ```typescript
 * import { inject, onUnmounted } from 'vue'
 * import { EventBusKey } from '@/app/providers/tokens'
 * import type { IEventBus } from '@core/domain/EventBus'
 * import type { UserSignedUpEvent } from './UserSignedUpEvent'
 *
 * const eventBus = inject<IEventBus>(EventBusKey)!
 *
 * // Subscribe to the event - on() returns an unsubscribe function
 * const unsubscribe = eventBus.on<UserSignedUpEvent>('UserSignedUp', (event) => {
 *   console.log('User signed up:', event.user.email.value)
 *   // Do something with the event...
 * })
 *
 * // Automatically unsubscribe (in a Vue component)
 * onUnmounted(() => {
 *   unsubscribe() // Just call the returned function
 * })
 * ```
 *
 * Why does on() return unsubscribe() ?
 * - Easier: no need to keep a reference to the handler
 * - More secure: impossible to mistype the handler when unsubscribing
 * - Standard pattern: used by RxJS, EventEmitter, etc.
 */
export class UserSignedUpEvent implements DomainEvent {
  readonly eventId: Uint8Array
  readonly aggregateId: Uint8Array
  readonly eventName: string = 'UserSignedUp'
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
