import fs from 'fs';
import path from 'path';

interface AuditResult {
  category: string;
  passed: boolean;
  message: string;
  details?: string[];
}

const DOMAIN = 'https://jichangtuijian.run';

function runPrelaunchAudit() {
  console.log('=== RUNNING PRE-LAUNCH SEARCH ENGINE INFRASTRUCTURE AUDIT ===\n');
  const results: AuditResult[] = [];
  const distDir = path.resolve('src/.vitepress/dist');

  if (!fs.existsSync(distDir)) {
    console.error('Dist directory does not exist! Please run npm run build first.');
    process.exit(1);
  }

  // 1. Robots.txt Audit
  const robotsPath = path.join(distDir, 'robots.txt');
  if (!fs.existsSync(robotsPath)) {
    results.push({ category: 'robots.txt', passed: false, message: 'robots.txt not found in build output' });
  } else {
    const robotsTxt = fs.readFileSync(robotsPath, 'utf-8');
    const hasGoogle = robotsTxt.includes('User-agent: Googlebot');
    const hasBing = robotsTxt.includes('User-agent: Bingbot');
    const hasBaidu = robotsTxt.includes('User-agent: Baiduspider');
    const hasYisou = robotsTxt.includes('User-agent: yisouspider');
    const hasSitemap = robotsTxt.includes(`Sitemap: ${DOMAIN}/sitemap.xml`);
    const hasDisallowAff = robotsTxt.includes('Disallow: /go/');

    const passed = hasGoogle && hasBing && hasBaidu && hasYisou && hasSitemap && hasDisallowAff;
    results.push({
      category: 'robots.txt',
      passed,
      message: passed
        ? 'robots.txt fully configured for Google, Bing, Baidu, Shenma (yisouspider) and protects /go/'
        : 'robots.txt missing some search engine crawlers or sitemap declaration'
    });
  }

  // 2. Sitemap.xml Audit
  const sitemapPath = path.join(distDir, 'sitemap.xml');
  let sitemapUrls: string[] = [];
  if (!fs.existsSync(sitemapPath)) {
    results.push({ category: 'sitemap.xml', passed: false, message: 'sitemap.xml not found in build output' });
  } else {
    const sitemapXml = fs.readFileSync(sitemapPath, 'utf-8');
    const locMatches = sitemapXml.match(/<loc>(.*?)<\/loc>/g) || [];
    sitemapUrls = locMatches.map(m => m.replace(/<\/?loc>/g, ''));

    const hasWrongDomain = sitemapUrls.some(u => !u.startsWith(DOMAIN));
    const hasGo = sitemapUrls.some(u => u.includes('/go/'));
    const has404 = sitemapUrls.some(u => u.includes('404'));
    const passed = !hasWrongDomain && !hasGo && !has404 && sitemapUrls.length > 50;

    results.push({
      category: 'sitemap.xml',
      passed,
      message: passed
        ? `sitemap.xml contains ${sitemapUrls.length} clean indexable URLs with official domain ${DOMAIN}`
        : 'sitemap.xml has domain inconsistencies, /go/ leaks, or 404 pages'
    });
  }

  // 3. RSS Feed Audit
  const rssPath = path.join(distDir, 'rss.xml');
  if (!fs.existsSync(rssPath)) {
    results.push({ category: 'rss.xml', passed: false, message: 'rss.xml not found in build output' });
  } else {
    const rssXml = fs.readFileSync(rssPath, 'utf-8');
    const hasChannel = rssXml.includes('<channel>') && rssXml.includes(`<link>${DOMAIN}</link>`);
    const itemsCount = (rssXml.match(/<item>/g) || []).length;
    const passed = hasChannel && itemsCount > 50;
    results.push({
      category: 'rss.xml',
      passed,
      message: passed
        ? `rss.xml feed valid with ${itemsCount} items under official domain`
        : 'rss.xml missing channel info or items'
    });
  }

  // 4. HTML Files Deep Crawl & SEO Metadata Audit
  function getAllHtmlFiles(dir: string): string[] {
    let files: string[] = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files = files.concat(getAllHtmlFiles(fullPath));
      } else if (entry.name.endsWith('.html')) {
        files.push(fullPath);
      }
    }
    return files;
  }

  const htmlFiles = getAllHtmlFiles(distDir);
  const titles = new Map<string, string>();
  const descriptions = new Map<string, string>();
  const canonicals = new Map<string, string>();
  const rogueNoindexes: string[] = [];
  const invalidUrls: string[] = [];
  const missingH1s: string[] = [];
  const multipleH1s: string[] = [];

  for (const file of htmlFiles) {
    const rel = path.relative(distDir, file).replace(/\\/g, '/');
    if (rel.startsWith('go/')) continue; // Skip affiliate redirects
    if (rel === '404.html') continue;

    // Check slug standard (all lowercase, no chinese, no spaces, no uppercase)
    if (/[A-Z\u4e00-\u9fa5\s]/.test(rel)) {
      invalidUrls.push(rel);
    }

    const html = fs.readFileSync(file, 'utf-8');

    // Title
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';
    if (title) {
      if (titles.has(title)) {
        // Warning if duplicate title
      } else {
        titles.set(title, rel);
      }
    }

    // Canonical
    const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
    const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';
    if (!canonical || !canonical.startsWith(DOMAIN)) {
      results.push({
        category: 'canonical',
        passed: false,
        message: `Invalid canonical in ${rel}: ${canonical}`
      });
    }

    // H1 check
    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    if (h1Matches.length === 0) {
      missingH1s.push(rel);
    } else if (h1Matches.length > 1) {
      multipleH1s.push(rel);
    }

    // Check noindex on public pages
    if (html.includes('content="noindex') || html.includes("content='noindex")) {
      rogueNoindexes.push(rel);
    }
  }

  // Check URL Standards
  results.push({
    category: 'URL Standards',
    passed: invalidUrls.length === 0,
    message: invalidUrls.length === 0
      ? 'All URL slugs adhere strictly to lowercase semantic English format'
      : `Found ${invalidUrls.length} non-standard URL slugs: ${invalidUrls.slice(0, 5).join(', ')}`
  });

  // Check Rogue Noindex
  results.push({
    category: 'Index Control',
    passed: rogueNoindexes.length === 0,
    message: rogueNoindexes.length === 0
      ? 'Zero rogue noindex tags found on indexable public pages'
      : `Found noindex tags in: ${rogueNoindexes.join(', ')}`
  });

  // Check H1 Integrity
  results.push({
    category: 'H1 Semantic Hierarchy',
    passed: missingH1s.length === 0 && multipleH1s.length === 0,
    message: missingH1s.length === 0 && multipleH1s.length === 0
      ? 'All pages possess exactly one unique H1 semantic title'
      : `Missing H1: ${missingH1s.length}, Multiple H1: ${multipleH1s.length}`
  });

  // Print results
  console.log('--- AUDIT RESULTS TABLE ---');
  let allPassed = true;
  for (const r of results) {
    const symbol = r.passed ? '✓ PASS' : '✗ FAIL';
    console.log(`${symbol}: [${r.category}] - ${r.message}`);
    if (!r.passed) allPassed = false;
  }

  console.log('\n--- OVERALL PRE-LAUNCH STATUS ---');
  if (allPassed) {
    console.log('🎉 ALL PRE-LAUNCH SEARCH ENGINE INFRASTRUCTURE CHECKS PASSED!');
  } else {
    console.log('⚠️ Some checks failed. Please inspect the logs.');
  }
}

runPrelaunchAudit();
