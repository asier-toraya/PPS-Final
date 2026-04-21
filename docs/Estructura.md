# Estructura

## Carpetas principales

### `/frontend`

- `src/views`: pantallas minimas
- `src/components`: componentes pequenos y reutilizables
- `src/api`: cliente Supabase y llamada HTTP al backend
- `src/composables`: estado de autenticacion
- `src/router`: rutas de frontend
- `src/types`: contratos de datos

### `/backend`

- `src/routes`: endpoints agrupados
- `src/middlewares`: autenticacion y autorizacion
- `src/security`: reglas RBAC y ABAC
- `src/services`: logica de negocio
- `src/repositories`: acceso a datos en Supabase
- `src/config`: variables de entorno
- `src/lib`: clientes compartidos
- `src/utils`: validaciones y helpers HTTP

### `/docs`

Documentacion separada por responsabilidad para facilitar la defensa del proyecto.

### `/supabase`

SQL minimo para crear tablas y dejar RLS activado.

## Donde esta cada responsabilidad

- rutas frontend: `frontend/src/router`
- rutas backend: `backend/src/routes`
- seguridad: `backend/src/security` y `backend/src/middlewares`
- logica de negocio: `backend/src/services`
- acceso a datos: `backend/src/repositories`
- configuracion: `frontend/.env.example`, `backend/.env.example`, `backend/src/config/env.ts`
- documentacion: `README.md` y `docs/*.md`

