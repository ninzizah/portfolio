require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
// Increase limit for Base64 images
app.use(express.json({ limit: '50mb' }));

// Postgres Configuration
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Fallback for local development if DATABASE_URL is not set
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'portfolio_db',
    password: process.env.DB_PASSWORD || '1212',
    port: process.env.DB_PORT || 5432,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false // Required for some cloud DBs
});

// Test Connection
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to PostgreSQL Database');
    release();
});

// --- API ROUTES ---

// 1. MESSAGES
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, message } = req.body;
    try {
        const query = 'INSERT INTO messages (name, email, phone, message, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *';
        const result = await pool.query(query, [name, email, phone, message]);
        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ success: false });
    }
});

// 2. CONFIG
app.get('/api/config', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM site_config WHERE id = 1');
        if (result.rows.length > 0) {
            // Map snake_case database columns to camelCase frontend expectations
            const row = result.rows[0];
            const config = {
                id: row.id,
                heroName: row.hero_name,
                heroSub: row.hero_sub,
                email: row.email,
                whatsapp: row.whatsapp,
                phone: row.phone,
                linkedin: row.linkedin,
                githubUrl: row.github_url,
                heroImage: row.hero_image,
                cvUrl: row.cv_url,
                aboutText1: row.about_text1,
                aboutText2: row.about_text2,
                copyrightText: row.copyright_text // Added
            };
            res.json(config);
        } else {
            res.json({});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'DB Error' });
    }
});

app.post('/api/config', async (req, res) => {
    const { heroName, heroSub, email, whatsapp, phone, linkedin, githubUrl, heroImage, cvUrl, aboutText1, aboutText2, copyrightText } = req.body;
    try {
        const query = `
      UPDATE site_config 
      SET hero_name=$1, hero_sub=$2, email=$3, whatsapp=$4, phone=$5, linkedin=$6, github_url=$7, hero_image=$8, cv_url=$9, about_text1=$10, about_text2=$11, copyright_text=$12
      WHERE id=1 RETURNING *`;
        const result = await pool.query(query, [heroName, heroSub, email, whatsapp, phone, linkedin, githubUrl, heroImage, cvUrl, aboutText1, aboutText2, copyrightText]);
        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Update Failed' });
    }
});

// 3. PROJECTS
app.get('/api/projects', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM projects ORDER BY id ASC');
        // Map snake_case to camelCase
        const projects = result.rows.map(row => ({
            id: row.id.toString(),
            title: row.title,
            description: row.description,
            tech: row.tech,
            github: row.github,
            link: row.external, // Fixed mapping
            imageUrl: row.image_url,
            videoUrl: row.video_url // Added video
        }));
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'DB Error' });
    }
});

app.post('/api/projects', async (req, res) => {
    // Expecting 'link' from frontend, mapping to 'external' in DB
    const { title, description, tech, github, link, imageUrl, videoUrl } = req.body;
    try {
        const query = `
      INSERT INTO projects (title, description, tech, github, external, image_url, video_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        const result = await pool.query(query, [
            title,
            description,
            tech,
            github,
            link, // mapped to external
            imageUrl,
            videoUrl
        ]);
        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Create Failed' });
    }
});

app.put('/api/projects/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, tech, github, link, imageUrl, videoUrl } = req.body;
    try {
        const query = `
        UPDATE projects 
        SET title=$1, description=$2, tech=$3, github=$4, external=$5, image_url=$6, video_url=$7
        WHERE id=$8 RETURNING *`;
        const result = await pool.query(query, [
            title,
            description,
            tech,
            github,
            link, // mapped to external
            imageUrl,
            videoUrl,
            id
        ]);
        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Update Failed' });
    }
});

app.delete('/api/projects/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM projects WHERE id = $1', [req.params.id]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Delete Failed' });
    }
});

// 4. RESEARCH
app.get('/api/research', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM research ORDER BY id ASC');
        const research = result.rows.map(row => ({
            id: row.id.toString(),
            title: row.title,
            area: row.area,
            date: row.date,
            abstract: row.abstract,
            imageUrl: row.image_url
        }));
        res.json(research);
    } catch (error) {
        res.status(500).json({ error: 'DB Error' });
    }
});

app.post('/api/research', async (req, res) => {
    const { title, area, date, abstract, imageUrl } = req.body;
    try {
        const query = `
      INSERT INTO research (title, area, date, abstract, image_url)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const result = await pool.query(query, [title, area, date, abstract, imageUrl]);
        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: 'Create Failed' });
    }
});

app.delete('/api/research/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM research WHERE id = $1', [req.params.id]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Delete Failed' });
    }
});

// 5. SKILLS
app.get('/api/skills', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM skills ORDER BY id ASC');
        const skills = result.rows.map(row => ({
            id: row.id.toString(),
            category: row.category,
            items: row.items
        }));
        res.json(skills);
    } catch (error) {
        res.status(500).json({ error: 'DB Error' });
    }
});

app.post('/api/skills', async (req, res) => {
    const { category, items } = req.body;
    try {
        const query = 'INSERT INTO skills (category, items) VALUES ($1, $2) RETURNING *';
        const result = await pool.query(query, [category, items]);
        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: 'Create Failed' });
    }
});

app.put('/api/skills/:id', async (req, res) => {
    const { id } = req.params;
    const { category, items } = req.body;
    try {
        const query = 'UPDATE skills SET category=$1, items=$2 WHERE id=$3 RETURNING *';
        const result = await pool.query(query, [category, items, id]);
        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: 'Update Failed' });
    }
});

app.delete('/api/skills/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM skills WHERE id = $1', [req.params.id]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Delete Failed' });
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
