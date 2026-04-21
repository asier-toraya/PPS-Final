# Guía paso a paso

Este documento resume exactamente lo que falta para dejar el proyecto terminado en dos partes:

1. configurar Supabase y OAuth con GitHub
2. desplegar frontend y backend en Render

La idea es que puedas seguirlo sin improvisar y sin tener que leer toda la documentación técnica.

## Nota importante sobre puertos

Con la configuración actual del proyecto:

- backend: `http://localhost:3000`
- frontend con Docker: `http://localhost:8080`

Por tanto, para evitar conflictos y mantener la guía coherente, la URL local del frontend que se usa aquí es:

```text
http://localhost:8080
```

Regla práctica:

- `Homepage URL` en GitHub = URL del frontend
- `Site URL` en Supabase = URL del frontend
- `Redirect URLs` en Supabase = URL del frontend
- `Authorization callback URL` en GitHub = callback de Supabase, no la del frontend

## Parte 1. Dejar Supabase y OAuth funcionando

### 1. Crear el proyecto en Supabase

1. Entra en `https://supabase.com/`.
2. Crea una cuenta o inicia sesión.
3. Pulsa en `New project`.
4. Elige organización, nombre del proyecto, contraseña de base de datos y región.
5. Espera a que el proyecto termine de crearse.

### 2. Obtener las claves necesarias

Dentro del panel de Supabase:

1. Ve a `Project Settings`.
2. Entra en `API`.
3. Copia estos valores:
   - `Project URL`
   - `anon public key`
   - `service_role secret key`

Los vas a usar en los archivos `.env`.

### 3. Preparar los archivos de entorno en local

En tu proyecto crea estos archivos a partir de los ejemplos:

1. Copia `.env.example` a `.env`.
2. Copia `frontend/.env.example` a `frontend/.env`.
3. Copia `backend/.env.example` a `backend/.env`.

Rellena las variables así:

### `.env`

```env
VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=TU_ANON_KEY
VITE_API_BASE_URL=http://localhost:3000/api
```

### `frontend/.env`

```env
VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=TU_ANON_KEY
VITE_API_BASE_URL=http://localhost:3000/api
```

### `backend/.env`

```env
PORT=3000
CORS_ORIGIN=http://localhost:8080
SUPABASE_URL=https://TU-PROYECTO.supabase.co
SUPABASE_ANON_KEY=TU_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=TU_SERVICE_ROLE_KEY
BOOTSTRAP_ADMIN_EMAIL=tu-correo@gmail.com
```

Notas:

- `BOOTSTRAP_ADMIN_EMAIL` debe ser el correo del usuario de GitHub que quieras usar la primera vez como `admin`.
- La `SERVICE_ROLE_KEY` solo debe estar en backend, nunca en frontend.

### 4. Crear las tablas en Supabase

1. En el panel de Supabase, entra en `SQL Editor`.
2. Crea una nueva query.
3. Abre el archivo [supabase/schema.sql](../supabase/schema.sql).
4. Copia todo su contenido.
5. Pégalo en el editor SQL de Supabase.
6. Ejecuta la query.

Con esto quedarán creadas:

- `profiles`
- `pets`
- `adoptions`
- `offers`

Además, se insertarán mascotas de ejemplo.

### 5. Activar login con GitHub

1. En Supabase entra en `Authentication`.
2. Ve a `Providers`.
3. Busca `GitHub`.
4. Activa el proveedor.

Ahora Supabase te pedirá:

- `Client ID`
- `Client Secret`

Esos datos salen de GitHub Developer Settings.

### 6. Crear la OAuth App en GitHub

1. Ve a `https://github.com/settings/developers`.
2. Entra en `OAuth Apps`.
3. Pulsa `New OAuth App`.
4. Rellena como mínimo:
   - `Application name`: por ejemplo `Veterinaria Asier`
   - `Homepage URL`: `http://localhost:8080`
   - `Authorization callback URL`: la callback de Supabase
5. Guarda la aplicación.
6. Copia el `Client ID`.
7. Genera un `Client Secret` y cópialo.

