# ✨ Creating a New Feature

This guide walks you through creating a new feature using the **Vertical Slice Architecture**.
Let's create a `Todo` feature as an example.

## 1. Create Directory Structure

Create a new directory in `src/features/todo/` with the standard layers:

```bash
mkdir -p src/features/todo/{domain,application,infrastructure,ui,store}
mkdir -p src/features/todo/application/{commands,queries}
mkdir -p src/features/todo/ui/{components,views,pages}
```

## 2. Domain Layer (`domain/`)

Define the core business logic first.

**`src/features/todo/domain/Todo.ts`**

```typescript
import { Entity } from '@core/domain/Entity'
import { TodoId } from './TodoId'

export class Todo extends Entity<TodoId> {
  constructor(
    id: TodoId,
    public title: string,
    public isCompleted: boolean
  ) {
    super(id)
  }

  complete() {
    this.isCompleted = true
  }
}
```

**`src/features/todo/domain/TodoRepository.ts`**

```typescript
import { Todo } from './Todo'

export interface TodoRepository {
  save(todo: Todo): Promise<void>
  findById(id: string): Promise<Todo | null>
  findAll(): Promise<Todo[]>
}
```

## 3. Application Layer (`application/`)

Create Commands (Write) and Queries (Read).

**`src/features/todo/application/commands/CreateTodoCommand.ts`**

```typescript
import { UseCase } from '@core/application/UseCase'
import { TodoRepository } from '../../domain/TodoRepository'
import { Todo } from '../../domain/Todo'

export class CreateTodoCommand extends UseCase<string, Todo> {
  constructor(private repository: TodoRepository) {
    super()
  }

  async execute(title: string): Promise<Todo> {
    const todo = new Todo(/* ... */)
    await this.repository.save(todo)
    return todo
  }
}
```

**`src/features/todo/application/TodoCommandFactory.ts`**

```typescript
export class TodoCommandFactory {
  constructor(private repository: TodoRepository) {}
  
  createCreateTodoCommand(): CreateTodoCommand {
    return new CreateTodoCommand(this.repository)
  }
}
```

## 4. Infrastructure Layer (`infrastructure/`)

Implement the interfaces.

**`src/features/todo/infrastructure/SupabaseTodoRepository.ts`**

```typescript
import { TodoRepository } from '../domain/TodoRepository'

export class SupabaseTodoRepository implements TodoRepository {
  // Implementation...
}
```

## 5. Dependency Injection Setup

**`src/app/providers/tokens.ts`**

```typescript
export const TodoRepositoryKey = Symbol('TodoRepository')
export const TodoCommandFactoryKey = Symbol('TodoCommandFactory')
```

**`src/main.ts`**

```typescript
import { SupabaseTodoRepository } from '@/features/todo/infrastructure/SupabaseTodoRepository'
import { TodoCommandFactory } from '@/features/todo/application/TodoCommandFactory'

const todoRepo = new SupabaseTodoRepository()
app.provide(TodoRepositoryKey, todoRepo)
app.provide(TodoCommandFactoryKey, new TodoCommandFactory(todoRepo))
```

## 6. Store Layer (`store/`)

Connect UI to Application layer.

**`src/features/todo/store/useTodoStore.ts`**

```typescript
export const useTodoStore = defineStore('todo', () => {
  const commandFactory = inject(TodoCommandFactoryKey)!
  
  const createTodo = async (title: string) => {
    const command = commandFactory.createCreateTodoCommand()
    await command.execute(title)
  }

  return { createTodo }
})
```

## 7. UI Layer (`ui/`)

Build your Vue components.

**`src/features/todo/ui/pages/TodoPage.vue`**

```vue
<script setup lang="ts">
import { useTodoStore } from '../../store/useTodoStore'
// ...
</script>
```
