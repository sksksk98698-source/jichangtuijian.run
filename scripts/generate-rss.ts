import fs from 'fs';
import path from 'path';

interface RssItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  guid: string;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function parseMarkdownFrontmatter(content: string): { title?: string; description?: string } {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const frontmatter = match[1];
  let title = '';
  let description = '';

  const titleMatch = frontmatter.match(/^title:\s*(.+)$/m);
  if (titleMatch) title = titleMatch[1].trim().replace(/^['"]|['"]$/g, '');

  const descMatch = frontmatter.match(/^description:\s*(.+)$/m);
  if (descMatch) description = descMatch[1].trim().replace(/^['"]|['"]$/g, '');

  return { title, description };
}

function generateRss() {
  const srcDir = path.resolve('src');
  const items: RssItem[] = [];

  // 1. 添加核心工具与评测
  const directories = [
    'tools',
    'recommend',
    'ranking',
    'reviews',
    'compare',
    'lines',
    'pricing',
    'use-cases',
    'unlock',
    'benchmarks',
    'clients',
    'guides',
    'troubleshooting',
    'intel'
  ];

  for (const dir of directories) {
    const dirPath = path.join(srcDir, dir);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { title, description } = parseMarkdownFrontmatter(content);

      if (!title) continue;

      let route = `/${dir}/${file.replace('.md', '')}`;
      if (file === 'index.md') route = `/${dir}/`;

      const fullUrl = `https://jichangtuijian.run${route}`;

      items.push({
        title,
        link: fullUrl,
        description: description || title,
        pubDate: new Date('2026-03-23T08:00:00Z').toUTCString(),
        guid: fullUrl
      });
    }
  }

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>机场推荐 - 2026专业科学上网与IEPL专线评测知识库</title>
    <link>https://jichangtuijian.run</link>
    <description>2026年度权威机场推荐、IEPL专线评测、晚高峰丢包实测与跑路风险雷达。涵盖AI流媒体解锁、客户端教程与智能流量计算工具。</description>
    <language>zh-cn</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://jichangtuijian.run/rss.xml" rel="self" type="application/rss+xml" />
    ${items
      .map(
        item => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.link}</link>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${item.pubDate}</pubDate>
      <guid>${item.guid}</guid>
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  const outPath = path.join(srcDir, 'public', 'rss.xml');
  fs.writeFileSync(outPath, rssXml.trim(), 'utf-8');
  console.log(`Successfully generated RSS feed at ${outPath} with ${items.length} items!`);
}

generateRss();
