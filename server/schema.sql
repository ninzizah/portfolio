-- 1. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    tech TEXT[], 
    github TEXT,
    external TEXT,
    image_url TEXT
);

-- 2. Research Table
CREATE TABLE IF NOT EXISTS research (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    area TEXT,
    date TEXT,
    abstract TEXT,
    image_url TEXT
);

-- 3. Configuration Table (For your Hero Image, CV, etc.)
CREATE TABLE IF NOT EXISTS site_config (
    id INT PRIMARY KEY,
    hero_name TEXT,
    hero_sub TEXT,
    email TEXT,
    whatsapp TEXT,
    github_url TEXT,
    hero_image TEXT,
    cv_url TEXT,
    about_text1 TEXT,
    about_text2 TEXT,
    phone TEXT,
    linkedin TEXT
);

-- 4. Messages Table (if missed)
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 5. Initialize Config Row (Ignore if exists)
INSERT INTO site_config (id, hero_name, hero_sub, email) 
VALUES (1, 'Honore Ninziza', 'Software Engineer', 'user@example.com')
ON CONFLICT (id) DO NOTHING;
