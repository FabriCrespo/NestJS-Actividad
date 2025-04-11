# 🎵 Vinyl Records Store API

A modern REST API for managing a vinyl records store, built with NestJS and Prisma.

## 🎯 Business Overview

This API powers a digital vinyl records store platform, allowing users to:
- Browse and search through a catalog of vinyl records
- Filter products by artist, genre, price range, and release date
- Manage inventory with real-time stock tracking
- Secure authentication for staff members
- Comprehensive product management system

## 🛠 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) - A progressive Node.js framework
- **Database**: SQLite with [Prisma](https://www.prisma.io/) ORM
- **Authentication**: JWT-based auth system
- **Documentation**: OpenAPI (Swagger)
- **Testing**: Jest
- **Language**: TypeScript

## 📊 Database Schema

### Product Model
```prisma
model Product {
  id          Int       @id @default(autoincrement())
  title       String    @unique
  artist      String
  genre       String?
  releaseDate DateTime?
  price       Float
  stock       Int       @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

### User Model
```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone <repository-url>
cd vinyl-store-api
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
```

4. **Run database migrations**
```bash
npx prisma migrate dev
```

5. **Start the development server**
```bash
npm run start:dev
```

## 🔑 API Authentication

The API uses JWT Bearer tokens for authentication. To access protected endpoints:

1. Register a new user or login with existing credentials
2. Use the received JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 📡 API Endpoints

### Products
- `GET /api/products` - List all products (with pagination and filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PATCH /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

## 📝 API Documentation

Access the full API documentation at:
```
http://localhost:3000/api
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Get test coverage
npm run test:cov
```

## 🔍 Features

- **Advanced Filtering**: Search products by multiple criteria
- **Pagination**: Efficient data loading with page-based pagination
- **Sorting**: Flexible sorting options for product listings
- **Stock Management**: Real-time inventory tracking
- **Input Validation**: Comprehensive DTO validation
- **Error Handling**: Robust error management system
- **API Documentation**: Auto-generated Swagger documentation
- **Security**: JWT-based authentication and route protection

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
