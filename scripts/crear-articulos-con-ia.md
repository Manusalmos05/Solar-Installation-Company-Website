# Crear artículos nuevos con IA e incorporarlos a la página

Complementa a `blog-design.md`, que define el diseño y los componentes. Este documento es el procedimiento operativo y está escrito para dárselo tal cual a una IA con acceso al repositorio: la IA deja el artículo completamente incorporado al codebase **sin ejecutar el build**; después un dev corre `npm run build`, revisa y commitea.

**Reparto de trabajo:**

| Quién | Hace |
|---|---|
| IA (con acceso al repo) | Escribe el fragmento HTML, lo guarda en su ruta, actualiza el manifiesto `ARTICLES` y ejecuta las verificaciones estáticas de §5 |
| Dev | `npm run build`, revisión visual, verificación de cifras y commit (§6) |

---

## 1. Cómo funciona el blog (lo mínimo que hay que saber)

Un artículo son **dos piezas**:

| Pieza | Ruta | Qué es |
|---|---|---|
| Contenido | `public/blog/articles/<slug>.html` | Fragmento HTML: **sin** `<html>`, `<head>`, `<body>` ni `<h1>` |
| Metadatos | entrada en `ARTICLES` de `src/data/blog.ts` | slug, título, extracto, fecha, tags, portada, minutos |

El fragmento no es una página: `ArticlePage` pinta el `<h1>`, la portada, los tags y la fecha desde el manifiesto, y `ArticleContent` inserta el fragmento debajo.

Al ejecutar el build, cada artículo del manifiesto se prerenderiza a `docs/blog/<slug>/index.html` con su propio `<title>`, meta description (el `excerpt` recortado a 155 caracteres), canonical, Open Graph, JSON-LD de `BlogPosting` y entrada en el sitemap. Todo eso es automático: **la IA no toca `docs/`, ni el sitemap, ni `entry-server.tsx`, ni `robots.txt`**. Con las dos piezas bien puestas, el resto lo genera el build.

---

## 2. El contrato del fragmento

Reglas duras. Si se incumple una, el artículo se rompe o sale duplicado:

1. **Sin `<h1>`.** El título lo pone la página desde el manifiesto. Empezar en `<h2>`.
2. **Sin la imagen de portada.** También la pone la página desde `cover`.
3. **Sin `<head>`, `<body>` ni `<!DOCTYPE>`.** Es un fragmento que se inyecta.
4. **Jerarquía sin saltos:** `<h2>` → `<h3>`. Nunca un `<h3>` sin `<h2>` antes.
5. **URLs internas absolutas empezando por `/`**: `/images/placas.webp`, `/#contacto`, `/blog/<otro-slug>`. El `base` de Vite es `/`, y el fragmento se inserta como HTML crudo sin pasar por React.
6. **Toda `<img>` con `alt` descriptivo y `loading="lazy"`.**
7. **La marca es «White Fox Energy».** No «SolPure» (nombre antiguo que aún aparece en artículos viejos).

### Componentes disponibles

Referencia rápida; el detalle está en `blog-design.md`.

| Patrón | HTML |
|---|---|
| Entradilla | `<p class="article-lead">…</p>` |
| Imagen con pie | `<figure class="article-figure"><img src="…" alt="…" loading="lazy" /><figcaption>…</figcaption></figure>` |
| Aviso destacado | `<div class="article-callout"><p>…</p></div>` |
| Fórmula en bloque | `<div class="article-formula">$$ … $$</div>` |
| Fórmula inline | `\( … \)` dentro de un párrafo |
| Vídeo 16:9 | `<div class="article-video"><iframe src="https://www.youtube-nocookie.com/embed/<id>" allowfullscreen></iframe></div>` |
| Tabla | `<table>` con `<thead>` / `<tbody>` |

Los delimitadores de KaTeX son **solo** `$$…$$` (bloque) y `\(…\)` (inline). Un `$…$` suelto no se renderiza: se queda el símbolo del dólar a la vista.

---

## 3. Procedimiento para la IA, paso a paso

Datos de entrada que debe dar quien encarga el artículo: **tema**, **intención de búsqueda** (la pregunta que teclearía el lector en Google) y, opcionalmente, extensión (por defecto 900–1400 palabras).

1. **Leer `src/data/blog.ts`** antes de escribir nada: formato exacto de las entradas, tags ya en uso (derivados de `ALL_TAGS`) y fechas existentes.
2. **Elegir el slug** en kebab-case, sin tildes ni caracteres especiales. Comprobar que no exista ya ni el fichero `public/blog/articles/<slug>.html` ni una entrada con ese slug en el manifiesto.
3. **Escribir el fragmento** en `public/blog/articles/<slug>.html`, cumpliendo el contrato de §2 y la pauta editorial de §4.
4. **Elegir la portada** de entre las imágenes existentes en `public/images/*.webp` (listarlas; no inventar rutas ni añadir imágenes nuevas). En el manifiesto va **sin** barra inicial (`images/placas.webp`), porque los componentes React le anteponen el base path; dentro del fragmento, en cambio, las URLs van con barra inicial (regla 5 de §2).
5. **Añadir la entrada al principio del array `ARTICLES`** (el orden real lo calcula `sortedArticles` por fecha, pero mantener el array ordenado ayuda a leerlo):

