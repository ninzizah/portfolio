require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'portfolio_db',
    password: process.env.DB_PASSWORD || '1212',
    port: process.env.DB_PORT || 5432,
});

async function migrate() {
    try {
        console.log('Running migration...');
        const query = 'ALTER TABLE projects ADD COLUMN IF NOT EXISTS video_url TEXT';
        await pool.query(query);
        console.log('✅ Added video_url column to projects table.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

migrate();
