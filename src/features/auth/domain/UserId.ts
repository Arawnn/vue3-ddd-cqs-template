import { ValueObject } from '@core/domain/ValueObject'

export class UserId extends ValueObject<string> {
  constructor(value: string) {
    super(value)
  }
}
