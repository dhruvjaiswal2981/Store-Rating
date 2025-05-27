# Store Rating System - Full Stack Application

## Overview
This is a comprehensive store rating system with three user roles: Admin, Normal User, and Store Owner. The system allows users to rate stores, admins to manage users and stores, and store owners to view their ratings.

## Features

### System Administrator
- Manage users (add, view, filter)
- Manage stores (add, view, filter)
- View dashboard statistics
- Role-based access control

### Normal User
- Register and login
- View and search stores
- Rate stores (1-5 stars)
- Update personal information

### Store Owner
- View ratings for their store
- See average rating
- Update store information

## API Documentation

### Authentication

| Endpoint              | Method | Description           | Request Body                     |
|-----------------------|--------|-----------------------|----------------------------------|
| `/api/auth/signup`    | POST   | User registration     | `{name, email, address, password}` |
| `/api/auth/login`     | POST   | User login            | `{email, password}`             |

### Admin Endpoints

| Endpoint                   | Method | Description               |
|----------------------------|--------|---------------------------|
| `/api/admin/dashboard`     | GET    | Get dashboard statistics  |
| `/api/admin/users`         | POST   | Add new user              |
| `/api/admin/users`         | GET    | List all users            |
| `/api/admin/stores`        | POST   | Add new store             |
| `/api/admin/stores`        | GET    | List all stores           |

### User Endpoints

| Endpoint              | Method | Description          |
|-----------------------|--------|----------------------|
| `/api/user/stores`    | GET    | List all stores      |
| `/api/user/rating`    | POST   | Submit/store rating  |

## Form Validations

- **Name**: 20-60 characters
- **Address**: Max 400 characters
- **Password**:
  - 8-16 characters
  - At least 1 uppercase letter
  - At least 1 special character
- **Email**: Valid email format

## Database Models

### User Model
```javascript
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [20, 60] },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  address: {
    type: DataTypes.STRING(400),
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'user', 'storeOwner'),
    defaultValue: 'user',
  },
});
```
### Store Model
```javascript

const Store = sequelize.define('Store', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, validate: { isEmail: true } },
  address: { type: DataTypes.STRING(400) },
});

```
### Rating Model

```javascript

const Rating = sequelize.define('Rating', {
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 5 },
  },
});

```