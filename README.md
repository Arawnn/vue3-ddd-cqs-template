# Vue 3 DDD CQRS Template

![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Pinia](https://img.shields.io/badge/pinia-%23ffd859.svg?style=for-the-badge&logo=pinia&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/github/license/guillaumebriday/vue3-ddd-cqrs-template?style=for-the-badge)

> A production-ready **Vue 3 + TypeScript** starter template implementing **Domain-Driven Design (DDD)**, **CQRS**, and **Clean Architecture** patterns organized by **Vertical Slices**.

## 📚 Documentation

- [**Architecture Guide**](./docs/ARCHITECTURE.md) - Learn about the layers, DDD, and CQRS implementation.
- [**Getting Started**](./docs/GETTING_STARTED.md) - Installation and setup guide.
- [**Creating Features**](./docs/CREATING_FEATURES.md) - Step-by-step guide to adding new features.

## 🏗️ Key Concepts

- **Domain-Driven Design (DDD)**: Rich domain models with Entities, Value Objects, and Domain Events.
- **CQRS**: Clear separation between Write (Commands) and Read (Queries) operations.
- **Clean Architecture**: Strict dependency rules where the Domain layer depends on nothing.
- **Vertical Slice Architecture**: Code organized by Feature (e.g., `features/auth`) rather than by technical layer.
- **Dependency Injection**: Loosely coupled components using Vue's `provide`/`inject`.

## 🚀 Features

- ✅ **Vue 3** Composition API with `<script setup>`
- ✅ **TypeScript** strict mode enabled
- ✅ **Pinia** for state management
- ✅ **Vue Router** with lazy loading
- ✅ **Supabase** integration (Authentication example included)
- ✅ **Vitest** for unit testing
- ✅ **Playwright** for E2E testing
- ✅ **Tailwind CSS** for styling
- ✅ **ESLint + Prettier** for code quality
- ✅ **Logger** & **EventBus** infrastructure

## 📦 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env.local

# 3. Run development server
npm run dev
```

## 🧪 Testing

```bash
# Run Unit Tests
npm run test:unit

# Run E2E Tests
npm run test:e2e
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
