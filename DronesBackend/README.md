# Drones

## Langs of README

- [English](README.md)
- [Українська](README.uk.md)
- [Днепровский диалект](README.dp.md)

## Technologies

- Node.js
- Express.js
- SQLite / MySQL
- JWT
- Bcrypt

## Installation

```bash
git clone https://github.com/DmitriyPechenyuk0/DronesBackend.git
cd DronesBackend
npm install
cp .env.example .env
npm run dev
```

## Project structure

```
coming soon
```

## Rules for writing code

### Naming

**Branches** - in format "feature/short_description_of_task"

**Files:** - dot-case: `user.controller.ts`, `auth.middleware.ts`

**Variables and functions:**

- camelCase: `userId`, `getUserById()`
- Constants: UPPER_SNAKE_CASE - `MAX_ATTEMPTS`
- Boolean: `isActive`, `hasPermission`, `canEdit`

**Classes** - PascalCase - `UserService` `DatabaseConnection`

### Basic principles

1. **DRY** - don't duplicate code
2. **Readability** - avoid nested if statements
3. **Destructuring** objects
4. **Handling all errors** with try-catch
5. **Validating** all incoming data

### API response structure

```javascript
// Success
{
  success: true,
  data: {}
}

// Error
{
  success: false,
  message: "Error message"
}
```

### Required

- Input data validation
- JWT for authorization
- Bcrypt for passwords

## Environment variables

```env
PORT=3000
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=7d
```

## Commands

```bash
npm run dev      # Development
npm start        # Production
```
