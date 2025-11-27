import { User } from './User'
import { Email } from './Email'
import { UserId } from './UserId'

export interface IUserRepository {
  create(user: User): Promise<User>
  save(user: User): Promise<User>
  findById(id: UserId): Promise<User | null>
  findByEmail(email: Email): Promise<User | null>
  findAll(): Promise<User[]>
  delete(id: UserId): Promise<void>
}
