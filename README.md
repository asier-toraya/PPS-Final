# Veterinaria Asier

Veterinaria Asier es un proyecto final pequeno y funcional para una asignatura. La aplicacion cubre tres areas del enunciado de forma minima y clara:

- venta de articulos
- adopcion de mascotas
- servicios veterinarios

La base tecnica demuestra autenticacion OAuth 2 con Supabase, autorizacion RBAC por roles, autorizacion ABAC con la regla de adopcion, backend Node.js con TypeScript, frontend Vue 3 con Vite, despliegue reproducible con Docker y despliegue cloud en Render.

## Stack

- Frontend: Vue 3 + Vite + TypeScript + CSS simple
- Backend: Node.js + Express + TypeScript
- Autenticacion y base de datos: Supabase
- Contenedores: Docker + Docker Compose
- Despliegue: Render + Supabase externo

## Funcionalidad minima

- login con GitHub mediante Supabase Auth
- roles `admin`, `client`, `vet` y `sales`
- catalogo de ofertas
- registro minimo de adopciones
- panel admin para roles y adopciones
- regla de negocio: un cliente con adopcion puede ver ofertas exclusivas

## Arranque rapido en local

1. Copiar `.env.example` a `.env`.
2. Copiar `frontend/.env.example` a `frontend/.env`.
3. Copiar `backend/.env.example` a `backend/.env`.
4. Rellenar las variables de Supabase.
5. Ejecutar el SQL de [supabase/schema.sql](/C:/Users/asier/Documents/Ciberseguridad/PPS/PPS%20-%20Final%20-%20Vue/supabase/schema.sql:1) en el editor SQL de Supabase.
6. Configurar el proveedor GitHub en Supabase y la OAuth App en GitHub.
7. Lanzar:

```bash
docker compose up --build
```

8. Abrir:
   - frontend: `http://localhost:8080`
   - backend: `http://localhost:3000/api/health`

## Requisitos demostrados

- OAuth 2 con GitHub mediante Supabase Auth
- RBAC con `admin`, `client`, `vet` y `sales`
- ABAC con la regla "cliente con adopcion ve ofertas exclusivas"
- integracion con Supabase para autenticacion y datos
- Docker Compose para reproduccion local
- despliegue en Render
- gestion de secretos con variables de entorno
- integracion minima de SonarQube, OWASP Dependency-Check y OWASP ZAP

## Scripts utiles

Desde la raiz del proyecto:

```bash
npm run build
cmd /c npm run security:dependency-check
npm run security:sonarqube:up
npm run security:zap
```

## Despliegue

- frontend: `Static Site` en Render con `Root Directory = frontend`
- backend: `Web Service` en Render con `Root Directory = backend`
- Supabase: servicio externo

La guia paso a paso esta en [guia.md](/C:/Users/asier/Documents/Ciberseguridad/PPS/PPS%20-%20Final%20-%20Vue/guia.md:1).

## Evidencias

La lista exacta de capturas para la memoria y la defensa esta en [criterios.md](/C:/Users/asier/Documents/Ciberseguridad/PPS/PPS%20-%20Final%20-%20Vue/criterios.md:1).

## Documentacion

- [Arquitectura](/C:/Users/asier/Documents/Ciberseguridad/PPS/PPS%20-%20Final%20-%20Vue/docs/Arquitectura.md)
- [Workflow](/C:/Users/asier/Documents/Ciberseguridad/PPS/PPS%20-%20Final%20-%20Vue/docs/Workflow.md)
- [Rutas](/C:/Users/asier/Documents/Ciberseguridad/PPS/PPS%20-%20Final%20-%20Vue/docs/Rutas.md)
- [Seguridad](/C:/Users/asier/Documents/Ciberseguridad/PPS/PPS%20-%20Final%20-%20Vue/docs/Seguridad.md)
- [Modelo de datos](/C:/Users/asier/Documents/Ciberseguridad/PPS/PPS%20-%20Final%20-%20Vue/docs/ModeloDeDatos.md)
- [Despliegue](/C:/Users/asier/Documents/Ciberseguridad/PPS/PPS%20-%20Final%20-%20Vue/docs/Despliegue.md)
- [DevSecOps](/C:/Users/asier/Documents/Ciberseguridad/PPS/PPS%20-%20Final%20-%20Vue/docs/DevSecOps.md)
- [Estructura](/C:/Users/asier/Documents/Ciberseguridad/PPS/PPS%20-%20Final%20-%20Vue/docs/Estructura.md)
