# Contributing

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features

## Development Process

1. **Fork the repo** and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. Ensure the test suite passes (`npm run test:unit`).
4. Make sure your code lints (`npm run lint`).
5. Issue that pull request!

## Coding Standards

- **DDD**: Respect the layer boundaries. No infrastructure code in the domain.
- **Clean Architecture**: Inner layers should not know about outer layers.
- **TypeScript**: Use strict typing. Avoid `any`.
- **Value Objects**: Use Value Objects for domain primitives (Email, Password, etc.).
- **DI**: Use Dependency Injection for all service classes.

## Pull Request Process

1. Update the `README.md` with details of changes to the interface, this includes new environment variables, exposed ports, useful file locations and container parameters.
2. Increase the version numbers in any examples files and the README.md to the new version that this Pull Request would represent.
