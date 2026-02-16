-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Signatures table
create table if not exists signatures (
  id uuid primary key default uuid_generate_v4(),
  first_name text not null,
  last_name text not null,
  email text not null unique,
  message text,
  created_at timestamp with time zone default now()
);

-- Index for ordering by creation date
create index if not exists signatures_created_at_idx on signatures(created_at desc);

-- Row Level Security
alter table signatures enable row level security;

-- Allow anonymous inserts
create policy "Allow anonymous inserts" on signatures
  for insert with check (true);

-- Allow anonymous count
create policy "Allow anonymous select count" on signatures
  for select using (true);
