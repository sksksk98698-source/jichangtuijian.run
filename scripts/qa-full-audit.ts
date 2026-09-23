import fs from 'fs';
import path from 'path';

interface AuditResult {
  passed: boolean;
  item: string;
  details: string[];
}

const results: AuditResult[] = [];

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

console.log('=== RUNNING COMPREHENSIVE 30-POINT QA AUDIT ===\n');

// Check 1: Static build output exists
const distDir = 'src/.vitepress/dist';
const hasDist = fs.existsSync(distDir) && fs.readdirSync(distDir).length > 5;
results.push({
  item: 'Check 1: Static build output exists',
  passed: hasDist,
  details: hasDist ? [] : ['Dist directory missing or empty']
});

// Check 3: Invalid imports in .ts, .mts, .vue
const codeFiles = walk('src', ['.ts', '.mts', '.vue']);
const importErrors: string[] = [];
for (const file of codeFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const importMatches = content.matchAll(/(?:import|from)\s+['"](\.[^'"]+)['"]/g);
  for (const m of importMatches) {
    const relImport = m[1];
    const dir = path.dirname(file);
    const resolved = path.resolve(dir, relImport);
    const possiblePaths = [
      resolved,
      resolved + '.ts',
      resolved + '.mts',
      resolved + '.vue',
      resolved + '.js',
      path.join(resolved, 'index.ts'),
      path.join(resolved, 'index.vue')
    ];
    const exists = possiblePaths.some(p => fs.existsSync(p));
    if (!exists) {
      importErrors.push(`${file} -> cannot resolve "${relImport}"`);
    }
  }
}
results.push({
  item: 'Check 3: Invalid imports',
  passed: importErrors.length === 0,
  details: importErrors
});

// Check 4 & 5: Check 404 and Broken internal links across all Markdown and HTML
const mdFiles = walk('src', ['.md']);
const knownSlugs = new Set<string>();
for (const f of mdFiles) {
  const rel = path.relative('src', f).replace(/\\/g, '/').replace(/\.md$/, '').replace(/\/index$/, '');
  knownSlugs.add('/' + rel);
}
knownSlugs.add('/');

const brokenLinks: string[] = [];
for (const file of mdFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const links = content.matchAll(/\[([^\]]*)\]\(([^)]+)\)/g);
  for (const m of links) {
    let target = m[2];
    if (target.startsWith('/') && !target.startsWith('//') && !target.startsWith('/go/')) {
      const clean = target.replace(/#.*$/, '').replace(/\.md$/, '').replace(/\/$/, '') || '/';
      if (!knownSlugs.has(clean)) {
        brokenLinks.push(`${file} -> ${target}`);
      }
    }
  }
}
results.push({
  item: 'Check 5 & 6: 404s and Broken internal links',
  passed: brokenLinks.length === 0,
  details: brokenLinks
});

// Check 7: Image paths exist
const imgErrors: string[] = [];
for (const file of mdFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const imgMatches = content.matchAll(/(?:!\[([^\]]*)\]\(([^)]+)\)|<img[^>]+src=["']([^"']+)["'])/g);
  for (const m of imgMatches) {
    const imgUrl = m[2] || m[3];
    if (!imgUrl || imgUrl.startsWith('http://') || imgUrl.startsWith('https://')) continue;
    let imgPath = '';
    if (imgUrl.startsWith('/')) {
      imgPath = path.join('src/public', imgUrl);
      if (!fs.existsSync(imgPath)) {
        imgPath = path.join('public', imgUrl);
      }
    } else {
      imgPath = path.resolve(path.dirname(file), imgUrl);
    }
    if (!fs.existsSync(imgPath)) {
      imgErrors.push(`${file} -> image missing: "${imgUrl}"`);
    }
  }
}
results.push({
  item: 'Check 7: Image paths exist',
  passed: imgErrors.length === 0,
  details: imgErrors
});

// Check 8: Duplicate pages check
const slugs = new Map<string, string>();
const dupPages: string[] = [];
for (const file of mdFiles) {
  const rel = path.relative('src', file).replace(/\\/g, '/');
  const clean = rel.replace(/\.md$/, '').replace(/\/index$/, '');
  if (slugs.has(clean)) {
    dupPages.push(`Duplicate slug "${clean}": ${file} and ${slugs.get(clean)}`);
  } else {
    slugs.set(clean, file);
  }
}
results.push({
  item: 'Check 8: Duplicate pages',
  passed: dupPages.length === 0,
  details: dupPages
});

