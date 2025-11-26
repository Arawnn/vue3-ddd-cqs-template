# 🏗️ Architecture Guide

This project follows a strict implementation of **Domain-Driven Design (DDD)**, **CQRS** (Command Query Responsibility Segregation), and **Clean Architecture**, organized using **Vertical Slices**.

## 🧩 Architectural Patterns

### 1. Domain-Driven Design (DDD)

The core complexity of the application is tackled in the **Domain Layer**.

- **Entities**: Mutable objects defined by their identity (e.g., `User`).
- **Value Objects**: Immutable objects defined by their value (e.g., `Email`, `Password`).
- **Domain Events**: Events indicating something interesting happened in the domain (e.g., `UserCreated`).
- **Repositories (Interfaces)**: Contracts for data access defined in the domain.

### 2. CQRS (Command Query Responsibility Segregation)

Operations are split into two distinct paths:

- **Commands**: Write operations that change state. They return nothing or the created/modified entity.
  - *Example*: `SignUpCommand`, `SignInCommand`
- **Queries**: Read operations that return data without modifying state.
  - *Example*: `GetCurrentUserQuery`

### 3. Vertical Slice Architecture

Instead of organizing by technical layers (controllers, models, views), we organize by **Features**.
Each feature is a self-contained unit containing all layers it needs.

```
src/features/auth/
├── domain/           # Business logic
├── application/      # Use cases (Commands/Queries)
├── infrastructure/   # Implementation details
├── store/            # State management
└── ui/               # Vue components & views
```

### 4. Clean Architecture Layers

#### Core (`src/core/`)

Shared building blocks and abstractions used across features.

- **Domain**: Base classes (`Entity`, `ValueObject`) and interfaces (`DomainEvent`).
- **Application**: Base abstractions (`UseCase`).
- **Infrastructure**: Technical implementations (`EventBus`, `Logger`).

#### Features (`src/features/`)

Self-contained modules implementing specific business capabilities.

1. **Domain Layer** (`features/*/domain/`)
   - Pure TypeScript.
   - No dependencies on frameworks (Vue, Pinia) or external libraries (Axios, Supabase).
   - Defines *what* the business rules are.

2. **Application Layer** (`features/*/application/`)
   - Orchestrates the domain objects.
   - Contains **Commands** and **Queries** (Use Cases).
   - Defines *what* the application can do.

3. **Infrastructure Layer** (`features/*/infrastructure/`)
   - Implements interfaces defined in the Domain/Application layers.
   - Handles external concerns: API calls, local storage, 3rd party SDKs.
   - *Example*: `SupabaseAuthRepository` implements `AuthRepository`.

4. **UI Layer** (`features/*/ui/`)
   - Vue components and pages.
   - Should contain minimal logic, delegating to Stores or Use Cases.

5. **Store Layer** (`features/*/store/`)
   - Pinia stores acting as the glue between UI and Application layer.
   - Manages reactive state.
   - Uses Dependency Injection to access Commands/Queries.

## 💉 Dependency Injection (DI)

We use Vue's `provide`/`inject` system for DI to keep layers loosely coupled.

- **Tokens**: Defined in `src/app/providers/tokens.ts`.
- **Providers**: Configured in `src/main.ts`.
- **Injection**: Used in Stores and Components to access dependencies.

## 🔄 Data Flow

1. **UI** triggers an action (e.g., "Sign Up" button).
2. **Store** receives the action and calls a **Command**.
3. **Command** (Application Layer):
   - Orchestrates **Domain Objects**.
   - Uses **Repository** (Infrastructure) to persist data.
   - Publishes **Domain Events** via **EventBus**.
4. **Repository** (Infrastructure) calls external API (Supabase).
5. **Store** updates reactive state based on the result.
6. **UI** updates automatically.

## 📂 Directory Structure

```
src/
├── app/                  # App-wide setup (router, providers, layout)
├── config/               # Environment and global config
├── core/                 # Shared kernel (base classes, utilities)
│   ├── application/      # Shared application abstractions
│   ├── domain/           # Shared domain abstractions
│   └── infrastructure/   # Shared infrastructure implementations
├── features/             # Vertical Slices (Modules)
│   ├── auth/             # Authentication Feature
│   ├── dashboard/        # Dashboard Feature
│   └── ...
├── shared/               # Shared UI components & styles
└── main.ts               # Application entry point
```
