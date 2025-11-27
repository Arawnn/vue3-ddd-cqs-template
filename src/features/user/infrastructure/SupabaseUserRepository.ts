import type { IUserRepository } from '../domain/IUserRepository'
import type { User } from '../domain/User'
import { UserId } from '../domain/UserId'
import { Email } from '../domain/Email'
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

  async findByEmail(email: Email): Promise<User | null> {
    const { data, error } = await supabaseClient.auth.getUser()

    if (error || !data.user || data.user.email !== email.value) {
      return null
    }

    return UserMapper.toDomain(data.user)
  }

  async findAll(): Promise<User[]> {
    return []
  }

  async delete(id: UserId): Promise<void> {
    return
  }
}
