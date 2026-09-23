import fs from 'fs';
import path from 'path';

function walk(dir: string, ext: string[] = []): string[] {
  let res: string[] = [];
  if (!fs.existsSync(dir)) return res;
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      res = res.concat(walk(full, ext));
    } else if (ext.length === 0 || ext.some(e => full.endsWith(e))) {
      res.push(full);
    }
  }
  return res;
}

const distDir = 'src/.vitepress/dist';
if (!fs.existsSync(distDir)) {
  console.error('Dist directory does not exist! Run npm run build first.');
  process.exit(1);
}

const htmlFiles = walk(distDir, ['.html']);
console.log('Total built HTML files:', htmlFiles.length);

const allPages = new Set<string>();
for (const f of htmlFiles) {
  let rel = path.relative(distDir, f).replace(/\\/g, '/');
  // Normalize path
  if (rel === 'index.html') {
    allPages.add('/');
  } else if (rel.endsWith('/index.html')) {
    allPages.add('/' + rel.replace(/\/index\.html$/, ''));
  } else if (rel.endsWith('.html')) {
    allPages.add('/' + rel.replace(/\.html$/, ''));
  }
}

console.log('Total distinct pages in dist:', allPages.size);

const inDegree = new Map<string, number>();
for (const p of allPages) {
  inDegree.set(p, 0);
}
inDegree.set('/', 1); // Root

for (const f of htmlFiles) {
  const content = fs.readFileSync(f, 'utf8');
  const hrefs = content.matchAll(/href=["']([^"']+)["']/g);
  for (const m of hrefs) {
    let target = m[1];
    // Remove query, hash, hostname
    target = target.replace(/^https?:\/\/jichangtuijian\.run/, '');
    if (!target.startsWith('/') || target.startsWith('//') || target.startsWith('/go/')) {
      continue;
    }
    target = target.replace(/#.*$/, '').replace(/\?.*$/, '').replace(/\.html$/, '').replace(/\/$/, '');
    if (target === '') target = '/';
    
    if (inDegree.has(target)) {
      inDegree.set(target, (inDegree.get(target) || 0) + 1);
    }
  }
}

const orphans: string[] = [];
for (const [page, count] of inDegree) {
  // Ignore 404.html, go/* redirects
  if (page === '/404' || page.startsWith('/go/')) continue;
  if (count === 0 && page !== '/') {
    orphans.push(page);
  }
}

console.log('Actual HTML orphan pages count:', orphans.length);
if (orphans.length > 0) {
  console.log('Orphans:', orphans);
} else {
  console.log('SUCCESS: ZERO orphan pages in the entire built site!');
}
