import { User } from '../domain/User'
import { UserId } from '../domain/UserId'
import { Email } from '../domain/Email'
import type { User as SupabaseUser } from '@supabase/supabase-js'

export class UserMapper {
  static toDomain(supabaseUser: SupabaseUser): User {
    if (!supabaseUser.email) {
      throw new Error('User email is required')
    }

    return User.create(
      new UserId(supabaseUser.id),
      new Email(supabaseUser.email),
      new Date(supabaseUser.created_at),
    )
  }
}
