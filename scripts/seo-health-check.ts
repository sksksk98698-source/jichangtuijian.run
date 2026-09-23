import fs from 'fs';
import path from 'path';

const DOMAIN = 'https://jichangtuijian.run';
const DIST_DIR = path.resolve('src/.vitepress/dist');
const BASELINE_FILE = path.resolve('scripts/sitemap-baseline.json');

interface CheckStatus {
  name: string;
  passed: boolean;
  critical: boolean;
  message: string;
  issues: Array<{ file?: string; url?: string; reason: string; fix: string }>;
}

function getAllHtmlFiles(dir: string): string[] {
  let files: string[] = [];
  if (!fs.existsSync(dir)) return files;
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

export function runSeoHealthCheck(): boolean {
  console.log('====================================================');
  console.log('🛡️  SEO PUBLISH GATEKEEPER & HEALTH CHECK RUNNING');
  console.log(`🌐  Target Domain: ${DOMAIN}`);
  console.log('====================================================\n');

  const checks: Record<string, CheckStatus> = {
    Build: { name: 'Build Output', passed: true, critical: true, message: '', issues: [] },
    Robots: { name: 'robots.txt Configuration', passed: true, critical: true, message: '', issues: [] },
    Noindex: { name: 'Noindex Anomaly Gate', passed: true, critical: true, message: '', issues: [] },
    Canonical: { name: 'Canonical Self-Referencing', passed: true, critical: true, message: '', issues: [] },
    Sitemap: { name: 'Sitemap.xml Integrity', passed: true, critical: true, message: '', issues: [] },
    InternalLinks: { name: 'Internal Link Verification', passed: true, critical: true, message: '', issues: [] },
    CoreUrls: { name: 'Core Pillar URLs Status', passed: true, critical: true, message: '', issues: [] },
    Schema: { name: 'Schema JSON-LD Validation', passed: true, critical: false, message: '', issues: [] },
    DuplicateTitles: { name: 'Title Uniqueness', passed: true, critical: false, message: '', issues: [] },
    PageCount: { name: 'Page Count & Anomaly Check', passed: true, critical: true, message: '', issues: [] },
    SpamCheck: { name: 'Spam / Hacked Page Detection', passed: true, critical: true, message: '', issues: [] }
  };

  // 1. Build Output Check
  if (!fs.existsSync(DIST_DIR) || !fs.existsSync(path.join(DIST_DIR, 'index.html'))) {
    checks.Build.passed = false;
    checks.Build.issues.push({
      reason: 'Build directory or index.html missing',
      fix: 'Run npm run build to compile static assets before running health check'
    });
  }

  const htmlFiles = getAllHtmlFiles(DIST_DIR);
  if (htmlFiles.length < 50) {
    checks.Build.passed = false;
    checks.Build.issues.push({
      reason: `Found only ${htmlFiles.length} HTML files (expected 150+)`,
      fix: 'Verify VitePress build logs for fatal rendering aborts'
    });
  }

  // 2. Robots.txt Check
  const robotsPath = path.join(DIST_DIR, 'robots.txt');
  if (!fs.existsSync(robotsPath)) {
    checks.Robots.passed = false;
    checks.Robots.issues.push({
      file: 'robots.txt',
      reason: 'robots.txt missing in dist directory',
      fix: 'Ensure src/public/robots.txt exists so VitePress copies it to dist'
    });
  } else {
    const robotsContent = fs.readFileSync(robotsPath, 'utf-8');
    // Critical: must not block all crawlers
    if (/User-agent:\s*\*\s*\nDisallow:\s*\/\s*$/m.test(robotsContent)) {
      checks.Robots.passed = false;
      checks.Robots.issues.push({
        file: 'robots.txt',
        reason: 'CRITICAL: robots.txt contains "User-agent: * Disallow: /" blocking entire site!',
        fix: 'Remove global disallow in robots.txt immediately'
      });
    }
    // Must declare Sitemap
    if (!robotsContent.includes(`Sitemap: ${DOMAIN}/sitemap.xml`)) {
      checks.Robots.passed = false;
      checks.Robots.issues.push({
        file: 'robots.txt',
        reason: 'robots.txt does not declare official sitemap URL',
        fix: `Add "Sitemap: ${DOMAIN}/sitemap.xml" to robots.txt`
      });
    }
    // Must allow Googlebot & Bingbot
    if (!robotsContent.includes('Googlebot') || !robotsContent.includes('Bingbot')) {
      checks.Robots.passed = false;
      checks.Robots.issues.push({
        file: 'robots.txt',
        reason: 'robots.txt missing explicit permission for Googlebot or Bingbot',
        fix: 'Add explicit allow blocks for Googlebot and Bingbot'
      });
    }
  }

  // 3. Sitemap Check
  const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
  let currentSitemapCount = 0;
  if (!fs.existsSync(sitemapPath)) {
    checks.Sitemap.passed = false;
    checks.Sitemap.issues.push({
      file: 'sitemap.xml',
      reason: 'sitemap.xml missing in build output',
      fix: 'Verify vitepress sitemap config in src/.vitepress/config.mts'
    });
  } else {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
    const locMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];
    currentSitemapCount = locMatches.length;

    const sitemapUrls = locMatches.map(m => m.replace(/<\/?loc>/g, ''));
    for (const u of sitemapUrls) {
      if (!u.startsWith(DOMAIN)) {
        checks.Sitemap.passed = false;
        checks.Sitemap.issues.push({
          url: u,
          reason: `Sitemap URL contains invalid domain (expected ${DOMAIN})`,
          fix: 'Set hostname correctly in config.mts sitemap options'
        });
      }
      if (u.includes('/go/') || u.includes('/out/')) {
        checks.Sitemap.passed = false;
        checks.Sitemap.issues.push({
          url: u,
          reason: 'Sitemap contains affiliate redirect URL (/go/)',
          fix: 'Filter out go/ in sitemap.transformItems in config.mts'
        });
      }
      if (u.includes('404')) {
        checks.Sitemap.passed = false;
        checks.Sitemap.issues.push({
          url: u,
          reason: 'Sitemap contains 404 page',
          fix: 'Filter out 404 in sitemap config'
        });
      }
    }

    // Page count baseline comparison
    let baselineCount = currentSitemapCount;
    if (fs.existsSync(BASELINE_FILE)) {
      try {
        const baselineData = JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf-8'));
        baselineCount = baselineData.count || currentSitemapCount;
      } catch (_) {}
    } else {
      fs.writeFileSync(BASELINE_FILE, JSON.stringify({ count: currentSitemapCount, date: new Date().toISOString() }, null, 2), 'utf-8');
    }

    const diff = currentSitemapCount - baselineCount;
    // Anomaly threshold: drop > 15% or increase > 200%
    if (baselineCount > 0 && currentSitemapCount < baselineCount * 0.85) {
      checks.PageCount.passed = false;
      checks.PageCount.issues.push({
        reason: `CRITICAL ANOMALY: Sitemap URL count dropped from ${baselineCount} to ${currentSitemapCount} (drop of ${Math.abs(diff)} URLs)!`,
        fix: 'Check if Markdown files were accidentally deleted or unlinked before deploying'
      });
    } else if (baselineCount > 0 && currentSitemapCount > baselineCount * 3.0) {
      checks.PageCount.passed = false;
      checks.PageCount.issues.push({
        reason: `CRITICAL ANOMALY: Sitemap URL count exploded from ${baselineCount} to ${currentSitemapCount} (+${diff})!`,
        fix: 'Check if loop or script erroneously generated thousands of duplicate pages'
      });
    } else {
      // Update baseline gracefully
      fs.writeFileSync(BASELINE_FILE, JSON.stringify({ count: currentSitemapCount, lastUpdated: new Date().toISOString() }, null, 2), 'utf-8');
    }
  }

  // 4, 5, 6, 7, 8, 9: Scan HTML files
  const titlesMap = new Map<string, string>();
  const duplicateTitleIssues: string[] = [];
  const noindexIssues: string[] = [];
  const canonicalIssues: string[] = [];
  const brokenLinkIssues: string[] = [];
  const schemaIssues: string[] = [];
  const spamIssues: string[] = [];

  // Indexable routes set
  const allRoutes = new Set<string>();
  for (const f of htmlFiles) {
    let r = path.relative(DIST_DIR, f).replace(/\\/g, '/').replace(/\.html$/, '').replace(/\/index$/, '');
    if (r === 'index') r = '';
    allRoutes.add('/' + r);
    allRoutes.add('/' + r + '/');
  }

  for (const f of htmlFiles) {
    const rel = path.relative(DIST_DIR, f).replace(/\\/g, '/');
    const isAffiliateGo = rel.startsWith('go/');
    const is404 = rel === '404.html';
    const isIndexable = !isAffiliateGo && !is404;

    const html = fs.readFileSync(f, 'utf-8');

    // Spam / Hack detection
    const suspiciousKeywords = ['casino', 'baccarat', 'porn', 'xxx', 'roulette', 'lottery', 'jackpot'];
    for (const kw of suspiciousKeywords) {
      if (rel.toLowerCase().includes(kw)) {
        spamIssues.push(`Suspicious file detected: ${rel} matches '${kw}'`);
      }
    }

    // Noindex check
    const hasNoindex = html.includes('content="noindex') || html.includes("content='noindex") || html.includes('noindex,');
    if (isIndexable && hasNoindex) {
      noindexIssues.push(rel);
    }

    // Canonical check
    const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
    if (isIndexable) {
      if (!canonicalMatch) {
        canonicalIssues.push(`${rel}: Missing canonical tag`);
      } else {
        const cUrl = canonicalMatch[1];
        if (!cUrl.startsWith(DOMAIN)) {
          canonicalIssues.push(`${rel}: Canonical domain mismatch -> ${cUrl}`);
        }
        if (cUrl.includes('localhost') || cUrl.includes('http://')) {
          canonicalIssues.push(`${rel}: Insecure or dev canonical -> ${cUrl}`);
        }
      }
    }

    // Title check
    if (isIndexable) {
      const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : '';
      if (title) {
        if (titlesMap.has(title)) {
          duplicateTitleIssues.push(`Duplicate title "${title}": in ${rel} and ${titlesMap.get(title)}`);
        } else {
          titlesMap.set(title, rel);
        }
      }
    }

    // Schema Check
    const schemaMatches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi) || [];
    for (const sm of schemaMatches) {
      const jsonStr = sm.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
      try {
        const parsed = JSON.parse(jsonStr);
        if (!parsed['@context'] || !parsed['@type']) {
          schemaIssues.push(`${rel}: JSON-LD missing @context or @type`);
        }
      } catch (err: any) {
        schemaIssues.push(`${rel}: JSON-LD syntax error -> ${err.message}`);
      }
    }

    // Internal Link Scan
    if (isIndexable) {
      const linkMatches = html.matchAll(/<a\s+[^>]*href=["']([^"']*)["'][^>]*>/gi);
      for (const m of linkMatches) {
        const href = m[1];
        if (href === '' || href === '#') {
          // Empty href warning
          continue;
        }
        if (href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/go/') && !href.startsWith('/images/')) {
          const cleanTarget = href.split('#')[0].split('?')[0];
          if (!allRoutes.has(cleanTarget) && !allRoutes.has(cleanTarget.replace(/\/$/, '')) && !allRoutes.has(cleanTarget + '/')) {
            brokenLinkIssues.push(`${rel} -> ${href} (404 Not Found)`);
          }
        }
      }
    }
  }

  // Populate check results
  if (noindexIssues.length > 0) {
    checks.Noindex.passed = false;
    for (const issue of noindexIssues.slice(0, 10)) {
      checks.Noindex.issues.push({
        file: issue,
        reason: 'CRITICAL: Normal indexable page has noindex meta tag!',
        fix: 'Remove noindex from frontmatter/seo-helper on this page'
      });
    }
  }

  if (canonicalIssues.length > 0) {
    checks.Canonical.passed = false;
    for (const issue of canonicalIssues.slice(0, 10)) {
      checks.Canonical.issues.push({
        reason: issue,
        fix: 'Check buildPageSeo in src/.vitepress/seo-helper.ts'
      });
    }
  }

  if (brokenLinkIssues.length > 0) {
    checks.InternalLinks.passed = false;
    for (const issue of brokenLinkIssues.slice(0, 10)) {
      checks.InternalLinks.issues.push({
        reason: issue,
        fix: 'Fix or update internal relative URL link in Markdown'
      });
    }
  }

  if (duplicateTitleIssues.length > 0) {
    checks.DuplicateTitles.passed = false;
    for (const issue of duplicateTitleIssues.slice(0, 5)) {
      checks.DuplicateTitles.issues.push({
        reason: issue,
        fix: 'Differentiate titles to avoid keyword cannibalization'
      });
    }
  }

  if (schemaIssues.length > 0) {
    checks.Schema.passed = false;
    for (const issue of schemaIssues.slice(0, 5)) {
      checks.Schema.issues.push({
        reason: issue,
        fix: 'Validate JSON-LD format in YAML frontmatter or seo-helper'
      });
    }
  }

  if (spamIssues.length > 0) {
    checks.SpamCheck.passed = false;
    for (const issue of spamIssues) {
      checks.SpamCheck.issues.push({
        reason: issue,
        fix: 'Check for infected repository or rogue build scripts'
      });
    }
  }

  // 10. Core Pillar URLs Check
  const corePillarPaths = [
    'index.html',
    'recommend/index.html',
    'recommend/2026.html',
    'ranking/index.html',
    'ranking/overall.html',
    'reviews/index.html',
    'reviews/guangsucloud.html',
    'brands/guangsucloud.html',
    'compare/index.html',
    'compare/triple-flagship.html',
    'pricing/index.html',
    'lines/index.html',
    'use-cases/index.html',
    'tools/calculator.html',
    'intel/index.html',
    'intel/warning-signs.html'
  ];

  for (const cp of corePillarPaths) {
    const full = path.join(DIST_DIR, cp);
    if (!fs.existsSync(full)) {
      checks.CoreUrls.passed = false;
      checks.CoreUrls.issues.push({
        file: cp,
        reason: `Core pillar route missing: ${cp}`,
        fix: 'Restore core pillar Markdown file immediately'
      });
    }
  }

  // Final Evaluation
  let hasCriticalFailure = false;
  console.log('--- SEO HEALTH CHECK REPORT ---');
  for (const [key, c] of Object.entries(checks)) {
    const tag = c.passed ? 'PASS' : 'FAIL';
    const sym = c.passed ? '✓' : '✗';
    console.log(`${sym} ${key.padEnd(16)}: ${tag}`);
    if (!c.passed && c.critical) {
      hasCriticalFailure = true;
    }
  }

  console.log('\n====================================================');
  if (hasCriticalFailure) {
    console.log('🚨 RELEASE_DECISION: BLOCKED');
    console.log('CRITICAL SEO ERROR DETECTED! DO NOT DEPLOY TO PRODUCTION!');
    console.log('====================================================\n');

    console.log('DETAILED ISSUES & ACTIONABLE FIXES:');
    for (const [key, c] of Object.entries(checks)) {
      if (!c.passed && c.issues.length > 0) {
        console.log(`\n[${key} Failure - ${c.name}]`);
        for (const it of c.issues) {
          if (it.file) console.log(`  - File: ${it.file}`);
          if (it.url) console.log(`  - URL: ${it.url}`);
          console.log(`  - Reason: ${it.reason}`);
          console.log(`  - Fix: ${it.fix}`);
        }
      }
    }
    return false;
  } else {
    console.log('🎉 RELEASE_DECISION: READY');
    console.log('ALL SEO CRITICAL GATES PASSED! SAFE FOR PRODUCTION DEPLOYMENT.');
    console.log('====================================================\n');
    return true;
  }
}

// CLI execution
if (process.argv[1]?.includes('seo-health-check')) {
  const ok = runSeoHealthCheck();
  if (!ok) {
    process.exit(1);
  }
}
