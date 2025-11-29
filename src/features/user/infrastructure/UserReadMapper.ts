import { UserReadDTO } from "../application/queries/dto/UserReadDTO";
import type { User as SupabaseUser } from "@supabase/supabase-js"

export class UserReadMapper {
    static toDTO(supabaseUser: SupabaseUser): UserReadDTO {
        if (!supabaseUser.email) {
            throw new Error('User email is required')
        }

        return new UserReadDTO(
            supabaseUser.id,
            supabaseUser.email.valueOf(),
            new Date(supabaseUser.created_at),
            supabaseUser.last_sign_in_at ? new Date(supabaseUser.last_sign_in_at) : null,
        )
    }
}