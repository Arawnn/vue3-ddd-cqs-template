
import { UserId } from '../domain/UserId'
import { Email } from '../domain/Email'
import { supabaseClient } from './supabaseClient'
import { UserReadMapper } from './UserReadMapper'
import type { IUserReadRepository } from '../application/queries/IUserReadRepository'
import type { UserReadDTO } from '../application/queries/dto/UserReadDTO'

export class SupabaseUserReadRepository implements IUserReadRepository {
  async findById(id: UserId): Promise<UserReadDTO | null> {
    const { data, error } = await supabaseClient.auth.getUser()

    if (error || !data.user) {
      return null
    }

    if (data.user.id !== id.value) {
      return null
    }

    return UserReadMapper.toDTO(data.user)
  }

  async findByEmail(email: Email): Promise<UserReadDTO | null> {
    const { data, error } = await supabaseClient.auth.getUser()

    if (error || !data.user || data.user.email !== email.value) {
      return null
    }

    return UserReadMapper.toDTO(data.user)
  }

  async findAll(): Promise<UserReadDTO[] | null> {
    return null
  }
}
