create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  full_name text,
  role text not null default 'client' check (role in ('admin', 'client', 'vet', 'sales'))
);

create table if not exists public.pets (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  species text not null,
  is_adopted boolean not null default false
);

create table if not exists public.adoptions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles (id) on delete cascade,
  pet_id uuid not null unique references public.pets (id) on delete restrict,
  adopted_at timestamptz not null default now()
);

create table if not exists public.offers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  domain text not null check (domain in ('store', 'service')),
  is_exclusive boolean not null default false,
  created_by uuid not null references public.profiles (id) on delete restrict
);

alter table public.profiles enable row level security;
alter table public.pets enable row level security;
alter table public.adoptions enable row level security;
alter table public.offers enable row level security;

insert into public.pets (name, species, is_adopted)
values
  ('Luna', 'Perro', false),
  ('Milo', 'Gato', false)
on conflict do nothing;

