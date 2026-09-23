import fs from 'fs';
import path from 'path';

const assetDir = 'src/.vitepress/dist/assets';
const files = fs.readdirSync(assetDir);
files.sort((a, b) => fs.statSync(path.join(assetDir, b)).size - fs.statSync(path.join(assetDir, a)).size);

console.log('Top 10 largest files in assets:');
for (const f of files.slice(0, 10)) {
  const size = fs.statSync(path.join(assetDir, f)).size;
  console.log(` - ${f}: ${(size / 1024).toFixed(1)} KB`);
}
