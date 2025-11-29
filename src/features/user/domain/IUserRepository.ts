import { User } from './User'
import { UserId } from './UserId'

export interface IUserRepository {
  create(user: User): Promise<User>
  save(user: User): Promise<User>
  delete(id: UserId): Promise<void>
}
