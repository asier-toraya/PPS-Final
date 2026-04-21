# Rutas

## Frontend

### `GET /login`

- Vista: login
- Acceso: publico
- Uso: iniciar OAuth con GitHub
- RBAC: no aplica
- ABAC: no aplica

### `GET /`

- Vista: dashboard
- Acceso: cualquier usuario autenticado
- Uso: ver rol, adopciones y resumen
- RBAC: requiere autenticacion
- ABAC: muestra el estado derivado de la adopcion

### `GET /catalogo`

- Vista: catalogo y ofertas
- Acceso: cualquier usuario autenticado
- Uso: ver ofertas visibles y, si el rol lo permite, crear ofertas
- RBAC: `sales`, `vet` y `admin` pueden crear ofertas; `client` no
- ABAC: la visibilidad de ofertas exclusivas depende de si el cliente ha adoptado

### `GET /admin`

- Vista: panel admin
- Acceso: solo `admin`
- Uso: asignar roles y registrar adopciones
- RBAC: si
- ABAC: no

## Backend

### `GET /api/health`

- Acceso: publico
- Uso: comprobar que el backend responde
- RBAC: no
- ABAC: no

### `GET /api/me`

- Acceso: autenticado
- Uso: devolver perfil, adopciones y permisos
- RBAC: autenticacion obligatoria
- ABAC: expone el dato `adoptedPetCount`

### `GET /api/offers`

- Acceso: autenticado
- Uso: devolver ofertas visibles
- RBAC: autenticacion obligatoria
- ABAC: filtra `is_exclusive = true` si el cliente no tiene adopciones

### `POST /api/offers`

- Acceso: `admin`, `sales`, `vet`
- Uso: crear una oferta
- RBAC: `sales` solo `store`, `vet` solo `service`, `admin` ambas
- ABAC: no

### `GET /api/pets`

- Acceso: autenticado
- Uso: listar mascotas disponibles para adopcion
- RBAC: autenticacion obligatoria
- ABAC: no

### `GET /api/admin/summary`

- Acceso: `admin`
- Uso: listar perfiles y mascotas para el panel admin
- RBAC: si
- ABAC: no

### `PATCH /api/admin/users/:userId/role`

- Acceso: `admin`
- Uso: actualizar rol
- RBAC: si
- ABAC: no

### `POST /api/admin/adoptions`

- Acceso: `admin`
- Uso: registrar adopcion
- RBAC: si
- ABAC: crea la relacion que luego activa la regla ABAC
