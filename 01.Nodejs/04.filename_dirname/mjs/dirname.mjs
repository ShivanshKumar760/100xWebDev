// example.mjs
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the current file path
const __filename = fileURLToPath(import.meta.url);

// Get the directory name
const __dirname = dirname(__filename);

console.log('Directory Name:', __dirname);