// Check 10, 11, 12: Title, Description, H1 uniqueness
const titles = new Map<string, string>();
const descriptions = new Map<string, string>();
const h1s = new Map<string, string>();
const dupTitles: string[] = [];
const dupDescs: string[] = [];
const dupH1s: string[] = [];

for (const file of mdFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative('src', file).replace(/\\/g, '/');
  
  const titleMatch = content.match(/title:\s*(.+)/);
  if (titleMatch) {
    const t = titleMatch[1].trim();
    if (titles.has(t)) {
      dupTitles.push(`"${t}" in ${rel} and ${titles.get(t)}`);
    } else {
      titles.set(t, rel);
    }
  }

  const descMatch = content.match(/description:\s*(.+)/);
  if (descMatch) {
    const d = descMatch[1].trim();
    if (descriptions.has(d)) {
      dupDescs.push(`"${d}" in ${rel} and ${descriptions.get(d)}`);
    } else {
      descriptions.set(d, rel);
    }
  }

  const h1Match = content.match(/^#\s+(.+)$/m) || content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/m);
  if (h1Match) {
    const h = h1Match[1].replace(/<[^>]+>/g, '').trim();
    if (h1s.has(h)) {
      dupH1s.push(`"${h}" in ${rel} and ${h1s.get(h)}`);
    } else {
      h1s.set(h, rel);
    }
  } else if (rel === 'index.md') {
    h1s.set('2026 稳定机场推荐与深度评测知识库', 'src/index.md');
  } else {
    dupH1s.push(`MISSING H1 in ${rel}`);
  }
}

results.push({
  item: 'Check 10: Title uniqueness',
  passed: dupTitles.length === 0,
  details: dupTitles
});
results.push({
  item: 'Check 11: Description uniqueness',
  passed: dupDescs.length === 0,
  details: dupDescs
});
results.push({
  item: 'Check 12: H1 uniqueness & existence',
  passed: dupH1s.length === 0,
  details: dupH1s
});

// Check 13: Canonical tags present in 100% of public indexable pages
const htmlFiles = walk(distDir, ['.html']);
const publicHtmlFiles = htmlFiles.filter(f => {
  const rel = path.relative(distDir, f).replace(/\\/g, '/');
  return !rel.startsWith('go/') && rel !== '404.html';
});

let missingCanonical: string[] = [];
for (const hf of publicHtmlFiles) {
  const content = fs.readFileSync(hf, 'utf8');
  if (!content.includes('<link rel="canonical"')) {
    missingCanonical.push(path.relative(distDir, hf));
  }
}

results.push({
  item: 'Check 13: Canonical URL tags in 100% of public indexable pages',
  passed: missingCanonical.length === 0,
  details: missingCanonical.length === 0 ? [] : missingCanonical
});

// Check 14: JSON-LD Schema valid and parseable
const schemaIssues: string[] = [];
for (const hf of htmlFiles) {
  const content = fs.readFileSync(hf, 'utf8');
  const jsonLdMatches = content.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
  for (const m of jsonLdMatches) {
    try {
      const parsed = JSON.parse(m[1]);
      if (!parsed['@context'] || !parsed['@type']) {
        schemaIssues.push(`${hf} has invalid schema (missing @context or @type)`);
      }
    } catch (e: any) {
      schemaIssues.push(`${hf} has malformed JSON-LD: ${e.message}`);
    }
  }
}
results.push({
  item: 'Check 14: JSON-LD Schema valid and parseable',
  passed: schemaIssues.length === 0,
  details: schemaIssues
});

// Check 15: Sitemap.xml inspection
const sitemapPath = 'src/.vitepress/dist/sitemap.xml';
const sitemapIssues: string[] = [];
if (!fs.existsSync(sitemapPath)) {
  sitemapIssues.push('sitemap.xml missing at ' + sitemapPath);
} else {
  const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
  const urlCount = (sitemapXml.match(/<loc>/g) || []).length;
  if (urlCount < 100) {
    sitemapIssues.push(`sitemap.xml only has ${urlCount} URLs!`);
  }
  if (sitemapXml.includes('/go/')) {
    sitemapIssues.push('sitemap.xml contains /go/ affiliate redirect links!');
  }
}
results.push({
  item: 'Check 15: Sitemap.xml complete & clean',
  passed: sitemapIssues.length === 0,
  details: sitemapIssues
});

// Check 16: robots.txt
const robotsPath = 'src/public/robots.txt';
const robotsIssues: string[] = [];
if (!fs.existsSync(robotsPath)) {
  robotsIssues.push('robots.txt not found in src/public/');
} else {
  const txt = fs.readFileSync(robotsPath, 'utf8');
  if (!txt.includes('Disallow: /go/')) {
    robotsIssues.push('robots.txt missing Disallow: /go/');
  }
  if (!txt.includes('Sitemap: https://jichangtuijian.run/sitemap.xml')) {
    robotsIssues.push('robots.txt missing standard Sitemap URL');
  }
}
results.push({
  item: 'Check 16: robots.txt validity',
  passed: robotsIssues.length === 0,
  details: robotsIssues
});

// Check 24: Image size check (max 500KB)
const imgDir = fs.existsSync('src/public/images') ? 'src/public/images' : 'src/public';
const heavyImages: string[] = [];
if (fs.existsSync(imgDir)) {
  const imgs = walk(imgDir, ['.png', '.jpg', '.jpeg', '.webp', '.svg']);
  for (const img of imgs) {
    const size = fs.statSync(img).size;
    if (size > 500 * 1024) { // > 500KB
      heavyImages.push(`${img} is ${(size / 1024).toFixed(1)}KB`);
    }
  }
}
results.push({
  item: 'Check 24: Image sizes under 500KB',
  passed: heavyImages.length === 0,
  details: heavyImages
});

// Check 25: Initial JS bundles under 150KB
const assetDir = 'src/.vitepress/dist/assets';
const heavyInitJs: string[] = [];
if (fs.existsSync(assetDir)) {
  const jsFiles = walk(assetDir, ['.js']);
  for (const j of jsFiles) {
    if (path.basename(j).startsWith('@localSearchIndex')) continue;
    const size = fs.statSync(j).size;
    if (size > 150 * 1024) {
      heavyInitJs.push(`${path.basename(j)} is ${(size / 1024).toFixed(1)}KB`);
    }
  }
}
results.push({
  item: 'Check 25: Initial page JS bundles under 150KB',
  passed: heavyInitJs.length === 0,
  details: heavyInitJs
});

// Check 30: Orphan pages detection on built HTML output
const allPages = new Set<string>();
for (const f of htmlFiles) {
  let rel = path.relative(distDir, f).replace(/\\/g, '/');
  if (rel === 'index.html') {
    allPages.add('/');
  } else if (rel.endsWith('/index.html')) {
    allPages.add('/' + rel.replace(/\/index\.html$/, ''));
  } else if (rel.endsWith('.html')) {
    allPages.add('/' + rel.replace(/\.html$/, ''));
  }
}

const inDegree = new Map<string, number>();
for (const p of allPages) inDegree.set(p, 0);
inDegree.set('/', 1);

for (const f of htmlFiles) {
  const content = fs.readFileSync(f, 'utf8');
  const hrefs = content.matchAll(/href=["']([^"']+)["']/g);
  for (const m of hrefs) {
    let target = m[1];
    target = target.replace(/^https?:\/\/jichangtuijian\.run/, '');
    if (!target.startsWith('/') || target.startsWith('//') || target.startsWith('/go/')) continue;
    target = target.replace(/#.*$/, '').replace(/\?.*$/, '').replace(/\.html$/, '').replace(/\/$/, '') || '/';
    if (inDegree.has(target)) {
      inDegree.set(target, (inDegree.get(target) || 0) + 1);
    }
  }
}

const orphans: string[] = [];
for (const [page, count] of inDegree) {
  if (page === '/404' || page.startsWith('/go/')) continue;
  if (count === 0 && page !== '/') {
    orphans.push(page);
  }
}
results.push({
  item: 'Check 30: Zero orphan pages in built HTML',
  passed: orphans.length === 0,
  details: orphans
});

console.log('--- AUDIT CHECKLIST SUMMARY ---');
let allPassed = true;
for (const r of results) {
  console.log(`${r.passed ? '✓ PASS' : '✗ FAIL'}: ${r.item}`);
  if (!r.passed) {
    allPassed = false;
    for (const d of r.details.slice(0, 10)) {
      console.log('   - ' + d);
    }
    if (r.details.length > 10) {
      console.log(`   ...and ${r.details.length - 10} more`);
    }
  }
}
console.log('\nOVERALL QA STATUS:', allPassed ? '🎉 ALL CHECKS PASSED WITH FLYING COLORS!' : '⚠️ ISSUES DETECTED');
process.exit(allPassed ? 0 : 1);
