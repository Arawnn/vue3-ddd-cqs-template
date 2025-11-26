import type { DomainEvent } from './DomainEvent'
import type { ValueObject } from './ValueObject'

export abstract class Entity<Id extends ValueObject<unknown>> {
  private _domainEvents: DomainEvent[] = []

  protected constructor(private readonly _id: Id) {}

  get id(): Id {
    return this._id
  }

  equals(other: Entity<Id>): boolean {
    if (other === null || other === undefined) {
      return false
    }

    if (!(other instanceof Entity)) {
      return false
    }

    return this.id.equals(other.id)
  }

  protected addDomainEvent(event: DomainEvent): void {
    this._domainEvents.push(event)
  }

  public getDomainEvents(): readonly DomainEvent[] {
    return [...this._domainEvents]
  }

  public clearDomainEvents(): void {
    this._domainEvents = []
  }
}
