import '@/shared/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from '@/app/router'
import {
  AuthCommandFactoryKey,
  AuthQueryFactoryKey,
  AuthRepositoryKey,
  EventBusKey,
  LoggerKey,
} from '@/app/providers/tokens'
import { SupabaseAuthRepository } from '@/features/auth/infrastructure/SupabaseAuthRepository'
import { EventBus } from '@/core/infrastructure/EventBus'
import { AuthCommandFactory } from './features/auth/application/commands/AuthCommandFactory'
import { AuthQueryFactory } from './features/auth/application/queries/AuthQueryFactory'
import { ConsoleLogger, LogLevel } from './core/infrastructure/ConsoleLogger'

const app = createApp(App)

app.use(createPinia())
app.use(router)
const repository = new SupabaseAuthRepository()
const eventBus = new EventBus()
const logger = new ConsoleLogger(import.meta.env.DEV ? LogLevel.DEBUG : LogLevel.INFO)

// Dependency Injection
app.provide(AuthRepositoryKey, repository)
app.provide(EventBusKey, eventBus)
app.provide(AuthCommandFactoryKey, new AuthCommandFactory(repository, eventBus))
app.provide(AuthQueryFactoryKey, new AuthQueryFactory(repository))
app.provide(LoggerKey, logger)
app.mount('#app')
