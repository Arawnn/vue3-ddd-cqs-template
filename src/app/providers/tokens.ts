import type { InjectionKey } from 'vue'
import type { IUserRepository } from '@/features/user/domain/IUserRepository'
import type { IEventBus } from '@/core/domain/EventBus'
import type { IAuthCommandFactory } from '@/features/user/application/commands/AuthCommandFactory'
import type { IAuthQueryFactory } from '@/features/user/application/queries/AuthQueryFactory'
import type { ILogger } from '@/core/domain/Logger'
import type { IAuthService } from '@/features/user/domain/IAuthService'

export const UserRepositoryKey: InjectionKey<IUserRepository> = Symbol('UserRepository')
export const EventBusKey: InjectionKey<IEventBus> = Symbol('EventBus')
export const AuthServiceKey: InjectionKey<IAuthService> = Symbol('AuthService')
export const LoggerKey: InjectionKey<ILogger> = Symbol('Logger')
export const AuthCommandFactoryKey: InjectionKey<IAuthCommandFactory> = Symbol('AuthCommandFactory')
export const AuthQueryFactoryKey: InjectionKey<IAuthQueryFactory> = Symbol('AuthQueryFactory')
