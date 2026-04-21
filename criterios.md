# Criterios de evidencia

Este documento indica exactamente que capturas debes hacer para demostrar, de forma clara y defendible, que el proyecto cumple los criterios obligatorios de seguridad pedidos.

La idea no es hacer muchas capturas, sino hacer las correctas.

## Regla general

Cada captura debe cumplir estas reglas:

- que se vea la URL o el nombre de la herramienta cuando sea relevante
- que se vea la fecha si la herramienta la muestra
- que se vea el dato importante sin recortar demasiado
- que el nombre del archivo de la captura sea descriptivo

Ejemplo de nombres utiles:

- `01-supabase-github-provider.png`
- `02-login-github.png`
- `03-rbac-admin-panel.png`
- `04-abac-cliente-sin-adopcion.png`

## Carpeta recomendada para organizar evidencias

Guarda todas las capturas dentro de una carpeta como esta:

```text
/evidencias
```

Y, si quieres mantenerlo mas ordenado:

```text
/evidencias/oauth
/evidencias/rbac
/evidencias/abac
/evidencias/devsecops
/evidencias/render
```

---

## 1. Autenticacion OAuth 2

Objetivo: demostrar que no hay autenticacion casera y que el acceso se resuelve con GitHub mediante Supabase Auth.

### Captura 1. Proveedor GitHub activado en Supabase

Haz una captura de:

- `Supabase > Authentication > Providers > GitHub`

Debe verse:

- que `GitHub` esta activado
- el formulario del proveedor
- si es posible, el `Client ID` parcialmente visible o al menos el bloque de configuracion

Nombre sugerido:

```text
01-oauth-supabase-github.png
```

### Captura 2. Configuracion de URLs en Supabase

Haz una captura de:

- `Supabase > Authentication > URL Configuration`

Debe verse:

- `Site URL`
- `Redirect URLs`

Nombre sugerido:

```text
02-oauth-supabase-urls.png
```

### Captura 3. Pantalla de login de la aplicacion

Haz una captura de la vista `/login`.

Debe verse:

- el boton `Entrar con GitHub`
- que no existe login por usuario y contrasena propio

Nombre sugerido:

```text
03-oauth-login-app.png
```

### Captura 4. Flujo de autenticacion con GitHub

Haz una captura durante la redireccion o de la pantalla de GitHub al iniciar sesion.

Si no quieres mostrar datos personales, basta con que se vea:

- el logo o interfaz de GitHub
- que el proveedor externo es GitHub

Nombre sugerido:

```text
04-oauth-github-signin.png
```

### Captura 5. Sesion iniciada correctamente en la app

Haz una captura del dashboard una vez autenticado.

Debe verse:

- que el usuario ya esta dentro
- el rol o el correo del usuario

Nombre sugerido:

```text
05-oauth-dashboard-authenticated.png
```

---

## 2. Integracion con Supabase

Objetivo: demostrar que Supabase se usa realmente para autenticacion y datos.

### Captura 6. Tabla `profiles`

Haz una captura de:

- `Supabase > Table Editor > profiles`

Debe verse:

- al menos un usuario real creado tras el login
- su `email`
- su `role`

Nombre sugerido:

```text
06-supabase-profiles-table.png
```

### Captura 7. Tabla `pets`

Haz una captura de:

- `Supabase > Table Editor > pets`

Debe verse:

- las mascotas de ejemplo
- el campo `is_adopted`

Nombre sugerido:

```text
07-supabase-pets-table.png
```

### Captura 8. Tabla `adoptions`

Haz una captura de:

- `Supabase > Table Editor > adoptions`

Debe verse:

- al menos una adopcion registrada
- `client_id`
- `pet_id`

Nombre sugerido:

```text
08-supabase-adoptions-table.png
```

### Captura 9. Tabla `offers`

Haz una captura de:

- `Supabase > Table Editor > offers`

Debe verse:

- al menos una oferta publica
- al menos una oferta exclusiva
- el campo `is_exclusive`
- el campo `domain`

Nombre sugerido:

```text
09-supabase-offers-table.png
```

### Captura 10. SQL ejecutado o esquema creado

Haz una captura del `SQL Editor` con el script de creacion o del historial de queries ejecutadas.

Debe verse:

- que se ha usado el SQL de creacion de tablas
- o que las tablas ya existen en el proyecto

Nombre sugerido:

```text
10-supabase-schema-sql.png
```

---

## 3. RBAC

Objetivo: demostrar que los permisos dependen del rol del usuario.

### Captura 11. Usuario admin con acceso al panel admin

Haz una captura entrando como `admin` en la vista `Admin`.

Debe verse:

- que el panel admin existe
- opciones para asignar rol y registrar adopcion

Nombre sugerido:

```text
11-rbac-admin-panel.png
```

### Captura 12. Cambio de rol desde admin

Haz una captura en el panel admin mostrando:

- selector de usuario
- selector de rol
- accion de actualizar rol

Si puedes, mejor que se vea el resultado despues del cambio.

Nombre sugerido:

```text
12-rbac-role-update.png
```

