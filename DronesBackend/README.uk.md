# Drones

## Мови README

- [English](README.md)
- [Українська](README.uk.md)
- [Днепровский диалект](README.dp.md)

## Технології

- Node.js
- Express.js
- SQLite / MySQL
- JWT
- Bcrypt

## Встановлення

```bash
git clone https://github.com/DmitriyPechenyuk0/DronesBackend.git
cd DronesBackend
npm install
cp .env.example .env
npm run dev
```

## Структура проекту

```
камінг сун
```

## Правила написання коду

### Іменування

**Гілки** - у форматі "feature/короткий*опис*таски"

**Файли:** - dot-case: `user.controller.ts`, `auth.middleware.ts`

**Змінні та функції:**

- camelCase: `userId`, `getUserById()`
- Константи: UPPER_SNAKE_CASE - `MAX_ATTEMPTS`
- Булеві: `isActive`, `hasPermission`, `canEdit`

**Класи** - PascalCase - `UserService` `DatabaseConnection`

### Основні принципи

1. **DRY** - не дублювати код
2. **Простота читання** - уникати вкладених if
3. **Деструктуризація** об'єктів
4. **Обробка всіх помилок** через try-catch
5. **Валідація** всіх вхідних даних

### Структура відповідей api

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

### Обов'язково

- Валидация входных данных
- JWT для авторизации
- Bcrypt для паролей

## Змінні оточення

```env
PORT=3000
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=7d
```

## Команди

```bash
npm run dev      # Розробка
npm start        # Продакшн
```
