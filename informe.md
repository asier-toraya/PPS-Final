# Informe breve del proyecto

## 1. Presentación

`Veterinaria Asier` es una aplicación web pequeña orientada a una clínica veterinaria con tres áreas funcionales:

- venta de artículos
- adopción de mascotas
- servicios veterinarios

El objetivo del proyecto ha sido construir una base mínima, clara y defendible, cumpliendo los requisitos académicos de autenticación, autorización, integración con Supabase, despliegue reproducible y análisis de seguridad.

## 2. Qué hace la aplicación

La aplicación permite:

- iniciar sesión mediante OAuth 2 con GitHub y Supabase
- diferenciar accesos por rol: `admin`, `client`, `vet`, `sales`
- mostrar ofertas exclusivas solo a clientes que hayan adoptado una mascota
- asignar roles y registrar adopciones desde un panel admin mínimo

La regla principal de negocio es esta:

- un cliente con adopción registrada puede acceder a ofertas exclusivas

## 3. Dónde está cada parte

### Frontend

- carpeta: [frontend](frontend)
- tecnología: Vue 3 + Vite + TypeScript
- login: [frontend/src/views/LoginView.vue](frontend/src/views/LoginView.vue)
- dashboard: [frontend/src/views/DashboardView.vue](frontend/src/views/DashboardView.vue)
- catálogo: [frontend/src/views/CatalogView.vue](frontend/src/views/CatalogView.vue)
- panel admin: [frontend/src/views/AdminView.vue](frontend/src/views/AdminView.vue)

### Backend

- carpeta: [backend](backend)
- tecnología: Node.js + Express + TypeScript
- rutas: [backend/src/routes/index.ts](backend/src/routes/index.ts)
- autenticación: [backend/src/middlewares/authentication.ts](backend/src/middlewares/authentication.ts)
- autorización RBAC: [backend/src/security/rbac.ts](backend/src/security/rbac.ts)
- autorización ABAC: [backend/src/security/abac.ts](backend/src/security/abac.ts)

### Supabase

- esquema SQL: [supabase/schema.sql](supabase/schema.sql)
- uso principal:
  - OAuth 2 con GitHub
  - base de datos PostgreSQL
  - tablas `profiles`, `pets`, `adoptions`, `offers`

### Docker y despliegue

- compose: [docker-compose.yml](docker-compose.yml)
- frontend Docker: [frontend/Dockerfile](frontend/Dockerfile)
- backend Docker: [backend/Dockerfile](backend/Dockerfile)

## 4. Requisitos cumplidos

### Autenticación OAuth 2

Cumplido con `Supabase Auth + GitHub`.

Evidencias:

- [oauth-github-supa.png](evidencias/oauth-github-supa.png)
- [oauth.png](evidencias/oauth.png)
- [login-success.png](evidencias/login-success.png)

### Autorización RBAC

Cumplido con los roles `admin`, `client`, `vet` y `sales`.

Aplicación:

- `admin` gestiona roles y adopciones
- `sales` puede gestionar ofertas de tienda
- `vet` puede gestionar ofertas de servicio
- `client` accede a su información y al catálogo permitido

Evidencias:

- [admin-panel.png](evidencias/admin-panel.png)
- [client-panel.png](evidencias/client-panel.png)

### Autorización ABAC

Cumplido con la regla:

- un cliente solo puede ver ofertas exclusivas si tiene una adopción registrada

Esta condición no depende solo del rol, sino también de un atributo de negocio derivado de la relación entre `profiles` y `adoptions`.

Evidencias:

- [sin-adopcion.png](evidencias/sin-adopcion.png)
- [con-adopcion.png](evidencias/con-adopcion.png)
- [oferta-exclusiva.png](evidencias/oferta-exclusiva.png)
- [is-exclusive.png](evidencias/is-exclusive.png)

### Integración con Supabase

Cumplido para autenticación y persistencia de datos.

Evidencias:

- [oauth-github-supa.png](evidencias/oauth-github-supa.png)
- [con-adopcion.png](evidencias/con-adopcion.png)

### Gestión de secretos

Cumplido con variables de entorno, archivos `.env.example` y exclusión de secretos del repositorio.

Evidencias:

- [env-frontend.png](evidencias/env-frontend.png)
- [env-backend.png](evidencias/env-backend.png)
- [gitignore.png](evidencias/gitignore.png)

### Despliegue reproducible y cloud

Cumplido con Docker Compose en local y Render en cloud.

Evidencias:

- [render-deploy.png](evidencias/render-deploy.png)

### Análisis de seguridad

Cumplido con herramientas separadas:

- DAST: OWASP ZAP
- análisis de dependencias: OWASP Dependency-Check

Evidencias:

- [zap.png](evidencias/zap.png)
- [owasp-dependency.png](evidencias/owasp-dependency.png)

## 5. Resumen de navegación

Para revisar rápidamente la aplicación:

1. `Login`: acceso mediante GitHub.
2. `Resumen`: estado del usuario, rol y adopciones.
3. `Catálogo`: ofertas visibles para el usuario.
4. `Admin`: gestión de roles y adopciones, solo para `admin`.

## 6. Conclusión

El proyecto cumple los requisitos obligatorios con una arquitectura pequeña, clara y reproducible. La aplicación demuestra autenticación OAuth 2, RBAC, ABAC, integración con Supabase, despliegue en Render, uso de Docker y controles básicos de seguridad, todo ello sin sobreingeniería y con una estructura fácil de explicar.

## 7. Documentación adicional

- [README.md](README.md)
- [guia.md](guia.md)
- [docs/Arquitectura.md](docs/Arquitectura.md)
- [docs/Seguridad.md](docs/Seguridad.md)
