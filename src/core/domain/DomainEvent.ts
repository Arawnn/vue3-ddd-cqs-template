export interface DomainEvent {
  eventId: Uint8Array
  aggregateId: Uint8Array
  eventName: string
  occurredAt: Date
}
