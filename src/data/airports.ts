export interface Airport {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  rating: number; // 5.0制
  speedScore: number; // 百分制
  stabilityScore: number; // 百分制
  priceStarting: number; // 起步月付价格（元）
  cycle: '月付' | '季付' | '年付' | '按量付费' | '不限时';
  lineTypes: ('IEPL专线' | 'IPLC专线' | 'BGP中转' | '直连')[];
  protocols: ('Shadowsocks' | 'Vmess' | 'Vless' | 'Trojan' | 'Hysteria2')[];
  nodesCount: string;
  bandwidth: string;
  streamingUnlock: {
    netflix: boolean;
    youtube4k: boolean;
    disney: boolean;
    tiktok: boolean;
    spotify: boolean;
  };
  aiUnlock: {
    chatgpt: boolean;
    claude: boolean;
    gemini: boolean;
    cursor: boolean;
  };
  establishedYear: number;
  status: 'active' | 'warning' | 'dead';
  statusNotice?: string;
  couponCode?: string;
  couponDiscount?: string;
  badge?: string;
  featured?: boolean;
  pros: string[];
  cons: string[];
  bestFor: string[];
  reviewPath: string;
}

export const airportsData: Airport[] = [
  {
    id: 'feimaoyun',
    name: '飞猫云 (FlyingCat)',
    slug: 'feimaoyun',
    tagline: '2026年旗舰级全IEPL内网专线，晚高峰8K秒开与ChatGPT/Claude原生解锁',
    rating: 4.95,
    speedScore: 99,
    stabilityScore: 98,
    priceStarting: 25.0,
    cycle: '月付',
    lineTypes: ['IEPL专线', 'BGP中转'],
    protocols: ['Shadowsocks', 'Trojan', 'Hysteria2'],
    nodesCount: '85+ 节点',
    bandwidth: '峰值 2.5Gbps 独立专线',
    streamingUnlock: {
      netflix: true,
      youtube4k: true,
      disney: true,
      tiktok: true,
      spotify: true
    },
    aiUnlock: {
      chatgpt: true,
      claude: true,
      gemini: true,
      cursor: true
    },
    establishedYear: 2021,
    status: 'active',
    couponCode: 'FLY2026',
    couponDiscount: '全场 8.5 折限时优惠',
    badge: '2026年度综合首推',
    featured: true,
    pros: [
      '全节点采用企业级 IEPL 专线，不经过 GFW，无惧敏感时期',
      '晚高峰（20:00 - 23:00）测速依然稳定维持在 800Mbps 以上',
      '配备专属住宅原生 IP，完美过 ChatGPT / Claude 风控检验',
      '支持全平台主流客户端一键订阅导入（Clash / Shadowrocket / sing-box）'
    ],
    cons: [
      '起步价格略高于平价中转机场',
      '暂不支持免费试用（提供超低起步月付套餐）'
    ],
    bestFor: ['对网络稳定性有严苛要求的跨境办公者', 'AI 开发者与 heavy prompt 用户', '4K/8K 极致流媒体影音爱好者'],
    reviewPath: '/reviews/feimaoyun'
  },
  {
    id: 'yuzhouyun',
    name: '宇宙云 (CosmoCloud)',
    slug: 'yuzhouyun',
    tagline: '老牌技术流 IPLC 国际专线，超低游戏延迟与跨境多机房冗余架构',
    rating: 4.9,
    speedScore: 97,
    stabilityScore: 99,
    priceStarting: 30.0,
    cycle: '月付',
    lineTypes: ['IPLC专线', 'IEPL专线'],
    protocols: ['Shadowsocks', 'Vless'],
    nodesCount: '120+ 节点',
    bandwidth: '峰值 5Gbps 冗余集群',
    streamingUnlock: {
      netflix: true,
      youtube4k: true,
      disney: true,
      tiktok: true,
      spotify: true
    },
    aiUnlock: {
      chatgpt: true,
      claude: true,
      gemini: true,
      cursor: true
    },
    establishedYear: 2019,
    status: 'active',
    couponCode: 'COSMO88',
    couponDiscount: '年付立减 20%',
    badge: '技术流老牌旗舰',
    featured: true,
    pros: [
      '运营超过 6 年无跑路记录，口碑与资金实力雄厚',
      '多地骨干机房入口（广州、上海、北京、深港），就近接入',
      '香港与日本节点延迟稳定在 28-35ms，外服电竞与联机表现卓越',
      '无日志审计设计，保护极客与专业用户隐私'
    ],
    cons: [
      '新手工单响应平均 15-30 分钟，更偏向技术型用户',
      '低价套餐经常处于售罄排队状态'
    ],
    bestFor: ['外服网游玩家（Steam/PS5/日韩服）', '追求极高SLA可用性的外贸跨境企业', '长期年付省心老玩家'],
    reviewPath: '/reviews/yuzhouyun'
  },
  {
    id: 'suying666',
    name: '速鹰666 (QuickHawk)',
    slug: 'suying666',
    tagline: '平价高性价比首选，BGP高密中转与大流量套餐包，学生与普通追剧党神器',
    rating: 4.75,
    speedScore: 92,
    stabilityScore: 91,
    priceStarting: 15.0,
    cycle: '月付',
    lineTypes: ['BGP中转'],
    protocols: ['Shadowsocks', 'Trojan'],
    nodesCount: '60+ 节点',
    bandwidth: '最高 1Gbps 共享带宽',
    streamingUnlock: {
      netflix: true,
      youtube4k: true,
      disney: true,
      tiktok: true,
      spotify: false
    },
    aiUnlock: {
      chatgpt: true,
      claude: false,
      gemini: true,
      cursor: true
    },
    establishedYear: 2022,
    status: 'active',
    couponCode: 'HAWK2026',
    couponDiscount: '满30减5元',
    badge: '高性价比爆款',
    featured: true,
    pros: [
      '月付仅需 15 元起，包含高达 150GB 高速流量',
      '节点覆盖港台日美新韩等主流热点地区',
      '提供详细的一键配置客户端与新手入门文档',
      '支持微信与支付宝双向便捷扫码支付'
    ],
    cons: [
      '晚高峰部分热门节点偶尔出现轻微丢包或波动',
      '不支持 Claude 的严苛 IP 风控'
    ],
    bestFor: ['预算有限的在校学生', '日常刷推、查学术论文与看 YouTube', '初次接触翻墙与客户端配置的新手'],
    reviewPath: '/reviews/suying666'
  },
  {
    id: 'shandianmao',
    name: '闪电猫 (FlashCat)',
    slug: 'shandianmao',
    tagline: '极速 Hysteria2 新协议支持，专为弱网环境与移动端设计的全能型机场',
    rating: 4.8,
    speedScore: 95,
    stabilityScore: 93,
    priceStarting: 19.9,
    cycle: '月付',
    lineTypes: ['BGP中转', 'IEPL专线'],
    protocols: ['Hysteria2', 'Vless', 'Trojan'],
    nodesCount: '75+ 节点',
    bandwidth: '峰值 1.5Gbps 带宽',
    streamingUnlock: {
      netflix: true,
      youtube4k: true,
      disney: true,
      tiktok: true,
      spotify: true
    },
    aiUnlock: {
      chatgpt: true,
      claude: true,
      gemini: true,
      cursor: true
    },
    establishedYear: 2023,
    status: 'active',
    couponCode: 'FLASH9',
    couponDiscount: '新用户 9 折',
    badge: 'Hy2协议速度黑马',
    featured: true,
    pros: [
      '深度拥抱 Hysteria2 协议，在 4G/5G 弱网信号下抗丢包能力强悍',
      '全流媒体 4K 极速秒开，画质几乎无需等待缓冲',
      '提供专线节点与中转节点分流混合配置',
      'TG 群组氛围活跃，管理员与客服响应迅速'
    ],
    cons: [
      '老款客户端（如旧版 Shadowrocket）需手动升级内核支持 Hy2',
      '年付折扣力度相对保守'
    ],
    bestFor: ['常在移动网络/通勤环境下使用的用户', 'TikTok 海外短视频创作者与搬运者', '追求全新协议与速度体验的技术党'],
    reviewPath: '/reviews/shandianmao'
  },
  {
    id: 'mojie',
    name: '魔戒 (Mojie)',
    slug: 'mojie',
    tagline: '真正的不限时大流量按量付费机场，不按月清零，备用神器与轻度用户福音',
    rating: 4.7,
    speedScore: 89,
    stabilityScore: 92,
    priceStarting: 12.0,
    cycle: '不限时',
    lineTypes: ['BGP中转'],
    protocols: ['Shadowsocks'],
    nodesCount: '45+ 节点',
    bandwidth: '峰值 1Gbps',
    streamingUnlock: {
      netflix: true,
      youtube4k: true,
      disney: false,
      tiktok: true,
      spotify: true
    },
    aiUnlock: {
      chatgpt: true,
      claude: false,
      gemini: true,
      cursor: false
    },
    establishedYear: 2020,
    status: 'active',
    couponCode: '',
    couponDiscount: '无门槛按量计费',
    badge: '不限时备用王',
    featured: true,
    pros: [
      '流量永久有效，绝不月底清零，用完再充',
      '超低入门门槛，12 元购买几百 G 流量用一年',
      '多条中转线路备用，主机场故障时完美接管',
      '适合长期仅用来查资料、收发邮件和 Telegram 通讯'
    ],
    cons: [
      '节点速度中规中矩，不适合重度 8K 蓝光流媒体',
      '不保证冷门地区流媒体解锁'
    ],
    bestFor: ['轻度上网用户', '常备第二备用机场以防断网的用户', '临时外贸业务通讯'],
    reviewPath: '/reviews/mojie'
  },
  {
    id: 'fengxianyujing_demo',
    name: '星光云 (已预警示例)',
    slug: 'star-warning-demo',
    tagline: '近期节点大面积红损、工单失联，已被本站列入【二级风险情报观察名单】',
    rating: 2.1,
    speedScore: 35,
    stabilityScore: 20,
    priceStarting: 8.0,
    cycle: '月付',
    lineTypes: ['直连'],
    protocols: ['Shadowsocks'],
    nodesCount: '15 节点 (大半离线)',
    bandwidth: '经常断流',
    streamingUnlock: {
      netflix: false,
      youtube4k: false,
      disney: false,
      tiktok: false,
      spotify: false
    },
    aiUnlock: {
      chatgpt: false,
      claude: false,
      gemini: false,
      cursor: false
    },
    establishedYear: 2024,
    status: 'warning',
    statusNotice: '⚠️ 风险警示：该机场近期管理团队失联、频繁更换域名并停止工单客服支持，极大概率存在跑路风险，本站已下架并禁用购买链接！',
    pros: ['曾提供过低价套餐'],
    cons: [
      '连续 7 天 80% 节点处于超时离线状态',
      '官方 TG 频道开启全员禁言',
      '无法退款且客服不回应'
    ],
    bestFor: ['切勿购买！仅供风险参考'],
    reviewPath: '/reviews/star-warning-demo'
  }
];

export function getAirportById(id: string): Airport | undefined {
  return airportsData.find((a) => a.id === id);
}

export function getActiveAirports(): Airport[] {
  return airportsData.filter((a) => a.status === 'active');
}

export function getRiskAirports(): Airport[] {
  return airportsData.filter((a) => a.status !== 'active');
}
