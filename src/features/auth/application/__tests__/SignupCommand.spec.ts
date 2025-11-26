// src/features/auth/application/__tests__/SignUpCommand.spec.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { SignUpCommand } from '../commands/SignUpCommand'
import type { AuthRepository } from '../../domain/AuthRepository'
import type { IEventBus } from '@core/infrastructure/EventBus'
import { User } from '../../domain/User'
import { UserId } from '../../domain/UserId'
import { Email } from '../../domain/Email'
import { UserCreatedEvent } from '../../domain/events/UserCreatedEvent'
import { Password } from '../../domain/Password'

describe('SignUpCommand', () => {
  let mockRepository: AuthRepository
  let mockEventBus: IEventBus
  let command: SignUpCommand

  beforeEach(() => {
    mockRepository = {
      signUp: vi.fn(),
      signIn: vi.fn(),
      getCurrentUser: vi.fn(),
      signOut: vi.fn(),
    }
    mockEventBus = {
      on: vi.fn(),
      publish: vi.fn(),
      off: vi.fn(),
    }
    command = new SignUpCommand(mockRepository, mockEventBus)
  })

  it('should create user and publish event', async () => {
    const mockUser = User.create(new UserId('123'), new Email('test@example.com'), new Date())
    vi.mocked(mockRepository.signUp).mockResolvedValue(mockUser)

    const result = await command.execute({
      email: new Email('test@example.com'),
      password: new Password('Password123'),
    })

    expect(mockRepository.signUp).toHaveBeenCalledWith({
      email: expect.any(Email),
      password: expect.any(Password),
    })
    expect(mockEventBus.publish).toHaveBeenCalledWith(expect.any(UserCreatedEvent))
    expect(result).toEqual(mockUser)
  })
})
