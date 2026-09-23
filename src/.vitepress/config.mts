import { defineConfig } from 'vitepress';
import { navGroups, topicClusters } from '../data/navigation';

export default defineConfig({
  title: '机场推荐',
  titleTemplate: ':title - 机场推荐 (jichangtuijian.run)',
  description: '2026专业机场推荐与评测知识图谱：涵盖稳定IEPL专线、性价比排行、ChatGPT与Claude解锁、流媒体4K秒开、全客户端导入教程与跑路风险情报。',
  lang: 'zh-CN',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,
  sitemap: {
    hostname: 'https://jichangtuijian.run',
    transformItems(items) {
      return items.filter((item) => !item.url.startsWith('go/'));
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'author', content: '机场推荐网 jichangtuijian.run' }],
    [
      'meta',
      {
        name: 'keywords',
        content:
          '机场推荐, 机场推荐2026, 2026机场推荐, 稳定机场推荐, 性价比机场, 便宜机场, IEPL机场, IPLC机场, ChatGPT机场, 机场排行, 机场跑路'
      }
    ],
    ['meta', { property: 'og:site_name', content: '机场推荐 (jichangtuijian.run)' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: '机场推荐',
        url: 'https://jichangtuijian.run',
        description: '2026专业机场推荐与评测导航知识图谱',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://jichangtuijian.run/?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      })
    ]
  ],
  themeConfig: {
    siteTitle: '机场推荐',
    logo: '/images/logo.svg',
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索机场、线路、优惠码...',
            buttonAriaLabel: '搜索机场'
          },
          modal: {
            noResultsText: '未找到相关评测或机场',
            resetButtonTitle: '清除搜索',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },
    nav: [
      { text: '首页', link: '/' },
      {
        text: '🔥 推荐排行',
        items: [
          { text: '01 机场推荐', link: '/recommend/' },
          { text: '02 机场排行', link: '/ranking/' },
          { text: '09 实测中心', link: '/benchmarks/' }
        ]
      },
      {
        text: '⚡ 选机分类',
        items: [
          { text: '03 机场品牌库', link: '/brands/' },
          { text: '04 深度评测', link: '/reviews/' },
          { text: '05 机场对比', link: '/compare/' },
          { text: '06 价格套餐', link: '/pricing/' },
          { text: '07 线路节点', link: '/lines/' }
        ]
      },
      {
        text: '🎯 场景用途',
        items: [
          { text: '08 用途推荐', link: '/use-cases/' },
          { text: '13 AI与流媒体', link: '/unlock/' }
        ]
      },
      {
        text: '📘 客户端教程',
        items: [
          { text: '10 客户端下载', link: '/clients/' },
          { text: '11 教程中心', link: '/guides/' },
          { text: '12 网络排障', link: '/troubleshooting/' }
        ]
      },
      {
        text: '🛡️ 风险情报',
        link: '/intel/'
      }
    ],
    sidebar: {
      '/recommend/': [
        {
          text: '01 机场推荐 (Topic Cluster)',
          collapsed: false,
          items: topicClusters[0].subTopics.map((s) => ({ text: s.title, link: s.path }))
        }
      ],
      '/ranking/': [
        {
          text: '02 机场排行',
          collapsed: false,
          items: topicClusters[1].subTopics.map((s) => ({ text: s.title, link: s.path }))
        }
      ],
      '/brands/': [
        {
          text: '03 机场品牌库',
          collapsed: false,
          items: topicClusters[2].subTopics.map((s) => ({ text: s.title, link: s.path }))
        }
      ],
      '/reviews/': [
        {
          text: '04 深度实机评测',
          collapsed: false,
          items: topicClusters[3].subTopics.map((s) => ({ text: s.title, link: s.path }))
        }
      ],
      '/compare/': [
        {
          text: '05 机场对比横评',
          collapsed: false,
          items: topicClusters[4].subTopics.map((s) => ({ text: s.title, link: s.path }))
        }
      ],
      '/pricing/': [
        {
          text: '06 价格套餐长尾',
          collapsed: false,
          items: topicClusters[5].subTopics.map((s) => ({ text: s.title, link: s.path }))
        }
      ],
      '/lines/': [
        {
          text: '07 线路与节点',
          collapsed: false,
          items: topicClusters[6].subTopics.map((s) => ({ text: s.title, link: s.path }))
        }
      ],
      '/use-cases/': [
        {
          text: '08 用途推荐',
          collapsed: false,
          items: topicClusters[7].subTopics.map((s) => ({ text: s.title, link: s.path }))
        }
      ],
      '/benchmarks/': [
        {
          text: '09 实测中心',
          collapsed: false,
          items: topicClusters[8].subTopics.map((s) => ({ text: s.title, link: s.path }))
        }
      ],
      '/clients/': [
        {
          text: '10 客户端指南',
          collapsed: false,
          items: topicClusters[9].subTopics.map((s) => ({ text: s.title, link: s.path }))
        }
      ],
      '/guides/': [
        {
          text: '11 教程中心',
          collapsed: false,
          items: topicClusters[10].subTopics.map((s) => ({ text: s.title, link: s.path }))
        }
      ],
      '/troubleshooting/': [
        {
          text: '12 网络排障',
          collapsed: false,
          items: topicClusters[11].subTopics.map((s) => ({ text: s.title, link: s.path }))
        }
      ],
      '/unlock/': [
        {
          text: '13 AI与流媒体解锁',
          collapsed: false,
          items: topicClusters[12].subTopics.map((s) => ({ text: s.title, link: s.path }))
        }
      ],
      '/intel/': [
        {
          text: '14 风险情报雷达',
          collapsed: false,
          items: topicClusters[13].subTopics.map((s) => ({ text: s.title, link: s.path }))
        }
      ]
    },
    outline: {
      level: [2, 3],
      label: '本文导航目录'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    footer: {
      message: 'jichangtuijian.run · 坚持实机测速与真实体验，不做虚假推广',
      copyright: 'Copyright © 2026 机场推荐. All Rights Reserved. 保留所有权利。'
    }
  }
});
