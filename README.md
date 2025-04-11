# 🎵 API de Tienda de Vinilos

Una API REST moderna para gestionar una tienda de vinilos, construida con NestJS y Prisma.

## 🎥 Demo del Proyecto
[![Demo de la API de Vinilos](https://img.youtube.com/vi/fX_e73kXg6U/0.jpg)](https://www.youtube.com/watch?v=fX_e73kXg6U)

## 🎯 Descripción del Negocio

Esta API impulsa una plataforma digital de venta de vinilos, permitiendo a los usuarios:
- Navegar y buscar en un catálogo de discos de vinilo
- Filtrar productos por artista, género, rango de precio y fecha de lanzamiento
- Gestionar inventario con seguimiento de stock en tiempo real
- Autenticación segura para miembros del personal
- Sistema integral de gestión de productos

## 🛠 Stack Tecnológico

- **Framework**: [NestJS](https://nestjs.com/) - Un framework progresivo de Node.js
- **Base de Datos**: SQLite con [Prisma](https://www.prisma.io/) ORM
- **Autenticación**: Sistema basado en JWT
- **Documentación**: OpenAPI (Swagger)
- **Testing**: Jest
- **Lenguaje**: TypeScript

## 📊 Esquema de Base de Datos

### Modelo de Producto
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

### Modelo de Usuario
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

## 🚀 Comenzando

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd vinyl-store-api
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
Crear un archivo `.env`:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="tu-clave-secreta"
```

4. **Ejecutar migraciones de base de datos**
```bash
npx prisma migrate dev
```

5. **Iniciar el servidor de desarrollo**
```bash
npm run start:dev
```

## 🔑 Autenticación de la API

La API utiliza tokens JWT Bearer para la autenticación. Para acceder a los endpoints protegidos:

1. Registra un nuevo usuario o inicia sesión con credenciales existentes
2. Utiliza el token JWT recibido en el encabezado de Autorización:
```
Authorization: Bearer <tu-token-jwt>
```

## 📡 Endpoints de la API

### Productos
- `GET /api/products` - Listar todos los productos (con paginación y filtros)
- `GET /api/products/:id` - Obtener un producto específico
- `POST /api/products` - Crear nuevo producto
- `PATCH /api/products/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar producto

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión

## 📝 Documentación de la API

Accede a la documentación completa de la API en:
```
http://localhost:3000/api
```

## 🧪 Testing

```bash
# Ejecutar pruebas unitarias
npm run test

# Ejecutar pruebas e2e
npm run test:e2e

# Obtener cobertura de pruebas
npm run test:cov
```

## 🔍 Características

- **Filtrado Avanzado**: Búsqueda de productos por múltiples criterios
- **Paginación**: Carga eficiente de datos con paginación
- **Ordenamiento**: Opciones flexibles de ordenamiento para listados
- **Gestión de Stock**: Seguimiento de inventario en tiempo real
- **Validación de Entrada**: Validación integral de DTOs
- **Manejo de Errores**: Sistema robusto de gestión de errores
- **Documentación API**: Documentación Swagger autogenerada
- **Seguridad**: Autenticación basada en JWT y protección de rutas

## 🤝 Contribuir

1. Haz un fork del repositorio
2. Crea tu rama de características (`git checkout -b feature/caracteristica-increible`)
3. Haz commit de tus cambios (`git commit -m 'Añadir característica increíble'`)
4. Haz push a la rama (`git push origin feature/caracteristica-increible`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
