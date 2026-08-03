/*
# Create portfolio tables (single-tenant, no auth)

1. New Tables
- `projects`: stores portfolio project details (title, description, image url, tech tags, live url, repo url, featured flag, display order).
- `skills`: stores skill entries (name, category, proficiency level, icon name).
- `messages`: stores contact form submissions (name, email, message, created_at, read flag).
2. Security
- Enable RLS on all tables.
- `projects` and `skills`: public read (anon + authenticated), no public write since content is curated.
- `messages`: public insert (anyone can submit the contact form), no public read (owner-only in future).
3. Notes
- Single-tenant portfolio: no user_id / auth required.
- Projects and skills are managed via SQL (curated content), so only SELECT is public.
- Messages can be submitted by anyone (INSERT) but not read publicly.
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  tech text[] NOT NULL DEFAULT '{}',
  live_url text,
  repo_url text,
  featured boolean NOT NULL DEFAULT false,
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  proficiency int NOT NULL DEFAULT 80 CHECK (proficiency >= 0 AND proficiency <= 100),
  icon text,
  display_order int NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- projects: public read only
DROP POLICY IF EXISTS "public_read_projects" ON projects;
CREATE POLICY "public_read_projects" ON projects FOR SELECT
  TO anon, authenticated USING (true);

-- skills: public read only
DROP POLICY IF EXISTS "public_read_skills" ON skills;
CREATE POLICY "public_read_skills" ON skills FOR SELECT
  TO anon, authenticated USING (true);

-- messages: public insert only (contact form), no public read
DROP POLICY IF EXISTS "public_insert_messages" ON messages;
CREATE POLICY "public_insert_messages" ON messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);
