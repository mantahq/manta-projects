import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

console.log('=== DEBUGGING ENVIRONMENT ===\n');

// Check current directory
console.log('Current directory:', process.cwd());

// Check if .env file exists
const envPath = path.join(process.cwd(), '.env');
console.log('Looking for .env at:', envPath);
console.log('.env exists:', fs.existsSync(envPath));

// Read .env file content (if it exists)
if (fs.existsSync(envPath)) {
    console.log('\n.env file content:');
    console.log('==================');
    console.log(fs.readFileSync(envPath, 'utf8'));
    console.log('==================');
}

// Try to load .env
console.log('\nLoading dotenv...');
dotenv.config();

// Check environment variables
console.log('\nEnvironment variables after loading:');
console.log('MANTAHQ_SDK_KEY:', process.env.MANTAHQ_SDK_KEY || 'UNDEFINED');
console.log('APP_NAME:', process.env.APP_NAME || 'UNDEFINED');

// Check all env vars
console.log('\nAll environment variables starting with M/A:');
Object.keys(process.env)
    .filter(key => key.startsWith('M') || key.startsWith('A'))
    .forEach(key => {
        const value = process.env[key];
        const maskedValue = key.includes('KEY') || key.includes('SECRET') 
            ? '***' + value.slice(-4) 
            : value;
        console.log(`  ${key}: ${maskedValue}`);
    });