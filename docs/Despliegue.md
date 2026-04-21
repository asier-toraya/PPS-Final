# Despliegue

## Local con Docker

1. Crear `.env` desde `.env.example` para Docker Compose.
2. Crear `frontend/.env` y `backend/.env` a partir de los ejemplos.
3. Ejecutar el SQL de `supabase/schema.sql`.
4. Lanzar `docker compose up --build`.
5. Abrir:
   - frontend: `http://localhost:8080`
   - backend: `http://localhost:3000/api/health`

## Variables necesarias

### Frontend

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_API_BASE_URL`

### Backend

- `PORT`
- `CORS_ORIGIN`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `BOOTSTRAP_ADMIN_EMAIL`

## Render

### Backend

1. Crear un Web Service desde el repositorio.
2. Usar `backend/Dockerfile`.
3. Configurar variables de entorno del backend.
4. Publicar el servicio.

### Frontend

Opcion minima recomendada:

1. Crear un Static Site en Render.
2. Root directory: `frontend`
3. Build command: `npm install && npm run build`
4. Publish directory: `dist`
5. Configurar las variables `VITE_*`

Tambien se podria desplegar con `frontend/Dockerfile`, pero para este proyecto el modo Static Site es mas simple.

## Integracion con Supabase

- Supabase permanece externo
- el callback OAuth debe apuntar al dominio final del frontend
- `CORS_ORIGIN` del backend debe coincidir con la URL publica del frontend
