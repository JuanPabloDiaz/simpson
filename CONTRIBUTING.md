# Contributing to The Full Stack Simpsons

Thank you for your interest in contributing to The Full Stack Simpsons! We
appreciate your help in making this project better.

## Code of Conduct

By participating in this project, you agree to abide by our code of conduct:

- Be respectful and inclusive
- Be patient and welcoming
- Be thoughtful
- Be collaborative
- When disagreeing, try to understand why

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with the following information:

- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details (browser, OS, etc.)

### Suggesting Features

We welcome feature suggestions! Please create an issue with:

- A clear, descriptive title
- Detailed description of the proposed feature
- Any relevant examples or mockups
- Explanation of why this feature would be useful

### Pull Requests

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Run tests and ensure code quality
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Submit a pull request

### Pull Request Guidelines

- Follow the coding style of the project
- Include tests for new features or bug fixes
- Update documentation if necessary
- Keep pull requests focused on a single topic
- Reference any relevant issues

## Development Setup

1. Clone the repository

```bash
git clone https://github.com/yourusername/simpson.git
cd simpson
```

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

## Project Structure

```
/
├── app/                # Next.js 13 app directory
│   ├── api/            # API routes
│   ├── characters/     # Characters pages
│   ├── episodes/       # Episodes pages
│   ├── products/       # Products pages
│   ├── api-docs/       # API documentation page
│   └── page.jsx        # Homepage
├── components/         # Reusable components
├── lib/                # Utility functions and data
│   └── swagger.js      # OpenAPI specification
├── public/             # Static assets
└── ...
```

## Coding Standards

- Use ESLint for code linting
- Follow the existing code style
- Write meaningful commit messages
- Document new code with comments
- Update the README if necessary

## Testing

- Run tests before submitting a pull request
- Add tests for new features
- Ensure existing tests pass

## Documentation

- Update documentation for any changed functionality
- Document new features
- Keep API documentation up to date

## License

By contributing to this project, you agree that your contributions will be
licensed under the project's [MIT License](LICENSE).

Thank you for contributing to The Simpsons API!
