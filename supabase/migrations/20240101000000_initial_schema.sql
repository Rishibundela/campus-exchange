-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── profiles ────────────────────────────────────────────────────────────────
create table public.profiles (
  id          uuid references auth.users on delete cascade primary key,
  name        text not null,
  college     text,
  course      text,
  year        text,
  avatar_url  text,
  contact_info text,
  created_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

-- ─── items ───────────────────────────────────────────────────────────────────
create table public.items (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  description text not null,
  price       numeric(10,2) not null check (price >= 0),
  category    text not null,
  condition   text not null check (condition in ('New', 'Like New', 'Good', 'Fair')),
  status      text not null default 'available' check (status in ('available', 'sold')),
  image_url   text,
  location    text,
  seller_id   uuid not null references public.profiles on delete cascade,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.items enable row level security;

create policy "Items are viewable by everyone"
  on public.items for select using (true);

create policy "Authenticated users can create items"
  on public.items for insert with check (auth.uid() = seller_id);

create policy "Sellers can update their own items"
  on public.items for update using (auth.uid() = seller_id);

create policy "Sellers can delete their own items"
  on public.items for delete using (auth.uid() = seller_id);

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger on_items_updated
  before update on public.items
  for each row execute procedure public.handle_updated_at();

-- ─── wishlist ────────────────────────────────────────────────────────────────
create table public.wishlist (
  id         uuid primary key default uuid_generate_v4(),
  user_id    uuid not null references public.profiles on delete cascade,
  item_id    uuid not null references public.items on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, item_id)
);

alter table public.wishlist enable row level security;

create policy "Users can view their own wishlist"
  on public.wishlist for select using (auth.uid() = user_id);

create policy "Users can add to their own wishlist"
  on public.wishlist for insert with check (auth.uid() = user_id);

create policy "Users can remove from their own wishlist"
  on public.wishlist for delete using (auth.uid() = user_id);

-- ─── messages ────────────────────────────────────────────────────────────────
create table public.messages (
  id          uuid primary key default uuid_generate_v4(),
  sender_id   uuid not null references public.profiles on delete cascade,
  receiver_id uuid not null references public.profiles on delete cascade,
  item_id     uuid references public.items on delete set null,
  content     text not null,
  read        boolean not null default false,
  created_at  timestamptz not null default now()
);

alter table public.messages enable row level security;

create policy "Users can view their own messages"
  on public.messages for select using (
    auth.uid() = sender_id or auth.uid() = receiver_id
  );

create policy "Authenticated users can send messages"
  on public.messages for insert with check (auth.uid() = sender_id);

create policy "Receivers can mark messages as read"
  on public.messages for update using (auth.uid() = receiver_id);

-- ─── reviews ─────────────────────────────────────────────────────────────────
create table public.reviews (
  id          uuid primary key default uuid_generate_v4(),
  reviewer_id uuid not null references public.profiles on delete cascade,
  seller_id   uuid not null references public.profiles on delete cascade,
  item_id     uuid references public.items on delete set null,
  rating      smallint not null check (rating between 1 and 5),
  comment     text,
  created_at  timestamptz not null default now(),
  unique (reviewer_id, item_id)
);

alter table public.reviews enable row level security;

create policy "Reviews are viewable by everyone"
  on public.reviews for select using (true);

create policy "Authenticated users can create reviews"
  on public.reviews for insert with check (auth.uid() = reviewer_id);

-- ─── storage bucket ──────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
  values ('item-images', 'item-images', true)
  on conflict (id) do nothing;

create policy "Item images are publicly accessible"
  on storage.objects for select using (bucket_id = 'item-images');

create policy "Authenticated users can upload item images"
  on storage.objects for insert with check (
    bucket_id = 'item-images' and auth.role() = 'authenticated'
  );

create policy "Users can delete their own item images"
  on storage.objects for delete using (
    bucket_id = 'item-images' and auth.uid()::text = (storage.foldername(name))[1]
  );
