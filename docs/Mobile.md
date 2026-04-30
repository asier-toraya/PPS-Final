# Versión móvil

## Objetivo

La versión móvil de este proyecto no reimplementa la aplicación ni añade funcionalidades nuevas.
Se ha hecho un port mínimo de la SPA existente para que pueda ejecutarse como app Android usando Ionic y Capacitor, manteniendo la misma lógica de frontend, el mismo backend y la misma integración con Supabase.

## Enfoque aplicado

La base sigue siendo el frontend Vue 3 original.
Ionic se usa como contenedor ligero en el arranque de la aplicación y Capacitor aporta la capa nativa de Android.

Decisiones principales:

- no se han reescrito las vistas a componentes específicos de Ionic
- no se ha cambiado la navegación funcional de la aplicación
- no se ha añadido almacenamiento nativo, modo offline, notificaciones ni nuevas capacidades móviles
- se ha priorizado que la aplicación actual funcione en Android con el menor cambio posible

## Cambios realizados

### 1. Integración de Ionic y Capacitor

Se han añadido las dependencias necesarias de:

- `@ionic/vue`
- `@ionic/vue-router`
- `@capacitor/core`
- `@capacitor/cli`
- `@capacitor/android`
- `@capacitor/app`
- `@capacitor/browser`

También se ha creado la configuración de Capacitor en:

- [frontend/capacitor.config.ts](../frontend/capacitor.config.ts)

Y se ha generado el proyecto nativo Android en:

- `frontend/android`

### 2. Arranque de la app

La app ahora se monta usando `IonicVue` y `IonApp`, pero conserva el router y las vistas existentes.
Esto permite que la SPA funcione dentro del contenedor nativo sin rediseñar la interfaz.

Archivos relevantes:

- [frontend/src/main.ts](../frontend/src/main.ts)
- [frontend/src/App.vue](../frontend/src/App.vue)

### 3. OAuth móvil con Supabase

En web, el login sigue funcionando por redirección normal.
En móvil, el flujo cambia ligeramente para que funcione dentro de una app:

1. la app solicita a Supabase la URL de login con GitHub
2. se abre el navegador del sistema con `@capacitor/browser`
3. tras autenticarse, Supabase redirige a un deep link de la app
4. la app captura ese deep link con `@capacitor/app`
5. se intercambia el `code` OAuth por la sesión de Supabase

Este enfoque evita depender del `window.location.origin` dentro de una WebView y es la forma mínima correcta de hacer funcionar el login en Android.

Archivos relevantes:

- [frontend/src/composables/useAuth.ts](../frontend/src/composables/useAuth.ts)
- [frontend/src/api/supabase.ts](../frontend/src/api/supabase.ts)
- [frontend/src/config/platform.ts](../frontend/src/config/platform.ts)

### 4. Deep link Android

Se ha registrado el esquema de retorno:

```text
veterinariaasier://auth/callback
```

Ese deep link está declarado en el manifiesto Android para que la app pueda reabrirse tras el login.

Archivo relevante:

- [frontend/android/app/src/main/AndroidManifest.xml](../frontend/android/app/src/main/AndroidManifest.xml)

### 5. Ajustes de estilos mínimos

No se ha rediseñado la interfaz.
Solo se han añadido ajustes pequeños para mejorar el comportamiento en móvil:

- soporte básico de `safe-area`
- mejor manejo de ancho en cabecera y navegación
- altura de viewport más estable en móvil

Archivo relevante:

- [frontend/src/assets/styles.css](../frontend/src/assets/styles.css)

### 6. CORS para web local, web desplegada y móvil

El backend se ha adaptado para aceptar varios orígenes en `CORS_ORIGIN` en vez de uno solo.
Esto permite convivir con:

- frontend local en Vite
- frontend desplegado en Render
- uso futuro del contenedor móvil

Archivos relevantes:

