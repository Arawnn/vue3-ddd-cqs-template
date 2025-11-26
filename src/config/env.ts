export const config = {
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Vue 3 DDD CQRS App',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  },
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  },
  logging: {
    level: import.meta.env.VITE_LOG_LEVEL || (import.meta.env.DEV ? 'debug' : 'info'),
  },
} as const
