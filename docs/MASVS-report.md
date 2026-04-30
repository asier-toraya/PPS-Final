# Informe breve MASVS

## Contexto

Se ha tomado como referencia el documento [OWASP_MASVS.pdf](./OWASP_MASVS.pdf), concretamente los dominios de control mas relevantes para este proyecto:

- `MASVS-AUTH`
- `MASVS-NETWORK`
- `MASVS-STORAGE`
- `MASVS-PLATFORM`
- `MASVS-CODE`
- `MASVS-RESILIENCE`
- `MASVS-PRIVACY`

El analisis se ha centrado en la implementacion real del proyecto, incluyendo frontend web, variante mobile web, backend Node.js y wrapper Android con Capacitor.

## Puntos fuertes

### 1. Autenticacion y autorizacion bien separadas

El proyecto resuelve la autenticacion con Supabase y OAuth, y traslada la autorizacion importante al backend.
Esto es positivo respecto a `MASVS-AUTH`, porque evita confiar decisiones de seguridad en el cliente.

Aspectos destacados:

- uso de `Bearer token` hacia el backend
- validacion del token en servidor
- aplicacion de RBAC y ABAC en backend
- control de acceso segun rol y contexto de negocio

## 2. Comunicacion de red correctamente planteada

Respecto a `MASVS-NETWORK-1`, la arquitectura esta bien encaminada:

- frontend y backend desplegados por HTTPS
- integracion con Supabase por HTTPS
- envio del token de acceso en cabecera `Authorization`
- backend protegido con `helmet` y control de `CORS`

No se aprecia una mala practica evidente en transporte de credenciales o uso inseguro de la red.

## 3. Validacion de entrada en backend

Respecto a `MASVS-CODE-4`, el backend incluye validaciones explicitas para:

- roles
- UUID
- dominios de oferta
- textos obligatorios
- booleanos

Esto ayuda a reducir errores de entrada y ataques triviales sobre rutas sensibles.

## 4. Minimizacion de permisos en Android

En la parte Android, el manifiesto solo declara el permiso de red:

- `android.permission.INTERNET`

Esto es positivo respecto a `MASVS-PRIVACY-1`, porque la app no solicita permisos innecesarios del dispositivo.

## Debilidades y mejoras importantes

### 1. Sin pinning de certificados

Respecto a `MASVS-NETWORK-2`, no se ha implementado pinning de certificado ni de clave publica para endpoints propios.
Para un proyecto academico puede ser aceptable, pero frente a MASVS queda como control no cubierto.

### 2. Endurecimiento movil todavia basico

La version movil actual funciona, pero su hardening es limitado.
Frente a `MASVS-STORAGE`, `MASVS-PLATFORM` y `MASVS-RESILIENCE`, faltan medidas habituales como:

- almacenamiento seguro nativo explicito para datos sensibles
- proteccion frente a capturas de pantalla
- deteccion de dispositivo comprometido
- anti-tamper
- anti-debug
- ofuscacion especifica

Esto no invalida la solucion, pero deja claro que la seguridad movil esta en una fase inicial.

### 3. Backup Android habilitado

En el manifiesto Android aparece:

- `android:allowBackup="true"`

Eso puede facilitar exposicion de datos de la app en ciertos escenarios de backup y se alinea peor con `MASVS-STORAGE-2`.

### 4. Sin autenticacion adicional para operaciones sensibles

Respecto a `MASVS-AUTH-3`, las operaciones administrativas dependen de la sesion autenticada normal, sin segundo factor ni reautenticacion para acciones sensibles.

En este proyecto es razonable por simplicidad, pero conviene destacarlo como limitacion.

### 5. Sin control de actualizacion forzada

Respecto a `MASVS-CODE-2`, no existe un mecanismo de obligar al usuario a actualizar la aplicacion si se detecta una version vulnerable.

### 6. Privacidad funcional no desarrollada

Respecto a `MASVS-PRIVACY-3` y `MASVS-PRIVACY-4`, no se observa en la aplicacion una capa especifica de:

- transparencia sobre recogida de datos
- gestion de consentimiento
- control del usuario sobre sus datos desde la interfaz

## Valoracion final

La conclusion general es positiva para un proyecto pequeno y academico.
La aplicacion destaca por una decision arquitectonica acertada: la seguridad importante no se deja en el frontend, sino que se concentra en backend y en Supabase.

Lo mas fuerte del proyecto frente a MASVS es:

- autenticacion delegada de forma correcta
- autorizacion aplicada en servidor
- validacion de entrada
- uso de HTTPS y protecciones basicas de API

Lo mas debil del proyecto frente a MASVS es:

- endurecimiento movil avanzado
- resiliencia frente a analisis y manipulacion
- protecciones adicionales de privacidad y almacenamiento seguro

## Resumen ejecutivo

Si hubiera que resumirlo en una sola idea:

> El proyecto cumple razonablemente los controles base de autenticacion, autorizacion y comunicacion segura, pero la capa especifica de seguridad movil avanzada definida por MASVS sigue en un nivel basico.
