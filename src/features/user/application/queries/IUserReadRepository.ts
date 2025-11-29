import type { UserReadDTO } from "./dto/UserReadDTO"
import type { UserId } from "../../domain/UserId"
import type { Email } from "../../domain/Email"

export interface IUserReadRepository {
  findById(id: UserId): Promise<UserReadDTO | null>
  findByEmail(email: Email): Promise<UserReadDTO | null>
  findAll(): Promise<UserReadDTO[] | null>
}