import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, '..', 'src');
const themeJs = fs.readFileSync(path.join(srcDir, 'theme.js'), 'utf8');
const m = themeJs.match(/export const theme = `([\s\S]*)`;/);
if (!m) throw new Error('theme.js: no template match');
fs.writeFileSync(path.join(srcDir, 'theme.css'), m[1].trim() + '\n');
console.log('Wrote theme.css');
