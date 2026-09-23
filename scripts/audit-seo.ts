import fs from 'node:fs';
import path from 'node:path';

const SRC_DIR = path.resolve('src');

function getAllMdFiles(dir: string, files: string[] = []): string[] {
  for (const item of fs.readdirSync(dir)) {
    if (item.startsWith('.') || item === 'node_modules') continue;
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      getAllMdFiles(full, files);
    } else if (item.endsWith('.md')) {
      files.push(full);
    }
  }
  return files;
}

const mdFiles = getAllMdFiles(SRC_DIR);
console.log('Total Markdown files found:', mdFiles.length);

const titles = new Map<string, string[]>();
const descriptions = new Map<string, string[]>();
const h1s = new Map<string, string[]>();
const allLinks: { from: string; href: string; text: string }[] = [];
const allImages: { from: string; alt: string; src: string }[] = [];

for (const file of mdFiles) {
  const rel = path.relative(SRC_DIR, file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf8');

  // Parse title & description from frontmatter
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  let title = '';
  let desc = '';
  if (fmMatch) {
    const fm = fmMatch[1];
    const tMatch = fm.match(/^title:\s*(.*)$/m);
    if (tMatch) title = tMatch[1].trim().replace(/^['"]|['"]$/g, '');
    const dMatch = fm.match(/^description:\s*(.*)$/m);
    if (dMatch) desc = dMatch[1].trim().replace(/^['"]|['"]$/g, '');
  }

  // Parse H1
  const h1Match = content.match(/^#\s+(.*)$/m);
  const h1 = h1Match ? h1Match[1].trim() : '';

  if (title) {
    if (!titles.has(title)) titles.set(title, []);
    titles.get(title)!.push(rel);
  }
  if (desc) {
    if (!descriptions.has(desc)) descriptions.set(desc, []);
    descriptions.get(desc)!.push(rel);
  }
  if (h1) {
    if (!h1s.has(h1)) h1s.set(h1, []);
    h1s.get(h1)!.push(rel);
  }

  // Find all internal links [text](/path)
  const linkMatches = content.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g);
  for (const m of linkMatches) {
    const href = m[2].trim();
    if (href.startsWith('/') && !href.startsWith('//')) {
      allLinks.push({ from: rel, href, text: m[1] });
    }
  }

  // Find images ![alt](src)
  const imgMatches = content.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g);
  for (const m of imgMatches) {
    allImages.push({ from: rel, alt: m[1], src: m[2] });
  }
}

// Check duplicates
console.log('\n--- Checking Duplicate Titles ---');
let dupTitles = 0;
for (const [t, list] of titles) {
  if (list.length > 1) {
    console.log('Duplicate Title:', t, 'in', list);
    dupTitles++;
  }
}
if (dupTitles === 0) console.log('✓ Zero duplicate titles!');

console.log('\n--- Checking Duplicate Descriptions ---');
let dupDesc = 0;
for (const [d, list] of descriptions) {
  if (list.length > 1) {
    console.log('Duplicate Description:', d.slice(0, 40) + '...', 'in', list);
    dupDesc++;
  }
}
if (dupDesc === 0) console.log('✓ Zero duplicate descriptions!');

console.log('\n--- Checking Duplicate H1 ---');
let dupH1 = 0;
for (const [h, list] of h1s) {
  if (list.length > 1) {
    console.log('Duplicate H1:', h, 'in', list);
    dupH1++;
  }
}
if (dupH1 === 0) console.log('✓ Zero duplicate H1s!');

// Check broken links
console.log('\n--- Checking Internal Link Targets ---');
let brokenLinks = 0;
const validPaths = new Set(mdFiles.map(f => {
  let r = path.relative(SRC_DIR, f).replace(/\\/g, '/');
  r = '/' + r.replace(/\.md$/, '').replace(/index$/, '');
  if (!r.endsWith('/') && r !== '/') r = r + '/';
  return r;
}));
for (const p of Array.from(validPaths)) {
  if (p.endsWith('/') && p !== '/') validPaths.add(p.slice(0, -1));
}

// Add static routes like /go/[brand]
const affs = [
  'guangsucloud', 'feimaoyun', 'breezenet', 'xingdaomeng', 'worryfree',
  'twilight', 'ermaocloud', 'civetnet', 'jiliancloud', 'yuzhouyun',
  'v2yun', 'u1s1', 'gnt', '1flyun', 'sogoyun', 'kosing', 'speedworld',
  'flashleap', 'globalcloud', 'star-warning-demo'
];
for (const a of affs) {
  validPaths.add('/go/' + a);
  validPaths.add('/go/' + a + '/');
}

for (const l of allLinks) {
  let cleanHref = l.href.split('#')[0].split('?')[0];
  if (!cleanHref) continue;
  if (cleanHref.startsWith('/images/')) continue; // static asset
  if (!validPaths.has(cleanHref)) {
    console.log('Broken link from', l.from, '->', l.href);
    brokenLinks++;
  }
}
console.log('Broken links count:', brokenLinks);

// Check images alt
console.log('\n--- Checking Image Alts ---');
let missingAlt = 0;
for (const img of allImages) {
  if (!img.alt || img.alt.trim() === '') {
    console.log('Missing alt in', img.from, 'src:', img.src);
    missingAlt++;
  }
}
if (missingAlt === 0) console.log('✓ All markdown images have alt text!');
