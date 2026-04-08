# Supabase Setup & Testing Checklist

Hay dos formas de probar: **Local con Docker** (recomendado para dev) o **Cloud con free tier**. Elige una.

---

## Opcion A: Supabase Local (Docker)

### Prerequisitos

- [ ] **Docker Desktop** instalado y corriendo
  - Windows: https://docs.docker.com/desktop/setup/install/windows-install/
  - Verificar: `docker --version`
- [ ] **Supabase CLI** instalado
  ```bash
  npm install -g supabase
  ```
  - Verificar: `supabase --version`

### 1. Inicializar Supabase local

```bash
supabase init
```

Esto crea `supabase/config.toml`. Si ya existe, OK.

### 2. Arrancar Supabase local

```bash
supabase start
```

Esto levanta Postgres, Auth, Storage, etc. en Docker. La primera vez descarga imagenes (~2-3 min).

Al terminar, muestra las credenciales:

```
API URL:     http://127.0.0.1:54321
anon key:    eyJ...
service_role key: eyJ...
DB URL:      postgresql://postgres:postgres@127.0.0.1:54322/postgres
Studio URL:  http://127.0.0.1:54323
```

### 3. Crear .env.local

```bash
cp .env.example .env.local
```

Editar `.env.local` con los valores del paso anterior:

```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key del output>
SUPABASE_SERVICE_ROLE_KEY=<service_role key del output>
ADMIN_PASSWORD=admin123
```

### 4. Ejecutar la migracion

```bash
supabase db reset
```

Esto ejecuta automaticamente todos los archivos en `supabase/migrations/`.

**Alternativa manual** (si `db reset` falla):
- Abrir Supabase Studio: http://127.0.0.1:54323
- Ir a SQL Editor
- Pegar el contenido de `supabase/migrations/001_initial_schema.sql`
- Ejecutar

### 5. Poblar la base de datos (seed)

```bash
npx tsx scripts/seed.ts
```

Deberias ver:

```
Seeding Supabase database...

✓ assessment_types: 3 rows
✓ dimensions: 7 rows
✓ roles: 17 rows
  general: 15 questions
  company: 35 questions
  role: 561 questions (17 roles)
✓ questions: 611 total

✅ Seed complete!
```

### 6. Verificar en Studio

- Abrir http://127.0.0.1:54323
- Table Editor → assessment_types (3 rows)
- Table Editor → questions (611 rows)
- Table Editor → roles (17 rows)
- Table Editor → dimensions (7 rows)

### 7. Arrancar Next.js

```bash
npm run dev
```

### 8. Parar Supabase local

```bash
supabase stop
```

Los datos persisten entre reinicios. Para borrar todo: `supabase stop --no-backup`.

---

## Opcion B: Supabase Cloud (free tier)

### 1. Crear proyecto

- [ ] Ir a https://supabase.com/dashboard
- [ ] Crear cuenta (si no tienes)
- [ ] "New Project" → elegir nombre, password, region (us-east-1 o closest)
- [ ] Esperar ~2 min a que se provisione

### 2. Obtener credenciales

- [ ] Settings → API → copiar:
  - `Project URL` → sera tu `NEXT_PUBLIC_SUPABASE_URL`
  - `anon public` key → sera tu `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `service_role` key → sera tu `SUPABASE_SERVICE_ROLE_KEY`

### 3. Crear .env.local

```bash
cp .env.example .env.local
```

Editar con las credenciales del dashboard:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
ADMIN_PASSWORD=tu_password_seguro
```

### 4. Ejecutar la migracion

- [ ] En el dashboard de Supabase → SQL Editor
- [ ] Pegar el contenido completo de `supabase/migrations/001_initial_schema.sql`
- [ ] Click "Run"
- [ ] Verificar que no haya errores (deberia decir "Success. No rows returned")

### 5. Poblar la base de datos (seed)

```bash
npx tsx scripts/seed.ts
```

### 6. Verificar

- [ ] Table Editor → questions deberia tener 611 rows

### 7. Arrancar Next.js

```bash
npm run dev
```

---

## Testing Manual (ambas opciones)

### Quiz flow completo

- [ ] Abrir http://localhost:3000/assessment/general?lang=en
- [ ] Completar las 15 preguntas
- [ ] En post-quiz: ingresar email (opcional)
- [ ] Llenar demographics (pais, salary, company type, industry)
- [ ] Verificar que aparecen resultados
- [ ] En Supabase (Studio o Dashboard) → Table Editor → submissions → deberia haber 1 row
- [ ] submissions_answers → deberia haber 15 rows
- [ ] benchmark_aggregates → deberia tener rows para overall + cada segmento demografico

### Admin panel

- [ ] Ir a http://localhost:3000/admin
- [ ] Deberia redirigir a /admin/login
- [ ] Ingresar el ADMIN_PASSWORD que pusiste en .env.local
- [ ] Dashboard: deberia mostrar 1 submission (si completaste el quiz)
- [ ] Submissions: tabla con el submission que hiciste
- [ ] Click "View" en un submission → deberia mostrar detalle con respuestas
- [ ] Questions: lista de preguntas, toggle active, edit
- [ ] Editar una pregunta → cambiar el texto → guardar
- [ ] Volver al quiz → recargar → verificar que muestra el texto actualizado

### Company assessment

- [ ] http://localhost:3000/assessment/company
- [ ] Completar las 35 preguntas
- [ ] Verificar dimension_scores en el submission (Supabase → submissions → ver JSONB)

### Role assessment

- [ ] http://localhost:3000/assessment/role/ux-ui-design
- [ ] Completar las 33 preguntas
- [ ] Verificar que el submission tiene role_id = "ux-ui-design"

### Benchmarks

- [ ] Completar al menos 10 quizzes (puedes hacerlo rapido)
- [ ] Verificar que benchmark_aggregates se actualiza con cada submission
- [ ] Con 10+ submissions, el BenchmarkPanel deberia mostrar datos reales en vez de mock

### CSV Export

- [ ] Admin → Submissions → "Export CSV"
- [ ] Verificar que descarga un .csv con los datos correctos

---

## Troubleshooting

| Problema | Solucion |
|----------|----------|
| `supabase start` falla | Verificar que Docker Desktop esta corriendo |
| Seed script falla con "relation does not exist" | La migracion no se ejecuto. Correr `supabase db reset` o ejecutar el SQL manualmente |
| Quiz no guarda submissions | Verificar .env.local tiene las credenciales correctas. Abrir DevTools → Network → buscar POST /api/submissions |
| Admin login no funciona | Verificar que ADMIN_PASSWORD esta en .env.local y reiniciar `npm run dev` |
| "Failed to fetch questions" | Supabase no esta corriendo o las credenciales son incorrectas |
| Preguntas no aparecen del DB | El seed no se ejecuto. Correr `npx tsx scripts/seed.ts` |
| benchmark_aggregates vacio | El trigger se activa al insertar submissions. Completa un quiz primero |

---

## Comandos utiles

```bash
# Arrancar todo (local)
supabase start && npm run dev

# Re-ejecutar migracion desde cero (local)
supabase db reset && npx tsx scripts/seed.ts

# Ver logs de Supabase local
supabase logs

# Conectarse a Postgres directamente (local)
psql postgresql://postgres:postgres@127.0.0.1:54322/postgres

# Verificar tablas
# En psql o Studio SQL Editor:
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
SELECT count(*) FROM questions;
SELECT count(*) FROM submissions;
SELECT * FROM benchmark_aggregates;
```
