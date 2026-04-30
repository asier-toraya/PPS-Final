# Version mobile web

## Resumen

Se ha implementado una version mobile del frontend web sin duplicar la logica de negocio.
La misma base de codigo puede desplegarse como:

- `web`, orientada a escritorio
- `mobile`, orientada a navegadores moviles

La diferencia entre ambas esta en la interfaz y en la redireccion automatica entre sus dos URLs publicas.

## Que se ha hecho

- Se ha anadido una configuracion de variante de frontend en [frontend/src/config/frontend.ts](../frontend/src/config/frontend.ts).
- La app detecta el dispositivo por `user-agent` antes de montar Vue.
- La version `web` redirige a la URL `mobile` si detecta movil.
- La version `mobile` redirige a la URL `web` si detecta escritorio.
- Se conserva la misma logica de autenticacion, rutas, tipos y llamadas al backend.
- Se ha creado una UI mobile dedicada:
  - cabecera compacta
  - navegacion inferior fija
  - login mobile especifico
  - tarjetas, paneles y formularios adaptados a pantallas pequenas

Archivos principales:

- [frontend/src/main.ts](../frontend/src/main.ts)
- [frontend/src/components/AppShell.vue](../frontend/src/components/AppShell.vue)
- [frontend/src/views/LoginView.vue](../frontend/src/views/LoginView.vue)
- [frontend/src/views/DashboardView.vue](../frontend/src/views/DashboardView.vue)
- [frontend/src/views/CatalogView.vue](../frontend/src/views/CatalogView.vue)
- [frontend/src/views/AdminView.vue](../frontend/src/views/AdminView.vue)
- [frontend/src/assets/styles.css](../frontend/src/assets/styles.css)

## Variables importantes

### Frontend web

```env
VITE_FRONTEND_VARIANT=web
VITE_WEB_SITE_URL=https://pps-final.onrender.com
VITE_MOBILE_SITE_URL=https://mobile-pps-final.onrender.com
VITE_AUTH_REDIRECT_URL=https://pps-final.onrender.com/
```

### Frontend mobile

```env
VITE_FRONTEND_VARIANT=mobile
VITE_WEB_SITE_URL=https://pps-final.onrender.com
VITE_MOBILE_SITE_URL=https://mobile-pps-final.onrender.com
VITE_AUTH_REDIRECT_URL=https://mobile-pps-final.onrender.com/
```

Ademas, ambos despliegues deben compartir:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_API_BASE_URL=...
```

## Configuracion externa

En Supabase deben estar permitidas estas URLs de retorno:

```text
https://pps-final.onrender.com
https://pps-final.onrender.com/
https://mobile-pps-final.onrender.com
https://mobile-pps-final.onrender.com/
```

La callback de GitHub debe seguir apuntando a la callback de Supabase, no al frontend.

## Estado final

La version web y la version mobile ya funcionan como dos despliegues distintos en Render, con redireccion automatica entre ambas y con autenticacion compartida mediante Supabase.
