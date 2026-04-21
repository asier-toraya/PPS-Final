# VetCare Mini

VetCare Mini es un proyecto final deliberadamente pequeno para una asignatura. Demuestra autenticacion OAuth 2 con Supabase, RBAC por roles, ABAC ligado a una adopcion, backend Node.js con TypeScript, frontend Vue 3 con Vite, despliegue reproducible con Docker y una base documental separada por temas.

## Stack

- Frontend: Vue 3 + Vite + TypeScript + CSS simple
- Backend: Node.js + Express + TypeScript
- Autenticacion y base de datos: Supabase
- Contenedores: Docker + Docker Compose
- Despliegue previsto: Render + Supabase externo

## Arranque rapido

1. Copiar `.env.example` a `.env` para que Docker Compose tenga las variables `VITE_*`.
2. Copiar `frontend/.env.example` a `frontend/.env` para desarrollo con Vite.
3. Copiar `backend/.env.example` a `backend/.env`.
4. Rellenar las variables de Supabase.
5. Ejecutar el SQL de [supabase/schema.sql](/C:/Users/asier/Documents/Ciberseguridad/PPS/PPS%20-%20Final%20-%20Vue/supabase/schema.sql:1) en el editor SQL de Supabase.
6. Lanzar `docker compose up --build`.
7. Abrir `http://localhost:8080`.

## Requisitos cumplidos

- OAuth 2 con GitHub mediante Supabase Auth
- RBAC con `admin`, `client`, `vet` y `sales`
- ABAC con la regla "cliente con adopcion ve ofertas exclusivas"
- Integracion con Supabase para auth y datos
- Docker Compose para reproduccion local
- Despliegue pensado para Render
- Scripts y flujo minimo para SonarQube, OWASP Dependency-Check y OWASP ZAP
- Gestion de secretos con variables de entorno y ejemplos sin secretos reales

## Documentacion

- [Arquitectura](/C:/Users/asier/Documents/Ciberseguridad/PPS/PPS%20-%20Final%20-%20Vue/docs/Arquitectura.md)
- [Workflow](/C:/Users/asier/Documents/Ciberseguridad/PPS/PPS%20-%20Final%20-%20Vue/docs/Workflow.md)
- [Rutas](/C:/Users/asier/Documents/Ciberseguridad/PPS/PPS%20-%20Final%20-%20Vue/docs/Rutas.md)
- [Seguridad](/C:/Users/asier/Documents/Ciberseguridad/PPS/PPS%20-%20Final%20-%20Vue/docs/Seguridad.md)
- [Modelo de datos](/C:/Users/asier/Documents/Ciberseguridad/PPS/PPS%20-%20Final%20-%20Vue/docs/ModeloDeDatos.md)
- [Despliegue](/C:/Users/asier/Documents/Ciberseguridad/PPS/PPS%20-%20Final%20-%20Vue/docs/Despliegue.md)
- [DevSecOps](/C:/Users/asier/Documents/Ciberseguridad/PPS/PPS%20-%20Final%20-%20Vue/docs/DevSecOps.md)
- [Estructura](/C:/Users/asier/Documents/Ciberseguridad/PPS/PPS%20-%20Final%20-%20Vue/docs/Estructura.md)
