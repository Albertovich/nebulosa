# Nebulosa — Sitio único

Sitio estático en HTML/CSS/JS sin dependencias externas. Incluye:

- Modo oscuro/claro con memoria en `localStorage`
- Selector de color de tema
- Animaciones suaves y revelado al hacer scroll
- Formulario con validación en cliente (demo)
- Accesibilidad básica (skip link, roles, labels)

## Estructura

```
.
├── index.html
├── styles.css
└── script.js
```

## Cómo publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub (por ejemplo, `nebulosa`).
2. Sube estos tres archivos a la raíz.
3. (Opcional) añade un archivo vacío llamado `.nojekyll` para desactivar el procesado de Jekyll.
4. En **Settings → Pages**:
   - En **Source** elige **Deploy from a branch**.
   - Branch: **main** y carpeta **/** (root).
5. Guarda. Tu web quedará disponible en `https://<tu-usuario>.github.io/<repo>/`.

> Si prefieres la carpeta `docs/`, mueve los archivos allí y en Pages elige `docs` como carpeta.
