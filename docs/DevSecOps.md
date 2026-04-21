# DevSecOps minimo

## SonarQube

### Levantar SonarQube local

```bash
npm run security:sonarqube:up
```

Abrir `http://localhost:9000`. El usuario y la clave iniciales de SonarQube suelen ser `admin / admin`.

### Lanzar analisis

Instalar `sonar-scanner` en el equipo o usar la extension correspondiente y ejecutar:

```bash
sonar-scanner
```

### Evidencia util

- capturas del dashboard de issues
- metricas de code smells y maintainability
- fecha de analisis y project key

## OWASP Dependency-Check

```bash
npm run security:dependency-check
```

Genera un informe HTML en `logs/dependency-check`.

### Evidencia util

- informe HTML exportado
- listado de CVEs detectadas o la ausencia de ellas
- fecha del analisis

## OWASP ZAP

Primero levantar la aplicacion:

```bash
docker compose up --build -d
```

Despues ejecutar:

```bash
npm run security:zap
```

Genera `logs/zap/zap-report.html` y `logs/zap/zap-report.json`.

### Evidencia util

- baseline report HTML
- alertas por severidad
- URL analizada

## Uso academico recomendado

- incluir una captura por herramienta
- citar el comando ejecutado
- indicar que son controles minimos de SAST, analisis de dependencias y DAST
- explicar que se han mantenido simples para no sobredimensionar el proyecto

