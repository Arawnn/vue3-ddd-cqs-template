import '@/shared/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from '@/app/router'
import {
  UserRepositoryKey,
  AuthServiceKey,
  AuthCommandFactoryKey,
  AuthQueryFactoryKey,
  EventBusKey,
  LoggerKey,
} from '@/app/providers/tokens'
import { SupabaseAuthService } from '@/features/user/infrastructure/SupabaseAuthService'
import { EventBus } from '@/core/domain/EventBus'
import { AuthCommandFactory } from '@/features/user/application/commands/AuthCommandFactory'
import { AuthQueryFactory } from '@/features/user/application/queries/AuthQueryFactory'
import { ConsoleLogger, LogLevel } from '@/core/infrastructure/ConsoleLogger'
import { SupabaseUserRepository } from '@/features/user/infrastructure/SupabaseUserRepository'

const app = createApp(App)

app.use(createPinia())
app.use(router)
const authService = new SupabaseAuthService()
const userRepository = new SupabaseUserRepository()
const eventBus = new EventBus()
const logger = new ConsoleLogger(import.meta.env.DEV ? LogLevel.DEBUG : LogLevel.INFO)

// Dependency Injection
app.provide(AuthServiceKey, authService)
app.provide(UserRepositoryKey, userRepository)
app.provide(EventBusKey, eventBus)
app.provide(AuthCommandFactoryKey, new AuthCommandFactory(authService, userRepository, eventBus))
app.provide(AuthQueryFactoryKey, new AuthQueryFactory(authService))
app.provide(LoggerKey, logger)
app.mount('#app')