### Captura 13. Usuario client sin acceso al panel admin

Haz una captura entrando con un usuario `client`.

Debe verse una de estas dos situaciones:

- no aparece el enlace `Admin`
- o si intentas entrar, se redirige fuera del panel

Nombre sugerido:

```text
13-rbac-client-no-admin-access.png
```

### Captura 14. Usuario sales creando oferta de tienda

Haz una captura del catalogo con sesion `sales`.

Debe verse:

- el formulario de crear oferta
- la opcion de `Tienda` habilitada
- la logica de staff visible

Nombre sugerido:

```text
14-rbac-sales-store-offer.png
```

### Captura 15. Usuario vet creando oferta de servicio

Haz una captura del catalogo con sesion `vet`.

Debe verse:

- el formulario de crear oferta
- la opcion `Servicio` habilitada

Nombre sugerido:

```text
15-rbac-vet-service-offer.png
```

### Captura 16. Usuario client sin permisos de creacion

Haz una captura del catalogo con sesion `client`.

Debe verse:

- que el formulario de crear oferta no aparece
- o que el cliente no tiene permisos editoriales

Nombre sugerido:

```text
16-rbac-client-no-create-offer.png
```

---

## 4. ABAC

Objetivo: demostrar que la autorizacion no depende solo del rol, sino tambien de un atributo de negocio: la adopcion.

### Captura 17. Cliente sin adopcion y sin acceso a ofertas exclusivas

Haz una captura del catalogo con un usuario `client` que no tenga adopciones.

Debe verse:

- el mensaje:
  `Debes haber adoptado una mascota para acceder a estas ofertas`
- que no aparecen ofertas exclusivas visibles para ese usuario

Nombre sugerido:

```text
17-abac-client-without-adoption.png
```

### Captura 18. Registro de adopcion desde admin

Haz una captura del panel admin mientras registras una adopcion.

Debe verse:

- cliente seleccionado
- mascota seleccionada
- boton de registrar adopcion

Nombre sugerido:

```text
18-abac-register-adoption.png
```

### Captura 19. Cliente con adopcion y acceso a ofertas exclusivas

Haz una captura del mismo usuario `client` despues de registrar la adopcion.

Debe verse:

- que ya no aparece el mensaje de restriccion
- que ahora si se ven ofertas marcadas como `Oferta exclusiva`

Nombre sugerido:

```text
19-abac-client-with-adoption.png
```

### Captura 20. Evidencia en base de datos de la adopcion

Haz una captura de la tabla `adoptions` donde se vea la relacion creada para ese cliente.

Esta captura refuerza que la ABAC se basa en una relacion real de negocio y no en una variable inventada.

Nombre sugerido:

```text
20-abac-adoption-database-proof.png
```

---

## 5. Gestion de secretos

Objetivo: demostrar que las claves no estan hardcodeadas y que se gestionan con variables de entorno.

### Captura 21. Archivos `.env.example`

Haz una captura de:

- `.env.example`
- `frontend/.env.example`
- `backend/.env.example`

Debe verse:

- que existen plantillas
- que no contienen secretos reales

Nombre sugerido:

```text
21-secrets-env-examples.png
```

### Captura 22. `.gitignore`

Haz una captura de [`.gitignore`](/C:/Users/asier/Documents/Ciberseguridad/PPS/PPS%20-%20Final%20-%20Vue/.gitignore:1).

Debe verse:

- exclusion de `.env`
- exclusion de artefactos sensibles o de build

Nombre sugerido:

```text
22-secrets-gitignore.png
```

### Captura 23. Variables de entorno en Render

Haz una captura de la configuracion de variables del servicio en Render.

Importante:

- no muestres los secretos completos
- si Render los enmascara, perfecto

Debe verse:

- que el backend usa variables para Supabase
- que el frontend usa variables `VITE_*`

Nombre sugerido:

```text
23-secrets-render-env.png
```

---

## 6. Seguridad basica de API

Objetivo: demostrar medidas minimas correctas en backend.

### Captura 24. Archivo de configuracion del entorno

Haz una captura de [backend/src/config/env.ts](/C:/Users/asier/Documents/Ciberseguridad/PPS/PPS%20-%20Final%20-%20Vue/backend/src/config/env.ts:1).

Debe verse:

- validacion de variables requeridas
- punto unico de configuracion

Nombre sugerido:

```text
24-api-env-config.png
```

### Captura 25. Middleware de autenticacion

Haz una captura de [backend/src/middlewares/authentication.ts](/C:/Users/asier/Documents/Ciberseguridad/PPS/PPS%20-%20Final%20-%20Vue/backend/src/middlewares/authentication.ts:1).

Debe verse:

- lectura de token Bearer
- validacion del token con Supabase

Nombre sugerido:

```text
25-api-auth-middleware.png
```

### Captura 26. Middleware o uso de autorizacion

Haz una captura de [backend/src/middlewares/authorization.ts](/C:/Users/asier/Documents/Ciberseguridad/PPS/PPS%20-%20Final%20-%20Vue/backend/src/middlewares/authorization.ts:1).

