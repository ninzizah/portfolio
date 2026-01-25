require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'portfolio_db',
    password: process.env.DB_PASSWORD || '1212',
    port: process.env.DB_PORT || 5432,
});

async function checkDb() {
    try {
        console.log('🔍 Inspecting Database Content...\n');

        // 1. Projects
        const projects = await pool.query('SELECT id, title, video_url FROM projects');
        console.log(`📂 Projects (${projects.rowCount}):`);
        projects.rows.forEach(p => console.log(`   - [${p.id}] ${p.title} (Video: ${p.video_url ? 'YES' : 'NO'})`));
        console.log('');

        // 2. Skills
        const skills = await pool.query('SELECT category, array_length(items, 1) as count FROM skills');
        console.log(`🛠️  Skills Categories (${skills.rowCount}):`);
        skills.rows.forEach(s => console.log(`   - ${s.category}: ${s.count} items`));
        console.log('');

        // 3. Config
        const config = await pool.query('SELECT hero_name, copyright_text FROM site_config WHERE id=1');
        if (config.rows.length > 0) {
            console.log(`⚙️  Site Config:`);
            console.log(`   - Hero Name: ${config.rows[0].hero_name}`);
            console.log(`   - Copyright: ${config.rows[0].copyright_text || 'Not Set'}`);
        }
        console.log('');

        console.log('✅ Inspection Complete.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error checking DB:', error);
        process.exit(1);
    }
}

checkDb();
