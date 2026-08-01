# Blog SolPure — diseño y guía de autor

Diseño aprobado el 2026-07-31. Rama `feature-blog`.

## Arquitectura

- **Artículos**: fragmentos HTML (solo contenido, sin `<head>` ni `<body>`) en
  `public/blog/articles/<slug>.html`. Vite copia `public/` intacto a `docs/` en el build,
  así que cada artículo queda servido como archivo estático y la SPA lo fetchea en runtime.
- **Manifiesto**: `src/data/blog.ts` — array tipado `ARTICLES` con slug, título, extracto,
  fecha ISO, tags, portada y minutos de lectura. Alimenta listado, búsqueda, filtros y la
  sección de home. Va en el bundle: cero peticiones extra.
- **Rutas** (`react-router`, ya era dependencia): `/` home, `/blog` listado con búsqueda
  (texto normalizado sin tildes sobre título+extracto+tags) y filtro por tags (AND),
  `/blog/:slug` artículo. `BrowserRouter` con `basename` = base de Vite.
- **GitHub Pages**: el script `build` copia `docs/index.html` a `docs/404.html` para que las
  URL profundas (`/blog/...`) carguen la SPA (truco estándar de SPA en Pages).
- **KaTeX**: única dependencia nueva (`katex`). Se carga con `import()` dinámico solo al
  abrir un artículo; `renderMathInElement` procesa `$$…$$` (bloque) y `\(…\)` (inline).

## Cómo escribir un artículo nuevo

1. Crear `public/blog/articles/<slug>.html` copiando los patrones de abajo.
2. Añadir la entrada al array `ARTICLES` en `src/data/blog.ts`.
3. `npm run build` y commit (el build regenera `docs/`).

### Componentes disponibles (clases de `src/styles/blog.css`)

| Patrón | HTML |
|---|---|
| Entradilla | `<p class="article-lead">…</p>` |
| Secciones | `<h2>` / `<h3>` (el `<h1>` lo pone la página con el título del manifiesto) |
| Imagen con pie | `<figure class="article-figure"><img src="…" loading="lazy" /><figcaption>…</figcaption></figure>` |
| Vídeo 16:9 | `<div class="article-video"><iframe src="https://www.youtube-nocookie.com/embed/<id>" allowfullscreen></iframe></div>` |
| Aviso destacado | `<div class="article-callout"><p>…</p></div>` |
| Fórmula en bloque | `<div class="article-formula">$$ … $$</div>` (LaTeX) |
| Fórmula inline | `\( … \)` dentro de cualquier párrafo |
| Tabla | `<table>` estándar con `<thead>`/`<tbody>` |

### Reglas

- Las URLs internas del fragmento (imágenes, anclas a la home) deben ser absolutas con el
  base path: `/Solar-Installation-Company-Website/images/foo.jpg`.
- Las imágenes de portada (`cover` del manifiesto) van sin barra inicial
  (`images/foo.jpg`); los componentes React les anteponen `import.meta.env.BASE_URL`.
- El fragmento no debe incluir el título principal ni la imagen de portada: los renderiza
  `ArticlePage` desde el manifiesto.
