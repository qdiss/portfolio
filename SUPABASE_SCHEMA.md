# Supabase Schema

## Tabela: `posts`

```sql
create table posts (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text not null unique,
  excerpt     text,
  content     text,
  cover_url   text,
  published   boolean default false,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- RLS: samo javno čitanje objavljenih postova
alter table posts enable row level security;

create policy "Public read published posts"
  on posts for select
  using (published = true);

-- Admin može sve (autorizirani korisnik)
create policy "Admin full access"
  on posts for all
  using (auth.role() = 'authenticated');
```

### Kolone

| Kolona       | Tip          | Opis                                  |
|--------------|--------------|---------------------------------------|
| `id`         | uuid         | Primary key                           |
| `title`      | text         | Naslov posta                          |
| `slug`       | text         | URL slug, mora biti jedinstven        |
| `excerpt`    | text         | Kratki opis za listing                |
| `content`    | text         | Cijeli sadržaj (Markdown)             |
| `cover_url`  | text         | URL cover slike (opcionalno)          |
| `published`  | boolean      | Da li je post vidljiv javno           |
| `created_at` | timestamptz  | Datum kreiranja                       |
| `updated_at` | timestamptz  | Datum zadnje izmjene                  |
