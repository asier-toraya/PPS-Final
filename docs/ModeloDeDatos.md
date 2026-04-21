# Modelo de datos

## Tablas

### `profiles`

- `id` UUID, PK, referencia a `auth.users.id`
- `email` TEXT, unico
- `full_name` TEXT, opcional
- `role` TEXT con valores `admin | client | vet | sales`

### `pets`

- `id` UUID, PK
- `name` TEXT
- `species` TEXT
- `is_adopted` BOOLEAN

### `adoptions`

- `id` UUID, PK
- `client_id` UUID, FK a `profiles.id`
- `pet_id` UUID, FK unica a `pets.id`
- `adopted_at` TIMESTAMPTZ

### `offers`

- `id` UUID, PK
- `title` TEXT
- `description` TEXT
- `domain` TEXT con valores `store | service`
- `is_exclusive` BOOLEAN
- `created_by` UUID, FK a `profiles.id`

## Relaciones

- un `profile` puede tener muchas `adoptions`
- una `pet` solo puede estar en una `adoption`
- un `profile` puede crear muchas `offers`

## Donde se representa la condicion "cliente que adopto"

La condicion no se guarda como un booleano adicional. Se calcula desde la relacion real:

- `profiles.id` -> `adoptions.client_id`

Si el conteo de adopciones del cliente es mayor que cero, entonces el cliente cumple la condicion ABAC para ver ofertas exclusivas.

