import fs from 'fs';

const html = fs.readFileSync('src/.vitepress/dist/index.html', 'utf8');
const scriptMatches = [...html.matchAll(/<script[^>]+src=["']([^"']+)["']/g)].map(m => m[1]);
console.log('Scripts loaded directly in index.html:');
scriptMatches.forEach(s => console.log(' - ' + s));

const hasLocalSearch = scriptMatches.some(s => s.includes('localSearchIndex'));
console.log('Is localSearchIndex loaded directly in index.html?', hasLocalSearch);
