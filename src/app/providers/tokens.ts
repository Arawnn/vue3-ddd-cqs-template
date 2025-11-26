import type { InjectionKey } from 'vue'
import type { AuthRepository } from '@/features/auth/domain/AuthRepository'
import type { IEventBus } from '@/core/infrastructure/EventBus'
import type { IAuthCommandFactory } from '@/features/auth/application/commands/AuthCommandFactory'
import type { IAuthQueryFactory } from '@/features/auth/application/queries/AuthQueryFactory'
import type { ILogger } from '@/core/domain/Logger'

export const AuthRepositoryKey: InjectionKey<AuthRepository> = Symbol('AuthRepository')
export const EventBusKey: InjectionKey<IEventBus> = Symbol('EventBus')
export const LoggerKey: InjectionKey<ILogger> = Symbol('Logger')
export const AuthCommandFactoryKey: InjectionKey<IAuthCommandFactory> = Symbol('AuthCommandFactory')
export const AuthQueryFactoryKey: InjectionKey<IAuthQueryFactory> = Symbol('AuthQueryFactory')
