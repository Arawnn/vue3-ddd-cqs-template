import type { UserReadDTO } from "../../application/queries/dto/UserReadDTO";

export class UserViewModels {
    constructor(private readonly dto: UserReadDTO) {}

    get email(): string {
        return this.dto.email;
    }

    get createdAt(): Date {
        return this.dto.createdAt;
    }

    get lastSignedInAt(): Date | null {
        return this.dto.lastSignedInAt;
    }
}