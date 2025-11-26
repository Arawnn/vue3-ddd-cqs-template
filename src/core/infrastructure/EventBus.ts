import type { DomainEvent } from '../domain/DomainEvent'
import type { ILogger } from '../domain/Logger'

type EventHandler<T extends DomainEvent = DomainEvent> = (event: T) => void | Promise<void>

export interface IEventBus {
  on<T extends DomainEvent>(eventName: string, handler: EventHandler<T>): () => void
  publish(event: DomainEvent): void
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

  publish(event: DomainEvent): void {
    const handlers = this.handlers.get(event.eventName)
    if (!handlers) {
      this.logger?.debug(`No handlers registered for event: ${event.eventName}`)
      return
    }

    // Execute handlers asynchronously
    handlers.forEach((handler) => {
      Promise.resolve(handler(event)).catch((error) => {
        this.logger?.error(`Error handling event ${event.eventName}`, error as Error)
      })
    })
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
