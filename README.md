# 📘 API de Tareas (Backend)

Esta API de backend fue desarrollada como parte de la Prueba Técnica para CrediSeguros. Construida sobre el framework NestJS y utilizando MongoDB como base de datos, el proyecto implementa una arquitectura modular y escalable diseñada para la gestión eficiente de recursos.

## 🛠️ Tecnologías Utilizadas

El proyecto utiliza un stack moderno y robusto:

- **[NestJS](https://nestjs.com/)** (v11): Framework de Node.js para construir aplicaciones del lado del servidor eficientes y escalables.
- **[TypeScript](https://www.typescriptlang.org/)**: Lenguaje principal para tipado estático y mejor mantenibilidad.
- **[MongoDB](https://www.mongodb.com/)**: Base de datos NoSQL para almacenamiento de documentos.
- **[Mongoose](https://mongoosejs.com/)**: ODM (Object Data Modeling) para modelar datos de aplicación.
- **[Docker](https://www.docker.com/)**: Para contenerización y orquestación de servicios locales.
- **[pnpm](https://pnpm.io/)**: Gestor de paquetes rápido y eficiente.
- **[Jest](https://jestjs.io/)**: Framework de pruebas para unit testing.

## 🏗️ Arquitectura y Estructura

El proyecto sigue la arquitectura modular recomendada por NestJS.

### Estructura de Directorios

- `src/app.module.ts`: Módulo raíz de la aplicación. Configura la conexión a BD y variables de entorno.
- `src/tasks`: Módulo de Tareas. Contiene toda la lógica de negocio relacionada con las tareas.
  - `dto/`: Data Transfer Objects para validación de entrada (ej: crear tarea).
  - `entities/`: Esquemas de Mongoose que definen la estructura en MongoDB.
  - `tasks.controller.ts`: Maneja las peticiones HTTP.
  - `tasks.service.ts`: Lógica de negocio e interacción con la base de datos.
- `src/utils`: Utilidades generales.
- `test/`: Pruebas unitarias.

### Patrones de Diseño

- **Inyección de Dependencias**: Core de NestJS para gestionar la instancia de servicios y controladores.
- **Repository Pattern**: Implementado a través de Mongoose Models para abstraer la capa de datos.
- **DTO (Data Transfer Object)**: Uso de `class-validator` y `class-transformer` para asegurar la integridad de los datos entrantes.

### Estructura del Esquema

```bash
@Schema()
export class Task {
  @Prop({ unique: true, required: true, index: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}
```

## 🚀 Instalación y Ejecución

### Requisitos Previos

- Node.js (v18+ recomendado)
- pnpm (`npm install -g pnpm`)
- Docker y Docker Compose (Opcional, pero recomendado para la BD)

### Configuración para probar localmente

1.  **Instalar dependencias**:

    ```bash
    pnpm install
    ```

2.  **Configurar Variables de Entorno**:
    Asegúrate de tener un archivo `.env` en la raíz con la siguiente variable `MONGO_URL="mongodb://root:pass123@mongo:27017/mydb?authSource=admin"`).

3.  **Construir y levantar contenedores:**
    Para levantar todo el entorno (Aplicación + Base de Datos) sin configurar nada manualmente:

    ```bash
    docker compose build --no-cache
    ```

    ```bash
    docker compose up -d
    ```

4.  **Ejecutar la aplicación**:

    ```bash
    pnpm run start:dev
    ```

5.  La API estará disponible en `http://localhost:3000`.

### Configuración para probar Online

Si deseas puedes probar la API que se encuentra desplegada en la siguiente **URL**

https://app-task-backend-production.up.railway.app

## 🧪 Testing

El proyecto incluye pruebas unitarias.

```bash
# Ejecutar pruebas unitarias
pnpm run test
```

## 📡 Endpoints Principales

La API expone los siguientes recursos base (Tasks):

- `GET /tasks`: Obtener todas las tareas.
- `POST /tasks`: Crear una nueva tarea.
- `PUT /tasks/:id`: Actualizar una tarea existente.
- `DELETE /tasks/:id`: Eliminar una tarea.

---