### 7. Configurar la callback correcta en GitHub

En Supabase, dentro del proveedor GitHub, verás una URL de callback parecida a esta:

```text
https://TU-PROYECTO.supabase.co/auth/v1/callback
```

Esa URL exacta es la que debes poner como `Authorization callback URL` en GitHub.

### 8. Pegar Client ID y Client Secret en Supabase

1. Copia el `Client ID` y el `Client Secret` generados en GitHub.
2. Vuelve a Supabase.
3. Pégalos en la configuración del proveedor GitHub.
4. Guarda los cambios.

### 9. Configurar las URLs permitidas en Supabase Auth

En Supabase:

1. Entra en `Authentication`.
2. Ve a `URL Configuration`.

Configura:

#### Site URL

```text
http://localhost:8080
```

#### Redirect URLs

Añade al menos:

```text
http://localhost:8080
http://localhost:8080/
```

Cuando despliegues en Render, aquí añadirás también la URL pública del frontend.

### 10. Arrancar el proyecto en local

Con todo configurado:

```bash
docker compose up --build
```

Después abre:

- frontend: `http://localhost:8080`
- backend: `http://localhost:3000/api/health`

### 11. Probar el login

1. Abre `http://localhost:8080`.
2. Pulsa `Entrar con GitHub`.
3. Inicia sesión con el correo que pusiste como `BOOTSTRAP_ADMIN_EMAIL`.
4. Si todo va bien:
   - entrarás en la app
   - se creará tu perfil en `profiles`
   - tu rol será `admin`

### 12. Comprobar que RBAC funciona

Entra como admin y ve a la vista `Admin`.

Prueba:

1. cambiar el rol de otro usuario a `client`
2. cambiar el rol de otro usuario a `sales`
3. cambiar el rol de otro usuario a `vet`

Resultados esperados:

- solo `admin` puede entrar en `/admin`
- `sales` puede crear ofertas de tienda
- `vet` puede crear ofertas de servicio
- `client` no puede crear ofertas

### 13. Comprobar que ABAC funciona

Para demostrar la regla principal:

1. crea o usa un usuario con rol `client`
2. inicia sesión con ese usuario
3. entra en `Catálogo`
4. comprueba que no ve ofertas exclusivas y que aparece el mensaje:

```text
Debes haber adoptado una mascota para acceder a estas ofertas
```

Después:

1. vuelve a entrar como `admin`
2. abre `Admin`
3. registra una adopción para ese cliente
4. vuelve a entrar como el cliente
5. entra otra vez en `Catálogo`

Resultado esperado:

- ahora el cliente sí puede ver ofertas exclusivas

### 14. Datos mínimos recomendados para la demo

Para una defensa académica sencilla, deja preparados:

- 1 usuario `admin`
- 1 usuario `client` sin adopción
- 1 usuario `client` con adopción
- 1 usuario `sales`
- 1 usuario `vet`
- 2 mascotas
- 1 oferta pública de tienda
- 1 oferta exclusiva de tienda
- 1 oferta pública de servicio
- 1 oferta exclusiva de servicio

Así puedes enseñar:

- OAuth
- RBAC
- ABAC
- gestión mínima real

## Parte 2. Desplegar el proyecto en Render

Render se usará así:

- frontend desplegado como `Static Site`
- backend desplegado como `Web Service`
- Supabase mantenido como servicio externo

### 1. Subir el proyecto a GitHub

Antes de usar Render:

1. crea un repositorio en GitHub
2. sube este proyecto
3. verifica que no subes:
   - `.env`
   - `frontend/.env`
   - `backend/.env`

Si has usado el `.gitignore` del proyecto, esto ya debería estar cubierto.

### 2. Desplegar el backend en Render

1. Entra en `https://render.com/`.
2. Crea cuenta o inicia sesión.
3. Pulsa `New +`.
4. Elige `Web Service`.
5. Conecta tu repositorio de GitHub.
6. Selecciona este proyecto.

Configura el servicio así:

- `Name`: `veterinaria-asier-backend`
- `Root Directory`: `backend`
- `Environment`: `Docker`

