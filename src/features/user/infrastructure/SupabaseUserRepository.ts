import type { IUserRepository } from '../domain/IUserRepository'
import type { User } from '../domain/User'
import { UserId } from '../domain/UserId'
import { supabaseClient } from './supabaseClient'
import { UserMapper } from './UserMapper'

/**
 * Not implemented yet
 */
export class SupabaseUserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    return user
  }

  async save(user: User): Promise<User> {
    return user
  }

  async findById(id: UserId): Promise<User | null> {
    const { data, error } = await supabaseClient.auth.getUser()

    if (error || !data.user) {
      return null
    }

    if (data.user.id !== id.value) {
      return null
    }

    return UserMapper.toDomain(data.user)
  }

  async delete(id: UserId): Promise<void> {
    return
  }
}
