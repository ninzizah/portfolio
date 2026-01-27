require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Fallback for local development
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'portfolio_db',
    password: process.env.DB_PASSWORD || '1212',
    port: process.env.DB_PORT || 5432,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false // Required for Render
});

const originalProjects = [
    {
        title: "AI-Powered Traffic Control System",
        description: "An intelligent reinforcement learning agent that optimizes traffic light timing to reduce congestion in real-time.",
        tech: ["Python", "PyTorch", "SUMO Simulation", "OpenCV"],
        github: "https://github.com/honore/ai-traffic",
        external: "#",
        image_url: ""
    },
    {
        title: "Blockchain Land Registry",
        description: "Decentralized application (DApp) for secure and transparent land property registration and transfer in Rwanda.",
        tech: ["Solidity", "React", "Ethereum", "Web3.js"],
        github: "https://github.com/honore/land-registry",
        external: "#",
        image_url: ""
    }
];

const originalResearch = [
    {
        title: "Optimizing Neural Networks for Edge Devices",
        area: "Artificial Intelligence",
        date: "2024",
        abstract: "Investigating quantization techniques to deploy deep learning models on resource-constrained IoT devices without significant accuracy loss.",
        image_url: ""
    }
];

const originalSkills = [
    {
        category: 'Education',
        items: [
            'Mount Kenya University (MKU)',
            'Bachelor of Science in Information Technology',
            'Focus: Business Information Systems & Software Engineering',
            'Continuous Learning & Research'
        ]
    },
    {
        category: 'Software Development',
        items: [
            'Web & Mobile Applications',
            'Languages: Java, Kotlin, JavaScript, Python, PHP',
            'Frontend: HTML5, CSS3, JavaScript (React)',
            'Mobile: Android (Kotlin), Ionic Framework',
            'Backend: RESTful APIs, Node.js'
        ]
    },
    {
        category: 'Databases & AI',
        items: [
            'MySQL, Firebase, Basic SQL Design',
            'AI-assisted systems & basic model integration',
            'Data-driven application architecture',
            'Data Collection and Analysis'
        ]
    },
    {
        category: 'Tools & Technologies',
        items: [
            'Android Studio, VS Code, GitHub',
            'cPanel, Firebase Console',
            'Version Control: Git',
            'Operating Systems: Linux (Ubuntu)'
        ]
    },
    {
        category: 'Research & Documentation',
        items: [
            'Technical Writing & Applied Research',
            'Problem Definition & Requirements Analysis',
            'System Design & Documentation',
            'Prototyping and Testing'
        ]
    },
    {
        category: 'Personal Attributes',
        items: [
            'Analytical Thinking & Adaptability',
            'Attention to Detail & Detail Oriented',
            'Professional Ethics & Responsibility',
            'Self-Motivation & Continuous Learning'
        ]
    }
];

const fs = require('fs');
const path = require('path');

async function seed() {
    try {
        console.log('Connecting to database...');

        // 0. CREATE TABLES (Run schema.sql first)
        console.log('Creating tables...');
        const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
        await pool.query(schema);
        console.log('✅ Tables created.');

        // 1. Update Schema ensure columns exist (Migrations)
        try {
            await pool.query('ALTER TABLE site_config ADD COLUMN IF NOT EXISTS about_text1 TEXT');
            await pool.query('ALTER TABLE site_config ADD COLUMN IF NOT EXISTS about_text2 TEXT');
            await pool.query('ALTER TABLE site_config ADD COLUMN IF NOT EXISTS phone TEXT');
            await pool.query('ALTER TABLE site_config ADD COLUMN IF NOT EXISTS linkedin TEXT');
            await pool.query('ALTER TABLE projects ADD COLUMN IF NOT EXISTS video_url TEXT');
            await pool.query('ALTER TABLE site_config ADD COLUMN IF NOT EXISTS copyright_text TEXT');
        } catch (e) { console.log('Columns likely exist or alter failed'); }

        // 2. Insert Config with Default "About Me"
        await pool.query(`
        INSERT INTO site_config (id, hero_name, hero_sub, email, whatsapp, about_text1, about_text2)
        VALUES (
            1, 
            'Honore Ninziza', 
            'Software Engineer', 
            'user@example.com', 
            '+250 788 000 000',
            'I am a passionate Software Engineer dedicated to building robust and scalable applications. My journey involves deep diving into full-stack development, mobile apps, and system architecture.',
            'I thrive on solving complex problems and continuously learning new technologies to stay ahead in the rapidly evolving tech landscape.'
        )
        ON CONFLICT (id) DO UPDATE 
        SET 
            hero_name = EXCLUDED.hero_name,
            about_text1 = COALESCE(site_config.about_text1, EXCLUDED.about_text1),
            about_text2 = COALESCE(site_config.about_text2, EXCLUDED.about_text2); 
    `);

        // 3. Projects
        const projCheck = await pool.query('SELECT count(*) FROM projects');
        if (parseInt(projCheck.rows[0].count) === 0) {
            for (const p of originalProjects) {
                await pool.query(
                    'INSERT INTO projects (title, description, tech, github, external, image_url) VALUES ($1, $2, $3, $4, $5, $6)',
                    [p.title, p.description, p.tech, p.github, p.external, p.image_url]
                );
            }
            console.log('✅ Projects seeded.');
        }

        // 4. Research
        const resCheck = await pool.query('SELECT count(*) FROM research');
        if (parseInt(resCheck.rows[0].count) === 0) {
            for (const r of originalResearch) {
                await pool.query(
                    'INSERT INTO research (title, area, date, abstract, image_url) VALUES ($1, $2, $3, $4, $5)',
                    [r.title, r.area, r.date, r.abstract, r.image_url]
                );
            }
            console.log('✅ Research seeded.');
        }

        // 5. Skills - FORCE REFRESH
        await pool.query('DELETE FROM skills');
        for (const s of originalSkills) {
            await pool.query(
                'INSERT INTO skills (category, items) VALUES ($1, $2)',
                [s.category, s.items]
            );
        }
        console.log('✅ Skills RESTORED from original data.');

        console.log('🎉 Database restoration complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seed();
