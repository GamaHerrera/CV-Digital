# Portafolio Gamaliel Herrera – Seguridad y Optimización

## Seguridad recomendada para tu hosting

Configura estos encabezados HTTP en tu proveedor de hosting (Netlify, Vercel, GitHub Pages, etc.):

- `Content-Security-Policy`: Limita fuentes de scripts, estilos e imágenes. Ejemplo:
  ```
  default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' https://cdnjs.cloudflare.com;
  ```
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `Permissions-Policy: geolocation=(), microphone=(), camera=()`

**Activa HTTPS obligatorio** en la configuración de tu hosting.

## Optimización recomendada
- Usa imágenes optimizadas y con `loading="lazy"`, y define siempre `width` y `height`.
- Usa versiones minificadas de CSS y JS.
- Añade `defer` o `async` a los scripts JS cuando sea posible.
- Habilita cacheo de archivos estáticos (configuración del servidor/hosting).

## Accesibilidad
- Usa atributos `alt` descriptivos en imágenes.
- Usa roles y atributos ARIA en elementos interactivos.
- Asegúrate de que todo sea navegable por teclado.

---

## Ejemplo de configuración para Netlify (_headers file_)
```
/*
  Content-Security-Policy: default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' https://cdnjs.cloudflare.com;
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## Recursos útiles
- [securityheaders.com](https://securityheaders.com/)
- [Mozilla Observatory](https://observatory.mozilla.org/)
