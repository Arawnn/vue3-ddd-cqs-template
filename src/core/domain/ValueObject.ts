export abstract class ValueObject<T> {
  constructor(public readonly value: T) {}

  equals(other: ValueObject<T>): boolean {
    if (other === null || other === undefined) {
      return false
    }

    if (!(other instanceof ValueObject)) {
      return false
    }

    if (typeof this.value !== 'object' || this.value === null) {
      return this.value === other.value
    }

    return JSON.stringify(this.value) === JSON.stringify(other.value)
  }

  clone(): this {
    return Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this))
  }
}
