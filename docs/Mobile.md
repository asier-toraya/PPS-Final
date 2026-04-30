# Version mobile web

## Objetivo

La aplicacion puede desplegarse ahora como dos frontends web distintos:

- una version `web` orientada a escritorio
- una version `mobile` orientada a navegadores moviles

Ambas comparten autenticacion, logica de negocio, rutas y acceso a backend.
La diferencia esta en la interfaz y en la redireccion automatica entre las dos URLs publicas.

## Enfoque aplicado

No se ha duplicado la logica de aplicacion.
Se ha implementado una sola base de frontend capaz de comportarse como variante `web` o `mobile` segun variables de entorno.

Decisiones principales:

- la deteccion de dispositivo se hace en cliente por `user-agent`
- la redireccion es automatica en ambos sentidos
- la variante `web` redirige a la URL `mobile` si detecta movil
- la variante `mobile` redirige a la URL `web` si detecta escritorio
- la logica de `auth`, API, router y tipos se comparte
- la capa visual cambia segun la variante configurada

## Cambios realizados

### 1. Variante de frontend

Se ha anadido una configuracion de variante en:

- [frontend/src/config/frontend.ts](../frontend/src/config/frontend.ts)

Esa capa resuelve:

- si el frontend actual es `web` o `mobile`
- cual es la URL publica de la version web
- cual es la URL publica de la version mobile
- si el navegador actual debe quedarse o redirigirse a la otra version

### 2. Redireccion automatica entre URLs

En el arranque de la app se ejecuta una comprobacion previa al montaje:

- si la build es `web` y el navegador es movil, redirige a `VITE_MOBILE_SITE_URL`
- si la build es `mobile` y el navegador es escritorio, redirige a `VITE_WEB_SITE_URL`
- se conservan `pathname`, `search` y `hash`

Archivo relevante:

- [frontend/src/main.ts](../frontend/src/main.ts)

### 3. Interfaz mobile dedicada

La variante `mobile` no se limita a ser responsive.
Tiene una composicion visual propia para verse mejor en pantallas pequenas:

- cabecera compacta
- navegacion fija inferior
- login especifico para movil
- tarjetas y paneles en columna
- formularios con espaciado tactil

Archivos relevantes:

- [frontend/src/components/AppShell.vue](../frontend/src/components/AppShell.vue)
- [frontend/src/views/LoginView.vue](../frontend/src/views/LoginView.vue)
- [frontend/src/views/DashboardView.vue](../frontend/src/views/DashboardView.vue)
- [frontend/src/views/CatalogView.vue](../frontend/src/views/CatalogView.vue)
- [frontend/src/views/AdminView.vue](../frontend/src/views/AdminView.vue)
- [frontend/src/assets/styles.css](../frontend/src/assets/styles.css)

### 4. Autenticacion y retorno

La autenticacion web sigue compartida.
Para que cada despliegue vuelva a su propia URL tras el login, el frontend admite:

- `VITE_AUTH_REDIRECT_URL`

Si no se define, se mantiene compatibilidad con:

- `VITE_WEB_REDIRECT_URL`

La autenticacion nativa con Capacitor sigue usando:

- `VITE_MOBILE_REDIRECT_URL`

Archivo relevante:

- [frontend/src/config/platform.ts](../frontend/src/config/platform.ts)

## Variables de entorno necesarias

### Variables comunes de frontend

```env
VITE_FRONTEND_VARIANT=web
VITE_WEB_SITE_URL=https://tu-frontend-web.onrender.com
VITE_MOBILE_SITE_URL=https://tu-frontend-mobile.onrender.com
VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=TU_ANON_KEY
VITE_API_BASE_URL=https://TU-BACKEND/api
VITE_AUTH_REDIRECT_URL=https://tu-frontend-web.onrender.com/
VITE_MOBILE_REDIRECT_URL=veterinariaasier://auth/callback
```

### Despliegue web

Valores esperados:

```env
VITE_FRONTEND_VARIANT=web
VITE_WEB_SITE_URL=https://tu-frontend-web.onrender.com
VITE_MOBILE_SITE_URL=https://tu-frontend-mobile.onrender.com
VITE_AUTH_REDIRECT_URL=https://tu-frontend-web.onrender.com/
```

### Despliegue mobile

Valores esperados:

```env
VITE_FRONTEND_VARIANT=mobile
VITE_WEB_SITE_URL=https://tu-frontend-web.onrender.com
VITE_MOBILE_SITE_URL=https://tu-frontend-mobile.onrender.com
VITE_AUTH_REDIRECT_URL=https://tu-frontend-mobile.onrender.com/
```

## Configuracion externa necesaria

## Supabase

En `Authentication > URL Configuration` deben registrarse las dos URLs publicas:

```text
https://tu-frontend-web.onrender.com
https://tu-frontend-web.onrender.com/
https://tu-frontend-mobile.onrender.com
https://tu-frontend-mobile.onrender.com/
http://localhost:5173
http://localhost:5173/
veterinariaasier://auth/callback
```

## GitHub OAuth

La `Authorization callback URL` debe seguir apuntando a Supabase:

```text
https://TU-PROYECTO.supabase.co/auth/v1/callback
```

No debe apuntar ni a la URL web ni a la URL mobile.

## Render

La idea de despliegue es:

- un servicio Render para la rama web
- un servicio Render para la rama mobile

Cada uno debe usar la misma base de codigo, pero con variables distintas para:

- `VITE_FRONTEND_VARIANT`
- `VITE_AUTH_REDIRECT_URL`
- `VITE_WEB_SITE_URL`
- `VITE_MOBILE_SITE_URL`

## Como probarlo

### 1. Probar la variante web

Arranca el frontend con variante `web`.
En escritorio debe quedarse en la URL web.
Si simulas un navegador movil, debe redirigir a la URL mobile.

### 2. Probar la variante mobile

Arranca o despliega el frontend con variante `mobile`.
En movil debe quedarse en esa URL y mostrar la UI mobile.
En escritorio debe redirigir a la URL web.

### 3. Probar el login

Comprobar en ambas variantes:

- login con GitHub
- retorno a la URL correcta de esa variante
- carga del dashboard
- acceso a catalogo
- acceso a admin segun rol

### 4. Probar rutas internas

Hay que comprobar que la redireccion conserva la ruta actual:

- `/login`
- `/`
- `/catalogo`
- `/admin`

Y que tambien conserva `search` y `hash` cuando existan.

## Resumen

La version mobile web ya no depende solo de CSS responsive.
Ahora existe una variante de frontend especifica para movil, con su propia UI y su propia URL de despliegue, pero compartiendo la logica central con la version de escritorio.
