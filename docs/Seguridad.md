# Seguridad

## Autenticacion OAuth 2

La autenticacion se resuelve con Supabase Auth usando GitHub como proveedor OAuth 2. No se implementa login propio ni gestion manual de contrasenas. El frontend recibe la sesion y envia el access token al backend en la cabecera `Authorization`.

## Autorizacion RBAC

Los roles soportados son:

- `admin`
- `client`
- `vet`
- `sales`

La comprobacion RBAC se implementa en el backend dentro de `backend/src/security/rbac.ts` y se aplica desde middlewares o servicios.

## Autorizacion ABAC

La regla ABAC es:

- un usuario `client` solo puede ver ofertas exclusivas si tiene al menos una adopcion registrada

No depende solo del rol. Depende tambien de un atributo de negocio calculado desde la relacion `adoptions`. Esa logica vive en `backend/src/security/abac.ts`.

## Gestion de secretos

- las claves reales no se versionan
- se usan archivos `.env` locales
- el repositorio incluye solo `.env.example`
- la `SUPABASE_SERVICE_ROLE_KEY` solo se usa en backend

## Validacion de entrada

Las validaciones minimas viven en `backend/src/utils/validators.ts`. Se validan UUID, roles, dominio de oferta, textos obligatorios y booleanos antes de ejecutar operaciones de negocio.

## CORS

El backend limita el origen permitido mediante `CORS_ORIGIN`. Esto evita exponer la API a cualquier origen por defecto.

## Proteccion basica de API

- `helmet` para cabeceras HTTP seguras
- `express.json` con limite pequeno de tamano
- rutas protegidas por token Bearer
- errores de autorizacion con `401` o `403`

## Supabase y RLS

Las tablas de negocio tienen RLS activado. No se definen politicas para la clave anon. Eso obliga a que el acceso a datos pase por el backend usando la service role key. Es una configuracion simple, clara y coherente con un prototipo academico pequeno.
