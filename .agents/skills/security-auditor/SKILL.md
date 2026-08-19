---
name: security-auditor
description: >-
  Use this skill when the user asks to run a security audit on their project or codebase.
  This skill provides a runbook for checking common web and frontend vulnerabilities.
---

# Security Auditor Skill

Esta skill te guía paso a paso para realizar una auditoría de seguridad en un proyecto frontend. Cuando el usuario solicite auditar su proyecto, sigue estos pasos:

## 1. Escaneo de Secretos y Archivos Sensibles
Busca si el proyecto tiene credenciales expuestas, tokens de API o archivos que no deberían estar en el repositorio.
- Comprueba si existe un archivo `.gitignore` y si excluye correctamente `.env`, `node_modules` y directorios de compilación.
- Busca cadenas como `API_KEY`, `secret`, `token`, `password` dentro de archivos JavaScript (`*.js`) o HTML que pudieran estar hardcodeados en el frontend.

## 2. Auditoría de Dependencias (NPM)
Si el proyecto utiliza Node.js (`package.json`), verifica la seguridad de las dependencias.
- Navega a los subdirectorios que contengan un `package.json` (ej. `pages/Ladrones`, `pages/Nishino`).
- Ejecuta el comando `npm audit` en la terminal para identificar vulnerabilidades conocidas en las dependencias.
- Sugiere ejecutar `npm audit fix` si encuentras vulnerabilidades solucionables automáticamente.

## 3. Seguridad de Enlaces Externos
Los enlaces que abren nuevas pestañas (`target="_blank"`) pueden exponer la página a ataques de *tabnabbing* si no se protegen.
- Utiliza la herramienta de búsqueda para escanear archivos HTML buscando `<a target="_blank"`.
- Asegúrate de que **todos** los enlaces externos incluyan `rel="noopener noreferrer"`.
- Si encuentras alguno que no lo tenga, corrígelo usando `replace_file_content`.

## 4. Archivos de Configuración de Servidor
Revisa la seguridad en la configuración de alojamiento si existe (ej. `.htaccess`, `netlify.toml`, `vercel.json`).
- Si existe un `.htaccess`, verifica que se prevea el bloqueo de listado de directorios (`Options -Indexes`).
- Comprueba si se están configurando encabezados de seguridad básicos como `X-Content-Type-Options: nosniff` o `Strict-Transport-Security`.

## Reporte Final
Una vez que termines de evaluar estos 4 puntos, genera un artefacto (archivo `.md` en la carpeta de artefactos de la conversación) con el reporte de la auditoría de seguridad estructurado:
- Hallazgos críticos (P0)
- Recomendaciones y advertencias (P1/P2)
- Soluciones aplicadas

Finaliza comunicándole al usuario un resumen ejecutivo.
