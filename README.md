# Veterinaria Asier

Veterinaria Asier es un proyecto final pequeño y funcional para una asignatura. La aplicación cubre tres áreas del enunciado de forma mínima y clara:

- venta de artículos
- adopción de mascotas
- servicios veterinarios

La base técnica demuestra autenticación OAuth 2 con Supabase, autorización RBAC por roles, autorización ABAC con la regla de adopción, backend Node.js con TypeScript, frontend Vue 3 con Vite, despliegue reproducible con Docker y despliegue cloud en Render.

## Stack

- Frontend: Vue 3 + Vite + TypeScript + CSS simple
- Backend: Node.js + Express + TypeScript
- Autenticación y base de datos: Supabase
- Contenedores: Docker + Docker Compose
- Despliegue: Render + Supabase externo

## Funcionalidad mínima

- login con GitHub mediante Supabase Auth
- roles `admin`, `client`, `vet` y `sales`
- catálogo de ofertas
- registro mínimo de adopciones
- panel admin para roles y adopciones
- regla de negocio: un cliente con adopción puede ver ofertas exclusivas

## Arranque rápido en local

1. Copiar `.env.example` a `.env`.
2. Copiar `frontend/.env.example` a `frontend/.env`.
3. Copiar `backend/.env.example` a `backend/.env`.
4. Rellenar las variables de Supabase.
5. Ejecutar el SQL de [supabase/schema.sql](supabase/schema.sql) en el editor SQL de Supabase.
6. Configurar el proveedor GitHub en Supabase y la OAuth App en GitHub.
7. Lanzar:

```bash
docker compose up --build
```

8. Abrir:
   - frontend: `http://localhost:8080`
   - backend: `http://localhost:3000/api/health`

## Requisitos demostrados

- OAuth 2 con GitHub mediante Supabase Auth
- RBAC con `admin`, `client`, `vet` y `sales`
- ABAC con la regla "cliente con adopción ve ofertas exclusivas"
- integración con Supabase para autenticación y datos
- Docker Compose para reproducción local
- despliegue en Render
- gestión de secretos con variables de entorno
- integración mínima de SonarQube, OWASP Dependency-Check y OWASP ZAP

## Scripts útiles

Desde la raíz del proyecto:

```bash
npm run build
cmd /c npm run security:dependency-check
npm run security:sonarqube:up
npm run security:zap
```

## Despliegue

- frontend: `Static Site` en Render con `Root Directory = frontend`
- backend: `Web Service` en Render con `Root Directory = backend`
- Supabase: servicio externo

La guía paso a paso está en [docs/guia.md](docs/guia.md).

## Evidencias

Las capturas y pruebas recopiladas para la memoria están en la carpeta [evidencias](evidencias).

## Documentación

- [Informe](informe.md)
- [Arquitectura](docs/Arquitectura.md)
- [Workflow](docs/Workflow.md)
- [Rutas](docs/Rutas.md)
- [Seguridad](docs/Seguridad.md)
- [Modelo de datos](docs/ModeloDeDatos.md)
- [Despliegue](docs/Despliegue.md)
- [DevSecOps](docs/DevSecOps.md)
- [Estructura](docs/Estructura.md)
