# RSS-REACT2025

First personal project for the React 2025 course of the RS School

## 🚀 Project setup

Follow these steps to set up and run the project locally.

### Basic requirements

Make sure to have the following installed:

- [Node.js](https://nodejs.org/) version: **22.x** or higher
- [npm](https://www.npmjs.com/)

Verify installation by running in the console:

```bash
node -v
npm -v
```

### Setup Instructions

1. **Open the console and clone the repository**

```bash
git clone https://github.com/petruse4ka/RSS-REACT2025.git
```

This will create the new folder with all the files from the repository.

2. **Navigate to the project directory**

```bash
cd RSS-REACT2025/first-project
```

3. **Install project dependencies**

```bash
npm install
```

This will install all packages listed in `package.json`.

4. **Initialize Husky for Git hooks**

```bash
npm run prepare
```

This will set up Husky to run the Git hooks for pre-commit and other automation.

5. **Start the development server**

```bash
npm run dev
```

This will launch the Vite development server to test that the project has been setup correctly.

> ⚠️ **Important:** If your IDE shows TypeScript-related errors, make sure to check not only the installed TypeScript version but also the TypeScript configuration in your IDE. For **Visual Studio Code** select the TypeScript version by either:
>
> - Clicking the TypeScript version number in the bottom right corner and choosing "Use Workspace Version"
> - Or using the Command Palette (Ctrl+Shift+P or Cmd+Shift+P) and selecting "TypeScript: Select TypeScript Version" → "Use Workspace Version"

---

## 🎨 Tailwind CSS Development Setup

### VS Code Extensions

To enhance your development experience with Tailwind CSS, install the following extension:

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Tailwind CSS IntelliSense"
4. Click Install

This extension provides:

- Autocomplete suggestions
- Linting
- Hover previews

---

## 📜 Scripts

Use the following scripts to assist with development, formatting, linting, building, and deploying.

### 🧹 Code Quality Scripts

| Script                  | Description                                                                                                                                                                 |
| :---------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run lint`          | Execute ESLint on all `.ts`, `.tsx`, `.js`, and `.jsx` files in the `src/` folder to check for code quality issues.                                                         |
| `npm run lint:fix`      | Execute ESLint and automatically fix all fixable issues.                                                                                                                    |
| `npm run format:fix`    | Execute Prettier on all `.ts`, `.tsx`, `.js`, `.jsx`, `.css`, and `.scss` files in the `src/` folder to check if the files are properly formatted and automatically fix all fixable issues. |
| `npm run format:check`  | Execute Prettier without formatting the files.                                                                                                                              |

### ✅ Testing

| Script                  | Description                                                                         |
| :---------------------- | :---------------------------------------------------------------------------------- |
| `npm run test`          | Execute unit tests using Vitest.                                                    |
| `npm run test:coverage` | Execute unit tests using Vitest and view coverage info.                             |
| `npm run test:update`   | Update snapshots after making changes to test expectations.                         |
| `npm run check`         | Execute a code quality check: Vitest, ESLint, and Prettier formatting check.       |

### ⚙️ Development & Deployment

| Script            | Description                                 |
| :---------------- | :------------------------------------------ |
| `npm run dev`     | Start a local development server with Vite. |
| `npm run build`   | Build the project for production.           |
| `npm run preview` | Preview the production build locally.       |
| `npm run deploy`  | Build the project and deploy to GitHub Pages |

### 🛡️ Git Hooks

| Script               | Description                                               |
| :------------------- | :-------------------------------------------------------- |
| `npm run prepare`    | Set up Husky hooks.                                       |
| `npm run pre-commit` | Run linting and formatting on staged files before commit. |

---

## 🔠 Enums/Constants/Files Naming Rules

### General Guidelines

- Use **PascalCase** for enum names and React component names.
- Use **UPPER_CASE** for enum members and constants.
- Use **kebab-case** for file names (`.tsx`, `.ts`, `.scss`).
- Use **camelCase** for variables, functions, and properties.
- Keep names **meaningful and clear**.
- **Avoid abbreviations** unless widely recognized.

### Example Enums

```typescript
enum SearchTexts {
  PLACEHOLDER = 'Search for cards...',
  BUTTON = 'Search',
  LOADING = 'Loading...',
}
```

### Example Constants

```typescript
const SEARCH_TEXTS = {
  PLACEHOLDER: 'Search for cards...',
  BUTTON: 'Search',
  LOADING: 'Loading...',
};
```

### Example File Names

```
# React Components (.tsx)
cards-list.tsx
search.tsx

# TypeScript Files (.ts)
interfaces.ts
fetch-cards.ts

# Style Files (.scss)
index.scss
```

### Example Component Names

```typescript
class CardsList extends PureComponent { }
```

---

## 💻 Technology Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)  
**HTML5** – Used for structuring the content following modern web standards.

![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)  
**React 19** – Used for building the user interface with modern React features and hooks.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)  
**TypeScript** – Used for enhancing JavaScript with static typing to improve code quality.

![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white)  
**Tailwind CSS 4** – Used for building modern and responsive UI with a utility-first approach.

![Sass](https://img.shields.io/badge/Sass-CC6699?logo=sass&logoColor=white)  
**Sass** – Used for enhanced CSS styling with variables, mixins, and nested rules.

![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)  
**Vite** – Used for fast development server and optimized production builds.

![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white)  
**Vitest** – Used for unit testing with Vite-native performance and coverage reporting.

![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)  
**ESLint** – Used for enforcing coding standards and catching errors early during development.

![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=white)  
**Prettier** – Used for ensuring consistent code style across the entire project.

![Husky](https://img.shields.io/badge/Husky-4E8CAB?logo=husky&logoColor=white)  
**Husky** – Used for automating code checks with Git hooks.

![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?logo=github&logoColor=white)  
**GitHub Pages** – Used for hosting and continuous deployment of the application.

---