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
        const query = 'ALTER TABLE site_config ADD COLUMN IF NOT EXISTS copyright_text TEXT';
        await pool.query(query);
        console.log('✅ Added copyright_text column to site_config table.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

migrate();
