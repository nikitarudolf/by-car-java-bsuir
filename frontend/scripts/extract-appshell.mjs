import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, '..', 'src');
const appJs = fs.readFileSync(path.join(srcDir, 'App.js'), 'utf8');
const m = appJs.match(/const styles = `([\s\S]*)`;/);
if (!m) throw new Error('App.js: no styles template match');
let css = m[1].trim() + '\n';
// theme.css already defines fadeUp + .fade-in for components; keep hero animations only
css = css.replace(/\n  @keyframes fadeUp \{[\s\S]*?\n  \}\n\n  \/\* ── PAGE CONTENT/g, '\n  /* @keyframes fadeUp — defined in theme.css */\n\n  /* ── PAGE CONTENT');
fs.writeFileSync(path.join(srcDir, 'app-shell.css'), css);
console.log('Wrote app-shell.css');