- [backend/src/app.ts](../backend/src/app.ts)
- [backend/src/config/env.ts](../backend/src/config/env.ts)

## Variables de entorno necesarias

### Frontend

El frontend necesita estas variables:

```env
VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=TU_ANON_KEY
VITE_API_BASE_URL=https://TU-BACKEND/api
VITE_WEB_REDIRECT_URL=http://localhost:5173/
VITE_MOBILE_REDIRECT_URL=veterinariaasier://auth/callback
```

Notas:

- `VITE_WEB_REDIRECT_URL` se usa para desarrollo web local con Vite
- `VITE_MOBILE_REDIRECT_URL` se usa para el retorno del login móvil
- `VITE_API_BASE_URL` debe apuntar a un backend accesible desde el dispositivo o emulador; para móvil es más simple usar el backend desplegado

### Backend

El backend necesita:

```env
PORT=3000
CORS_ORIGIN=http://localhost:5173,https://TU-FRONTEND.onrender.com
SUPABASE_URL=https://TU-PROYECTO.supabase.co
SUPABASE_ANON_KEY=TU_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=TU_SERVICE_ROLE_KEY
BOOTSTRAP_ADMIN_EMAIL=tu-correo@gmail.com
```

`CORS_ORIGIN` acepta ahora una lista separada por comas.

## Configuración externa necesaria

## Supabase

En `Authentication > URL Configuration` deben permitirse tanto la versión web como la móvil.

Valores recomendados:

```text
http://localhost:5173
http://localhost:5173/
https://TU-FRONTEND.onrender.com
https://TU-FRONTEND.onrender.com/
veterinariaasier://auth/callback
```

La `Site URL` puede ser la URL pública del frontend desplegado, pero los `Redirect URLs` deben incluir también el entorno local y el deep link móvil.

## GitHub OAuth

La `Authorization callback URL` de GitHub no debe apuntar al frontend ni al deep link.
Debe seguir siendo la callback de Supabase:

```text
https://TU-PROYECTO.supabase.co/auth/v1/callback
```

## Cómo probar la versión móvil

### 1. Validación funcional de la base web

Primero conviene comprobar que la aplicación sigue funcionando como SPA:

```bash
npm run dev --workspace frontend
```

Después:

- abrir `http://localhost:5173`
- comprobar login
- comprobar dashboard
- comprobar catálogo
- comprobar admin si el usuario tiene ese rol

Esto no es todavía la app móvil, pero confirma que la base funcional sigue correcta.

### 2. Generar y sincronizar Android

Desde `frontend`:

```bash
npm run build:android
```

Este comando:

1. compila el frontend
2. copia `dist` al proyecto Android
3. sincroniza Capacitor con la plataforma nativa

### 3. Abrir el proyecto Android

Desde `frontend`:

```bash
npm run cap:open:android
```

Esto abre el proyecto nativo para compilarlo o ejecutarlo con herramientas Android.

### 4. Prueba real en Android

Para probar la app móvil real hace falta al menos:

- JDK 11 o superior
- Android SDK
- `adb`
- dispositivo Android o emulador

Sin eso solo se puede validar la parte web y la generación del wrapper nativo, pero no el comportamiento final como aplicación instalada.

## Estado real de la implementación

La versión móvil actual queda preparada para:

- usar la misma aplicación Vue dentro de Android
- autenticarse con GitHub mediante Supabase
- volver a la app con deep link nativo
- reutilizar el backend y la base de datos ya desplegados

Limitaciones deliberadas de esta versión:

- solo se ha preparado Android
- no hay versión iOS
- no hay capacidades nativas avanzadas
- no hay modo offline
- no hay rediseño completo de UX móvil

## Resumen

La implementación móvil es un wrapper nativo mínimo y pragmático.
La aplicación sigue siendo la misma SPA, pero ahora puede empaquetarse como app Android con un flujo de autenticación compatible con móvil y sin introducir complejidad innecesaria.
