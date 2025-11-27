export abstract class IQueryHandler<Query, Output> {
  abstract query(query: Query): Promise<Output>
}