Render detectará el `backend/Dockerfile`.

### 3. Añadir variables de entorno del backend

En Render, dentro del backend, añade:

```text
PORT=3000
CORS_ORIGIN=https://TU-FRONTEND.onrender.com
SUPABASE_URL=https://TU-PROYECTO.supabase.co
SUPABASE_ANON_KEY=TU_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=TU_SERVICE_ROLE_KEY
BOOTSTRAP_ADMIN_EMAIL=tu-correo@gmail.com
```

Guarda y despliega.

Cuando termine, copia la URL pública del backend. Será algo parecido a:

```text
https://veterinaria-asier-backend.onrender.com
```

### 4. Probar el backend desplegado

Abre en el navegador:

```text
https://veterinaria-asier-backend.onrender.com/api/health
```

Si responde algo como esto, está bien:

```json
{"status":"ok"}
```

### 5. Desplegar el frontend en Render

1. En Render pulsa `New +`.
2. Elige `Static Site`.
3. Selecciona el mismo repositorio.

Configura así:

- `Name`: `veterinaria-asier-frontend`
- `Root Directory`: `frontend`
- `Build Command`: `npm install && npm run build`
- `Publish Directory`: `dist`

### 6. Añadir variables de entorno del frontend

En el servicio frontend de Render añade:

```text
VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=TU_ANON_KEY
VITE_API_BASE_URL=https://veterinaria-asier-backend.onrender.com/api
```

Guarda y despliega.

Cuando termine, copia la URL pública del frontend. Será algo parecido a:

```text
https://veterinaria-asier-frontend.onrender.com
```

### 7. Actualizar OAuth para producción

Ahora hay que volver a configurar GitHub y Supabase con las URLs reales.

#### En GitHub

Dentro de la OAuth App actualiza:

##### Homepage URL

```text
https://veterinaria-asier-frontend.onrender.com
```

##### Authorization callback URL

Debes mantener la callback de Supabase:

```text
https://TU-PROYECTO.supabase.co/auth/v1/callback
```

#### En Supabase

En `Authentication > URL Configuration` actualiza:

##### Site URL

```text
https://veterinaria-asier-frontend.onrender.com
```

##### Redirect URLs

Añade:

```text
http://localhost:8080
http://localhost:8080/
https://veterinaria-asier-frontend.onrender.com
https://veterinaria-asier-frontend.onrender.com/
```

### 8. Actualizar CORS del backend si hace falta

En Render, revisa que `CORS_ORIGIN` del backend sea exactamente la URL del frontend desplegado:

```text
https://veterinaria-asier-frontend.onrender.com
```

Si la cambias:

1. guarda
2. vuelve a desplegar el backend

### 9. Probar la aplicación completa en producción

Haz esta comprobación final:

1. abre la URL pública del frontend
2. inicia sesión con GitHub
3. comprueba que entras correctamente
4. revisa dashboard
5. revisa catálogo
6. entra como admin y abre `Admin`
7. cambia un rol
8. registra una adopción
9. vuelve a entrar con el cliente y confirma que aparecen ofertas exclusivas

### 10. Checklist final del proyecto

Puedes considerar el proyecto terminado cuando se cumpla todo esto:

- Supabase creado y operativo
- SQL ejecutado
- login con GitHub funcionando
- perfil en `profiles` creado automáticamente
- rol `admin` inicial funcionando
- panel admin operativo
- RBAC comprobado
- ABAC comprobado con adopción real
- backend desplegado en Render
- frontend desplegado en Render
- OAuth funcionando también en producción
- CORS bien configurado
- secretos fuera del repositorio

### 11. Recomendación final para la defensa

Haz capturas de:

- panel de Supabase con GitHub activado
- tablas creadas
- login funcionando
- pantalla de catálogo sin acceso a exclusivas
- pantalla de catálogo con acceso tras adopción
- panel admin
- backend en Render
- frontend en Render

Eso te deja evidencias muy claras para explicar:

- autenticación OAuth 2
- integración con Supabase
- RBAC
- ABAC
- despliegue reproducible
- despliegue cloud en Render
