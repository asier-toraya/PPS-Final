# Arquitectura minima

## Objetivo

La arquitectura busca cumplir el enunciado con la menor complejidad posible. Se usan solo tres piezas:

- frontend Vue 3 para login, vistas y feedback visual
- backend Node.js para exponer la API y centralizar autorizacion
- Supabase para OAuth 2 y persistencia PostgreSQL

## Decision tecnica principal

La autorizacion se concentra en el backend. Supabase se usa para autenticar y almacenar datos, pero la logica de negocio se mantiene en un punto unico y facil de defender. Esto reduce duplicidad y evita mezclar seguridad entre frontend y SQL de forma innecesaria.

## Reparto de responsabilidades

### Frontend

- inicia sesion con GitHub usando Supabase Auth
- obtiene el token de sesion y lo envia al backend
- muestra el rol del usuario
- muestra el catalogo visible segun la regla ABAC
- permite a `admin` gestionar roles y adopciones
- permite a `sales`, `vet` y `admin` crear ofertas dentro de sus permisos

### Backend

- valida el token OAuth emitido por Supabase
- asegura que exista un perfil local para el usuario autenticado
- aplica RBAC
- aplica ABAC
- organiza las rutas, servicios y repositorios
- escribe y lee datos de Supabase con la service role key

### Supabase

- gestiona el login OAuth 2 con GitHub
- almacena tablas `profiles`, `pets`, `adoptions` y `offers`
- mantiene RLS activado en tablas de negocio para bloquear accesos directos con clave anon

## Dockerizacion

Se dockeriza:

- frontend
- backend
- servicios opcionales de seguridad local: SonarQube, Dependency-Check y ZAP

No se dockeriza Supabase porque se usa como servicio cloud externo, lo que reduce complejidad y facilita la reproducibilidad.
