import type { DomainEvent } from './DomainEvent'
import type { ILogger } from './Logger'

type EventHandler<T extends DomainEvent = DomainEvent> = (event: T) => void | Promise<void>

export interface HasDomainEvents {
  getDomainEvents(): readonly DomainEvent[]
  clearDomainEvents(): void
}

export interface IEventBus {
  on<T extends DomainEvent>(eventName: string, handler: EventHandler<T>): () => void
  publish(events: DomainEvent[]): void
  publishAndClear(entity: HasDomainEvents): void
  off<T extends DomainEvent>(eventName: string, handler: EventHandler<T>): void
}

export class EventBus implements IEventBus {
  private readonly logger?: ILogger
  private handlers: Map<string, Set<EventHandler>> = new Map()
  constructor(logger?: ILogger) {
    this.logger = logger
  }

  on<T extends DomainEvent>(eventName: string, handler: EventHandler<T>): () => void {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, new Set())
    }

    const handlerSet = this.handlers.get(eventName)!
    handlerSet.add(handler as EventHandler)

    // Return unsubscribe function
    return () => {
      handlerSet.delete(handler as EventHandler)
      if (handlerSet.size === 0) {
        this.handlers.delete(eventName)
      }
    }
  }

  publish(events: DomainEvent[]): void {
    events.forEach((event) => {
      const handlers = this.handlers.get(event.eventName)
      if (!handlers) {
        this.logger?.debug(`No handlers registered for event: ${event.eventName}`)
        return
      }

      handlers.forEach((handler) => {
        Promise.resolve(handler(event)).catch((error) => {
          this.logger?.error(`Error handling event ${event.eventName}`, error as Error)
        })
      })
    })
    this.clear()
  }

  publishAndClear(entity: HasDomainEvents): void {
    const events = [...entity.getDomainEvents()]
    this.logger?.debug(`Publishing ${events.length} events for entity ${entity.constructor.name}`)
    this.publish(events)
    entity.clearDomainEvents()
  }

  off<T extends DomainEvent>(eventName: string, handler: EventHandler<T>): void {
    const handlers = this.handlers.get(eventName)
    if (!handlers) return

    handlers.delete(handler as EventHandler)
    if (handlers.size === 0) {
      this.handlers.delete(eventName)
    }
  }

  clear(): void {
    this.handlers.clear()
  }
}
