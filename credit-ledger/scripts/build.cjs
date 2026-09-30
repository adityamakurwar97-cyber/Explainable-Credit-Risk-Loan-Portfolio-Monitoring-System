'use strict';
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const out = path.join(root, 'dist');
const files = ['index.html', 'terms.html', 'dashboard.html', 'assets/styles.css', 'assets/terms.js', 'assets/dashboard.js'];
for (const file of files) {
  if (!fs.statSync(path.join(root, file)).isFile()) throw new Error(`Missing file: ${file}`);
}
fs.rmSync(out, {recursive: true, force: true});
for (const file of files) {
  const target = path.join(out, file);
  fs.mkdirSync(path.dirname(target), {recursive: true});
  fs.copyFileSync(path.join(root, file), target);
}
console.log(`Static build complete: ${files.length} files in dist/`);