```ts
{
  slug: "<slug>",
  title: "<título, máximo 60 caracteres>",
  excerpt: "<resumen de 120-160 caracteres; será la meta description>",
  date: "<AAAA-MM-DD, fecha de hoy>",
  tags: ["<2-4 tags, reutilizando los existentes>"],
  cover: "images/<archivo existente>.webp",
  readingMinutes: <entero, ~200 palabras por minuto>,
},
```

   Si en lugar de crear un artículo se está **editando uno ya publicado**, no cambiar `date`: añadir o actualizar el campo opcional `updated: "<AAAA-MM-DD>"`. Ese campo alimenta `dateModified`, `article:modified_time` y el `lastmod` del sitemap.

6. **No tocar nada más.** Ni `docs/` (es salida de build commiteada), ni `entry-server.tsx`, ni `scripts/prerender.mjs`, ni `robots.txt`, ni el sitemap. No ejecutar `npm run build`.
7. **Ejecutar las verificaciones de §5** y corregir lo que falle antes de dar el trabajo por terminado.

---

## 4. Pauta editorial del contenido

- Español de España, tuteando al lector, tono técnico pero accesible.
- Empezar con `<p class="article-lead">` (2–4 frases que resuman la respuesta a la intención de búsqueda).
- Al menos un ejemplo numérico resuelto con datos de Alicante o Murcia.
- Citar normativa y ayudas por su nombre solo con seguridad: MOVES III, IDAE, REBT, deducción en IRPF. Ante la duda sobre una cifra, no inventarla: escribir «consulta la convocatoria vigente».
- Cerrar con un párrafo que invite a solicitar un estudio gratuito, enlazando a `/#contacto`.
- La empresa se llama White Fox Energy. Nunca SolPure.

---

## 5. Verificación estática (sin build) — la ejecuta la IA

```bash
SLUG=<slug>

# El fragmento no debe llevar h1, head, body ni doctype
grep -iE "<h1|<head|<body|<!DOCTYPE" public/blog/articles/$SLUG.html && echo "✗ contrato roto"

# Saltos de jerarquía: no debe haber h3 antes del primer h2
grep -oE "<h[23]" public/blog/articles/$SLUG.html | head -1   # debe ser <h2

# Imágenes sin alt
grep -oE "<img[^>]*>" public/blog/articles/$SLUG.html | grep -v "alt=" && echo "✗ falta alt"

# Imágenes sin lazy
grep -oE "<img[^>]*>" public/blog/articles/$SLUG.html | grep -v 'loading="lazy"' && echo "✗ falta lazy"

# Dólares sueltos que KaTeX no procesa
grep -nE '(^|[^$\\])\$[^$]' public/blog/articles/$SLUG.html && echo "✗ delimitador inválido"

# Marca antigua
grep -n "SolPure" public/blog/articles/$SLUG.html && echo "✗ marca incorrecta"

# URLs internas con el prefijo antiguo del repo (ya no se usa)
grep -n "Solar-Installation-Company-Website" public/blog/articles/$SLUG.html && echo "✗ base path antiguo"

# El slug del fichero coincide con el del manifiesto
grep -n "\"$SLUG\"" src/data/blog.ts || echo "✗ falta en el manifiesto"

# La portada del manifiesto existe
ls "public/$(grep -A6 "\"$SLUG\"" src/data/blog.ts | grep -oE 'images/[^"]+')" || echo "✗ portada inexistente"

# Las imágenes referenciadas en el cuerpo existen
grep -oE 'src="/images/[^"]*"' public/blog/articles/$SLUG.html \
  | sed 's|src="/|public/|;s/"$//' | xargs -r ls -1 2>&1 | grep -i "no such" && echo "✗ imagen inexistente"

# Solo deben haber cambiado estas dos rutas
git status --short   # esperado: public/blog/articles/$SLUG.html y src/data/blog.ts
```

---

## 6. Lo que hace el dev después

```bash
npm run build
```

El build ya verifica solo buena parte del trabajo: typecheck del manifiesto, y el prerender **aborta con error** si un slug declarado en `ARTICLES` no tiene su fichero HTML o si una ruta renderiza vacía. Si el build pasa, el artículo existe físicamente en `docs/blog/<slug>/index.html` con su `<head>` y está en el sitemap con su `lastmod`.

Revisión visual con `npx vite preview`: abrir `/blog` y `/blog/<slug>` y comprobar que la portada carga, las fórmulas se renderizan (no se ven `$$`), las imágenes del cuerpo cargan, y el artículo aparece en el listado y responde a sus tags.

Y la revisión que ninguna herramienta hace: **leer el artículo y verificar los números**. Una IA redacta bien y calcula mal. Cada cifra de subvención, cada porcentaje de deducción y cada resultado de fórmula hay que comprobarlo a mano. Publicar un importe erróneo sobre ayudas públicas es un problema real, no una errata.

Commit: incluir juntos `public/blog/articles/<slug>.html`, `src/data/blog.ts` y el `docs/` regenerado (es build commiteado, convención del repo). Mensaje corto en minúsculas, como los existentes.

---

## 7. Notas de estado

- El prerender por ruta está activo: los artículos se sirven con HTTP 200 y HTML completo, indexables por Google y legibles por crawlers sin JavaScript (GPTBot, ClaudeBot, etc.).
- `robots.txt` bloquea `/blog/articles/` para que los fragmentos crudos no compitan en buscadores con las páginas prerenderizadas.
- El `base` de Vite es `/` y los artículos antiguos ya están migrados a URLs con `/`; el prefijo `/Solar-Installation-Company-Website/` es historia (de ahí el check de §5).
