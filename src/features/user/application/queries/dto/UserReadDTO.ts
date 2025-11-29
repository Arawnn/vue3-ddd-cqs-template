export class UserReadDTO {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly createdAt: Date,
    public readonly lastSignedInAt: Date | null,
  ) {}
}