Debe verse:

- comprobacion de roles
- respuesta `403`

Nombre sugerido:

```text
26-api-rbac-middleware.png
```

### Captura 27. Seguridad HTTP y CORS

Haz una captura de [backend/src/app.ts](/C:/Users/asier/Documents/Ciberseguridad/PPS/PPS%20-%20Final%20-%20Vue/backend/src/app.ts:1).

Debe verse:

- `helmet`
- `cors`
- `express.json` con limite

Nombre sugerido:

```text
27-api-basic-security-config.png
```

### Captura 28. Validacion de entradas

Haz una captura de [backend/src/utils/validators.ts](/C:/Users/asier/Documents/Ciberseguridad/PPS/PPS%20-%20Final%20-%20Vue/backend/src/utils/validators.ts:1).

Debe verse:

- validaciones de rol
- validaciones de UUID
- validaciones de textos

Nombre sugerido:

```text
28-api-input-validation.png
```

---

## 7. SonarQube

Objetivo: demostrar que se ha realizado un analisis SAST.

### Captura 29. SonarQube levantado

Haz una captura del panel principal de SonarQube.

Debe verse:

- URL local o nombre del proyecto
- que SonarQube esta operativo

Nombre sugerido:

```text
29-sonarqube-dashboard.png
```

### Captura 30. Resultado del analisis del proyecto

Haz una captura del proyecto analizado dentro de SonarQube.

Debe verse:

- nombre del proyecto
- issues o metricas
- quality overview

Nombre sugerido:

```text
30-sonarqube-project-analysis.png
```

---

## 8. OWASP Dependency-Check

Objetivo: demostrar que se han analizado dependencias vulnerables.

### Captura 31. Ejecucion del comando o carpeta de salida

Haz una captura del terminal o de la carpeta `logs/dependency-check`.

Debe verse:

- que el informe se ha generado

Nombre sugerido:

```text
31-dependency-check-generated.png
```

### Captura 32. Informe HTML abierto

Abre el reporte HTML y haz una captura.

Debe verse:

- nombre del proyecto
- fecha del analisis
- resumen de vulnerabilidades

Nombre sugerido:

```text
32-dependency-check-report.png
```

---

## 9. OWASP ZAP

Objetivo: demostrar que se ha ejecutado un analisis DAST basico sobre la aplicacion desplegada o local.

### Captura 33. Ejecucion de ZAP baseline

Haz una captura del terminal o de la carpeta `logs/zap`.

Debe verse:

- que se generaron `zap-report.html` y `zap-report.json`

Nombre sugerido:

```text
33-zap-generated-files.png
```

### Captura 34. Informe ZAP abierto

Abre `zap-report.html` y haz una captura.

Debe verse:

- URL analizada
- alertas detectadas
- nivel de severidad

Nombre sugerido:

```text
34-zap-report.png
```

---

## 10. Docker y despliegue reproducible

Objetivo: demostrar que el proyecto puede arrancarse de forma reproducible y desplegarse correctamente.

### Captura 35. `docker compose up --build`

Haz una captura del terminal despues del arranque.

Debe verse:

- frontend levantado
- backend levantado
- sin errores criticos

Nombre sugerido:

```text
35-docker-compose-up.png
```

### Captura 36. Backend en Render

Haz una captura del panel del servicio backend en Render.

Debe verse:

- nombre del servicio
- estado desplegado
- URL publica

Nombre sugerido:

```text
36-render-backend.png
```

### Captura 37. Frontend en Render

Haz una captura del panel del servicio frontend en Render.

Debe verse:

- nombre del servicio
- estado desplegado
- URL publica

Nombre sugerido:

```text
37-render-frontend.png
```

### Captura 38. App funcionando en produccion

Haz una captura de la aplicacion ya desplegada en Render.

Debe verse:

- la URL publica
- la app cargada correctamente

Nombre sugerido:

```text
38-render-app-live.png
```

---

## 11. Seleccion minima recomendada si el profesor pide pocas evidencias

Si te piden pocas capturas, estas son las imprescindibles:

1. GitHub activado en Supabase
2. Login con GitHub en la app
3. Tabla `profiles`
4. Admin asignando rol
5. Cliente sin adopcion sin acceso a exclusivas
6. Admin registrando adopcion
7. Cliente con adopcion viendo exclusivas
8. SonarQube resultado
9. Dependency-Check reporte
10. ZAP reporte
11. Docker Compose levantado
12. Frontend y backend en Render

---

## 12. Orden ideal para enseñarlas en la memoria o defensa

Sigue este orden para que la explicacion tenga sentido:

1. Supabase y OAuth
2. Login real en la aplicacion
3. Integracion con tablas
4. RBAC
5. ABAC
6. Gestion de secretos
7. Seguridad basica de API
8. SonarQube
9. Dependency-Check
10. ZAP
11. Docker y Render

Ese orden hace que la defensa quede muy clara: primero identidad, luego autorizacion, luego controles de seguridad, y al final despliegue reproducible.
