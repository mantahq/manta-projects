import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '..', '.env') });

console.log('Environment variables loaded');
console.log('MANTAHQ_SDK_KEY exists:', !!process.env.MANTAHQ_SDK_KEY);
console.log('APP_NAME:', process.env.APP_NAME);