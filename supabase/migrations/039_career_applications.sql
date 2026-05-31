-- Career applications (submitted via POST /api/careers/apply with service role)
create table if not exists career_applications (
  id uuid primary key default gen_random_uuid(),
  role_id text,
  role_title text not null,
  full_name text not null,
  email text not null,
  phone text,
  linkedin_url text,
  portfolio_url text,
  cover_note text not null,
  resume_path text,
  status text not null default 'new' check (status in ('new', 'reviewed', 'rejected', 'hired')),
  created_at timestamptz not null default now()
);

create index if not exists idx_career_applications_created_at
  on career_applications (created_at desc);

create index if not exists idx_career_applications_role_id
  on career_applications (role_id);

alter table career_applications enable row level security;

-- No public access; server uses SUPABASE_SERVICE_ROLE_KEY for inserts/selects
create policy "No public access to career applications"
  on career_applications
  for all
  using (false)
  with check (false);

comment on table career_applications is 'Job applications from /careers/apply';

-- Private bucket for CV uploads (API uploads via service role)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'career-resumes',
  'career-resumes',
  false,
  5242880,
  array['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
)
on conflict (id) do nothing;
