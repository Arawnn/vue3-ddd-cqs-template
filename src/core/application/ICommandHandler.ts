export abstract class ICommandHandler<Input, Output> {
  abstract handle(command: Input): Promise<Output>
}
