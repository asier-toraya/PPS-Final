# Workflow

## Flujo principal

1. El usuario entra en la pantalla de login.
2. El frontend redirige a GitHub mediante Supabase Auth.
3. Tras autenticarse, el frontend obtiene la sesion y llama al backend.
4. El backend valida el token con Supabase.
5. Si el perfil no existe en `profiles`, se crea automaticamente con rol `client`, salvo el correo definido como `BOOTSTRAP_ADMIN_EMAIL`.
6. El dashboard muestra rol, numero de adopciones y estado ABAC.
7. El catalogo devuelve solo las ofertas visibles para ese usuario.

## Flujo ABAC

1. Un usuario con rol `client` entra en el catalogo.
2. El backend consulta cuantas adopciones tiene ese cliente.
3. Si tiene al menos una adopcion, puede ver ofertas exclusivas.
4. Si no tiene ninguna, solo ve ofertas publicas y se muestra un mensaje de acceso restringido.

## Flujo admin

1. `admin` entra en `/admin`.
2. Puede cambiar el rol de cualquier perfil.
3. Puede registrar una adopcion asociando un cliente y una mascota disponible.
4. Al registrar una adopcion, la mascota pasa a `is_adopted = true`.
5. Desde ese momento el cliente afectado cumple la condicion ABAC.

## Flujo staff

- `sales` puede crear ofertas de `store`.
- `vet` puede crear ofertas de `service`.
- `admin` puede crear ambas.
- `client` no puede crear ofertas.
