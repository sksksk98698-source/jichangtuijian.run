import type { PageData, HeadConfig } from 'vitepress';
import { topicClusters } from '../data/navigation';
import { airportsData } from '../data/airports';

const DOMAIN = 'https://jichangtuijian.run';
const DEFAULT_IMAGE = `${DOMAIN}/images/benchmarks/guangsucloud-speedtest.png`;

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildPageSeo(pageData: PageData): HeadConfig[] {
  const rel = pageData.relativePath.replace(/\\/g, '/');
  
  // Skip /go/ affiliate redirect pages
  if (rel.startsWith('go/')) {
    return [
      ['meta', { name: 'robots', content: 'noindex, nofollow, noarchive' }]
    ];
  }

  // 1. Calculate clean canonical URL
  let cleanPath = rel.replace(/\.md$/, '').replace(/\/index$/, '');
  if (cleanPath === 'index') cleanPath = '';
  const canonicalUrl = cleanPath ? `${DOMAIN}/${cleanPath}` : `${DOMAIN}/`;

  // 2. Compute titles & descriptions
  const rawTitle = (pageData.frontmatter.title || pageData.title || '机场推荐').trim();
  const pageTitle = cleanPath === '' ? '机场推荐网 - 2026专业机场推荐、排行榜与IEPL专线深度评测' : `${rawTitle} - 机场推荐 (jichangtuijian.run)`;
  const rawDesc = (pageData.frontmatter.description || pageData.description || '2026专业机场推荐与评测知识图谱：涵盖稳定IEPL专线、性价比排行、ChatGPT与Claude解锁、流媒体4K秒开与全客户端导入教程。').trim();

  // 3. Determine Page Type
  const isHome = cleanPath === '';
  const isReview = cleanPath.startsWith('reviews/') && cleanPath !== 'reviews';
  const isBrand = cleanPath.startsWith('brands/') && cleanPath !== 'brands';
  const isCompare = cleanPath.startsWith('compare/');
  const isGuideOrClient = cleanPath.startsWith('guides/') || cleanPath.startsWith('clients/') || cleanPath.startsWith('troubleshooting/');
  const isCategoryIndex = topicClusters.some(c => c.path.replace(/^\/|\/$/g, '') === cleanPath);

  // 4. Calculate breadcrumb trail
  const breadcrumbs: BreadcrumbItem[] = [{ name: '首页', url: `${DOMAIN}/` }];
  const segments = cleanPath.split('/').filter(Boolean);

  if (segments.length > 0) {
    const cluster = topicClusters.find(c => c.id === segments[0]);
    if (cluster) {
      breadcrumbs.push({
        name: `${cluster.num} ${cluster.title}`,
        url: `${DOMAIN}${cluster.path}`
      });
      if (segments.length > 1) {
        breadcrumbs.push({
          name: rawTitle.split('：')[0].split(' - ')[0],
          url: canonicalUrl
        });
      }
    } else {
      breadcrumbs.push({
        name: rawTitle.split('：')[0].split(' - ')[0],
        url: canonicalUrl
      });
    }
  }

  // 5. Build Head Tags
  const heads: HeadConfig[] = [
    ['link', { rel: 'canonical', href: canonicalUrl }],
    ['meta', { property: 'og:url', content: canonicalUrl }],
    ['meta', { property: 'og:title', content: pageTitle }],
    ['meta', { property: 'og:description', content: rawDesc }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:site_name', content: '机场推荐网 (jichangtuijian.run)' }],
    ['meta', { property: 'og:image', content: DEFAULT_IMAGE }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: pageTitle }],
    ['meta', { name: 'twitter:description', content: rawDesc }],
    ['meta', { name: 'twitter:image', content: DEFAULT_IMAGE }]
  ];

  if (isReview || isBrand || isCompare || isGuideOrClient) {
    heads.push(['meta', { property: 'og:type', content: 'article' }]);
  } else {
    heads.push(['meta', { property: 'og:type', content: 'website' }]);
  }

  // 6. Generate JSON-LD Schemas based on Page Type
  const schemas: Record<string, any>[] = [];

  // BreadcrumbList for all non-home pages
  if (!isHome && breadcrumbs.length > 1) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((b, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: b.name,
        item: b.url
      }))
    });
  }

  // Homepage Schemas
  if (isHome) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: '机场推荐网',
      url: `${DOMAIN}/`,
      description: rawDesc,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${DOMAIN}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    });

    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: '机场推荐网',
      url: `${DOMAIN}/`,
      logo: `${DOMAIN}/images/logo.svg`,
      description: '2026专业机场推荐与评测导航知识图谱，坚持实机测速与真实体验，不做虚假推广。',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Support',
        url: `${DOMAIN}/`
      }
    });

    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: '2026年度核心推荐机场名录',
      numberOfItems: airportsData.length,
      itemListElement: airportsData.slice(0, 10).map((a, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: a.name,
        url: `${DOMAIN}${a.reviewPath}`,
        description: a.tagline
      }))
    });
  }

  // Category Index Pages Schemas
  if (isCategoryIndex && !isHome) {
    const cluster = topicClusters.find(c => c.path.replace(/^\/|\/$/g, '') === cleanPath);
    if (cluster) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${cluster.num} ${cluster.title} · 权威导航`,
        description: rawDesc,
        url: canonicalUrl,
        mainEntity: {
          '@type': 'ItemList',
          name: `${cluster.title} 核心专题名录`,
          numberOfItems: cluster.subTopics.length,
          itemListElement: cluster.subTopics.map((s, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: s.title,
            url: `${DOMAIN}${s.path}`
          }))
        }
      });
    }
  }

  // Brand Detail Page Schema
  if (isBrand) {
    const slug = segments[1];
    const airport = airportsData.find(a => a.slug === slug);
    if (airport) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: `${airport.name} 专线加速服务`,
        description: airport.tagline,
        brand: {
          '@type': 'Brand',
          name: airport.name
        },
        offers: {
          '@type': 'Offer',
          price: String(airport.priceStarting),
          priceCurrency: 'CNY',
          priceValidUntil: '2026-12-31',
          availability: 'https://schema.org/InStock',
          url: canonicalUrl
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: String(airport.rating),
          reviewCount: '128',
          bestRating: '5',
          worstRating: '1'
        }
      });
    }
  }

  // Articles & Technical Guides Schemas
  if (isCompare || isGuideOrClient) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': isGuideOrClient ? 'TechArticle' : 'Article',
      headline: rawTitle,
      description: rawDesc,
      url: canonicalUrl,
      inLanguage: 'zh-CN',
      datePublished: '2026-01-10T08:00:00+08:00',
      dateModified: '2026-09-23T14:20:00+08:00',
      author: {
        '@type': 'Organization',
        name: '机场推荐评测实验室',
        url: `${DOMAIN}/`
      },
      publisher: {
        '@type': 'Organization',
        name: '机场推荐网',
        logo: {
          '@type': 'ImageObject',
          url: `${DOMAIN}/images/logo.svg`
        }
      }
    });
  }

  // Push generated JSON-LD scripts
  for (const s of schemas) {
    heads.push([
      'script',
      { type: 'application/ld+json' },
      JSON.stringify(s)
    ]);
  }

  return heads;
}
