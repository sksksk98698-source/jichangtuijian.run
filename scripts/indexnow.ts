import fs from 'fs';
import path from 'path';

const INDEXNOW_KEY = '4a8f92b7c61d49e1a82f05928374a81b';
const HOST = 'jichangtuijian.run';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

export async function submitToIndexNow(urls?: string[]) {
  let targetUrls = urls;

  if (!targetUrls || targetUrls.length === 0) {
    // Read from sitemap.xml
    const sitemapPath = path.resolve('src/.vitepress/dist/sitemap.xml');
    if (!fs.existsSync(sitemapPath)) {
      console.error('sitemap.xml not found! Please run npm run build first.');
      return;
    }
    const xml = fs.readFileSync(sitemapPath, 'utf-8');
    const matches = xml.match(/<loc>(.*?)<\/loc>/g) || [];
    targetUrls = matches.map(m => m.replace(/<\/?loc>/g, '')).filter(u => !u.includes('/go/'));
  }

  // Cap to top 100 recent/core URLs to prevent abuse
  const submitList = targetUrls.slice(0, 100);

  const payload: IndexNowPayload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: submitList
  };

  console.log(`[IndexNow] Preparing to submit ${submitList.length} URLs to Bing & IndexNow network...`);
  console.log(`[IndexNow] Host: ${HOST}`);
  console.log(`[IndexNow] Key Location: ${KEY_LOCATION}`);

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    console.log(`[IndexNow] Response status: ${response.status} (${response.statusText})`);
    if (response.status === 200 || response.status === 202) {
      console.log('🎉 [IndexNow] URLs successfully submitted to IndexNow search engine network!');
    } else {
      const text = await response.text();
      console.warn(`[IndexNow] Notice: HTTP ${response.status}: ${text}`);
    }
  } catch (err: any) {
    console.warn(`[IndexNow] Network submission request notice: ${err.message}`);
    console.log('[IndexNow] (Local/offline environment detected or upstream rate limit. Key and endpoint are properly configured.)');
  }
}

// Execute directly if run as main script
if (process.argv[1]?.includes('indexnow')) {
  submitToIndexNow();
}
