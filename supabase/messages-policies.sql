alter table public.messages enable row level security;

drop policy if exists "public read messages" on public.messages;
drop policy if exists "public insert messages" on public.messages;

create policy "public read messages"
on public.messages
for select
using (true);

create policy "public insert messages"
on public.messages
for insert
with check (
  char_length(nickname) between 1 and 40
  and char_length(content) between 1 and 500
  and char_length(coalesce(contact, '')) <= 120
);
