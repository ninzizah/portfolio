require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Postgres Configuration
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Fallback for local development
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'portfolio_db',
    password: process.env.DB_PASSWORD || '1212',
    port: process.env.DB_PORT || 5432,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
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

// 1. CONFIG
app.get('/api/config', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM site_config WHERE id = 1');
        if (result.rows.length > 0) {
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
                copyrightText: row.copyright_text
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

// 2. PROJECTS
app.get('/api/projects', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM projects ORDER BY id ASC');
        const projects = result.rows.map(row => ({
            id: row.id.toString(),
            title: row.title,
            description: row.description,
            tech: row.tech,
            github: row.github,
            link: row.external,
            imageUrl: row.image_url,
            videoUrl: row.video_url
        }));
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'DB Error' });
    }
});

app.post('/api/projects', async (req, res) => {
    const { title, description, tech, github, link, imageUrl, videoUrl } = req.body;
    try {
        const query = `
      INSERT INTO projects (title, description, tech, github, external, image_url, video_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        const result = await pool.query(query, [title, description, tech, github, link, imageUrl, videoUrl]);
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
        const result = await pool.query(query, [title, description, tech, github, link, imageUrl, videoUrl, id]);
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

// 3. RESEARCH
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

// 4. SKILLS
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

// 5. MESSAGES
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, message } = req.body;
    try {
        const query = 'INSERT INTO messages (name, email, phone, message, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *';
        const result = await pool.query(query, [name, email, phone, message]);

        // Email Notification
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_USER, // Sending to yourself
                subject: `New Portfolio Message from ${name}`,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                        <h2 style="color: #4f46e5;">New Briefing Received</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                        <p><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                `
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }

        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ success: false });
    }
});

app.get('/api/messages', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'DB Error' });
    }
});

app.delete('/api/messages/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM messages WHERE id = $1', [req.params.id]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Delete Failed' });
    }
});


// Serve Static Files (Vite Build)
app.use(express.static(path.join(__dirname, '../dist')));

// Handle Client-Side Routing
// Express 5 requires Regex or distinct syntax for wildcards
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
