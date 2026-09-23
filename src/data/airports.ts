export interface Airport {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  rating: number; // 5.0制
  speedScore: number; // 百分制
  stabilityScore: number; // 百分制
  priceStarting: number; // 起步折算或月付基准（元）
  priceDisplay: string; // 界面标准展示价格文案，如 "约 7.5 元/月"
  priceType: '年付折算价' | '真实月付价';
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
  benchmarkImage?: string;
  paymentMethods: string[];
  trafficStarting: string;
}

export const airportsData: Airport[] = [
  {
    id: 'guangsucloud',
    name: '光速云',
    slug: 'guangsucloud',
    tagline: '2020年老牌旗舰｜企业级IEPL专线与VLESS原生解锁｜主推首选',
    rating: 4.98,
    speedScore: 99,
    stabilityScore: 99,
    priceStarting: 7.5,
    priceDisplay: '约 7.5 元/月 (年付折算) / 月付 23 元',
    priceType: '年付折算价',
    cycle: '年付',
    lineTypes: ['IEPL专线', 'BGP中转'],
    protocols: ['Vless', 'Shadowsocks'],
    nodesCount: '90+ 节点',
    bandwidth: '峰值 5Gbps 独立内网专线',
    trafficStarting: '59GB/月 (年付) / 148GB (月付)',
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
    establishedYear: 2020,
    status: 'active',
    couponCode: 'AMM',
    couponDiscount: '新人注册专属 8 折优惠券',
    badge: '2026综合首推·老牌稳定',
    featured: true,
    paymentMethods: ['支付宝', '微信', 'USDT'],
    benchmarkImage: '/images/benchmarks/guangsucloud-speedtest.png',
    pros: [
      '2020年稳定运营至今，信誉口碑经历多轮敏感期考验',
      '纯正企业级 IEPL 跨境专线传输，晚高峰 4K/8K 零缓冲秒开',
      '支持先进 VLESS 协议，自研客户端与 Clash / 小火箭双向支持',
      '提供全球高级定制独立 IP 专线服务器方案（满足极端风控场景）'
    ],
    cons: [
      '7.5 元/月为年付折算单价，真实月付套餐起步为 23 元/月',
      '低延迟港台节点高峰期负载较高（但会自动触发智能调度）'
    ],
    bestFor: ['追求极致长期稳定性的重度跨境办公者', 'AI 大模型深度对话与写代码工程师', '4K/8K 极致海外影音发烧友'],
    reviewPath: '/reviews/guangsucloud'
  },
  {
    id: 'feimaoyun',
    name: '飞猫云',
    slug: 'feimaoyun',
    tagline: '2023年黑马 IEPL 专线｜低价小流量与自研客户端全支持｜第二推荐',
    rating: 4.92,
    speedScore: 97,
    stabilityScore: 96,
    priceStarting: 7.0,
    priceDisplay: '约 7.0 元/月 (年付折算)',
    priceType: '年付折算价',
    cycle: '年付',
    lineTypes: ['IEPL专线'],
    protocols: ['Shadowsocks', 'Vless'],
    nodesCount: '65+ 节点',
    bandwidth: '峰值 2.5Gbps 专线集群',
    trafficStarting: '50GB / 月',
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
    couponCode: 'flycat888',
    couponDiscount: '新用户购买季付及以上享 8 折',
    badge: '高性价比·轻度推荐',
    featured: true,
    paymentMethods: ['支付宝', '微信', 'USDT'],
    benchmarkImage: '/images/benchmarks/feimaoyun-speedtest.png',
    pros: [
      'IEPL 专线结合低价年付折算方案，年均成本极具杀伤力',
      '自研一键登录客户端，小白新手开箱即用无需复杂配置',
      '覆盖主流海外流媒体与 AI 工具日常使用场景',
      '节点响应迅速，常态 Ping 维持在 40-70ms 区间'
    ],
    cons: [
      '入门套餐流量仅 50GB，重度大文件下载用户建议选进阶档',
      '7元价格必须年付方可享受折算优惠'
    ],
    bestFor: ['预算敏感、月用量在 50GB 内的轻度用户', '查阅外文文献与日常社交新手机场选购者'],
    reviewPath: '/reviews/feimaoyun'
  },
  {
    id: 'breezenet',
    name: '微风网络',
    slug: 'breezenet',
    tagline: '低价小流量 IEPL 专线标杆｜季付9折｜轻度上网省心之选',
    rating: 4.88,
    speedScore: 96,
    stabilityScore: 96,
    priceStarting: 7.0,
    priceDisplay: '约 7.0 元/月 (年付折算)',
    priceType: '年付折算价',
    cycle: '年付',
    lineTypes: ['IEPL专线'],
    protocols: ['Shadowsocks', 'Vless'],
    nodesCount: '55+ 节点',
    bandwidth: '峰值 2.5Gbps 专线集群',
    trafficStarting: '50GB / 月',
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
      gemini: false,
      cursor: true
    },
    establishedYear: 2023,
    status: 'active',
    couponCode: 'flat888',
    couponDiscount: '购买季付及以上套餐享 9 折',
    badge: '第三顺位·精选专线',
    featured: true,
    paymentMethods: ['支付宝', '微信', 'USDT'],
    benchmarkImage: '/images/benchmarks/breezenet-speedtest.png',
    pros: [
      '约 7 元/月的超低入手门槛，IEPL 专线抗封锁稳定性出色',
      '支持自研客户端，同时可联系官方客服获取第三方订阅',
      '套餐结构简单明晰，没有隐藏扣费或倍率套路'
    ],
    cons: [
      '第三方客户端订阅需要联系官方客服导入或转换',
      '大促期间客服工单响应略有排队'
    ],
    bestFor: ['日常网页浏览、社交与轻度视频的白领和学生群体'],
    reviewPath: '/reviews/breezenet'
  },
  {
    id: 'xingdaomeng',
    name: '星岛梦',
    slug: 'xingdaomeng',
    tagline: '2020年老牌内网专线｜特有不限时套餐｜长期备用与低价年付',
    rating: 4.89,
    speedScore: 95,
    stabilityScore: 98,
    priceStarting: 8.0,
    priceDisplay: '约 8.0 元/月 (年付折算)',
    priceType: '年付折算价',
    cycle: '年付',
    lineTypes: ['IEPL专线', 'BGP中转'],
    protocols: ['Shadowsocks'],
    nodesCount: '70+ 节点',
    bandwidth: '峰值 3.0Gbps 专线集群',
    trafficStarting: '60GB / 月 (提供不限时套餐)',
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
    establishedYear: 2020,
    status: 'active',
    couponCode: 'nmw888',
    couponDiscount: '新人注册专享 9 折',
    badge: '老牌不限时套餐',
    featured: true,
    paymentMethods: ['支付宝', '微信', 'USDT'],
    benchmarkImage: '/images/benchmarks/xingdaomeng-speedtest.png',
    pros: [
      '2020年老牌专线，套餐矩阵极其丰富，特有永久不过期不限时套餐',
      '企业级内网专线保障，节点在线率常年 > 99.5%',
      '第三方客户端全面直连导入，规则兼容好'
    ],
    cons: [
      '8元单价需年付折算，单月试错成本需考量',
      '界面UI偏经典简约风格'
    ],
    bestFor: ['寻找稳定备用梯子的用户', '每月用量极少但要求长期有效的商务常备用户'],
    reviewPath: '/reviews/xingdaomeng'
  },
  {
    id: 'worryfree',
    name: '无忧链接',
    slug: 'worryfree',
    tagline: '2025年新锐专线｜轻量套餐低至6元｜无需转换全平台直连',
    rating: 4.85,
    speedScore: 96,
    stabilityScore: 95,
    priceStarting: 19.0,
    priceDisplay: '19.0 元/月 (轻量套餐低至6元)',
    priceType: '真实月付价',
    cycle: '月付',
    lineTypes: ['IEPL专线'],
    protocols: ['Vless', 'Shadowsocks'],
    nodesCount: '60+ 节点',
    bandwidth: '2.5Gbps 专线',
    trafficStarting: '100GB / 月',
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
    establishedYear: 2025,
    status: 'active',
    couponCode: 'wuyou666',
    couponDiscount: '新人注册即享专属折扣',
    badge: '新锐免转换·月付优选',
    featured: true,
    paymentMethods: ['支付宝', '微信', 'USDT'],
    pros: [
      '无需任何订阅转换，原生兼容 iOS / 安卓 / Windows / Mac 各类客户端',
      '提供低至 6 元/月的微型轻量套餐，满足极轻量偶尔需求',
      '标准 19 元/月包含 100GB 专线流量，性价比较高'
    ],
    cons: [
      '2025年成立，运营时长相比老牌较短',
      '海外偏远节点数量相对精简'
    ],
    bestFor: ['注重月付灵活度、嫌订阅转换繁琐的跨端用户'],
    reviewPath: '/reviews/worryfree'
  },
  {
    id: 'twilight',
    name: '暮光加速',
    slug: 'twilight',
    tagline: '2023年专线｜20元120GB主流档位｜VLESS企业内网架构',
    rating: 4.83,
    speedScore: 95,
    stabilityScore: 96,
    priceStarting: 20.0,
    priceDisplay: '20.0 元/月',
    priceType: '真实月付价',
    cycle: '月付',
    lineTypes: ['IEPL专线'],
    protocols: ['Vless', 'Shadowsocks'],
    nodesCount: '60+ 节点',
    bandwidth: '2.5Gbps 专线',
    trafficStarting: '120GB / 月',
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
    couponCode: 'muguang5555',
    couponDiscount: '专属优惠码抵扣',
    badge: '20元主力档位',
    featured: false,
    paymentMethods: ['支付宝', '微信', 'USDT'],
    benchmarkImage: '/images/benchmarks/twilight-speedtest.png',
    pros: [
      '20 元提供 120GB 充足流量，专线线路冗余度佳',
      '全节点 VLESS 协议加持，晚高峰断流率极低',
      '支持主流第三方订阅一键导入'
    ],
    cons: [
      '不支持自研客户端，需要用户自行安装 Clash 等工具',
      '高峰期个别欧美冷门节点速度有衰减'
    ],
    bestFor: ['月用量 100GB 左右、注重专线传输的主流日常用户'],
    reviewPath: '/reviews/twilight'
  },
  {
    id: 'ermaocloud',
    name: '二猫云',
    slug: 'ermaocloud',
    tagline: '2023年老店｜20元130GB超规配置｜IEPL专线与VLESS加持',
    rating: 4.84,
    speedScore: 96,
    stabilityScore: 95,
    priceStarting: 20.0,
    priceDisplay: '20.0 元/月',
    priceType: '真实月付价',
    cycle: '月付',
    lineTypes: ['IEPL专线'],
    protocols: ['Vless', 'Shadowsocks'],
    nodesCount: '65+ 节点',
    bandwidth: '2.5Gbps 专线',
    trafficStarting: '130GB / 月',
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
    couponCode: 'ermao5555',
    couponDiscount: '专属折扣立减',
    badge: '中等流量加量档',
    featured: false,
    paymentMethods: ['支付宝', '微信', 'USDT'],
    benchmarkImage: '/images/benchmarks/ermaocloud-speedtest.png',
    pros: [
      '在 20 元档位给出 130GB 流量，比传统 100GB 多出 30% 裕量',
      'IEPL 专线全时段测速表现平稳，丢包率控制优异',
      '流媒体与 AI 解锁适配度高'
    ],
    cons: [
      '客户端需手动配置第三方应用',
      '退款机制相对严格'
    ],
    bestFor: ['嫌 100GB 不太够用、又不想买 25 元档的实用主义者'],
    reviewPath: '/reviews/ermaocloud'
  },
  {
    id: 'civetnet',
    name: '灵猫网络',
    slug: 'civetnet',
    tagline: '2024年月付大流量黑马｜19元150GB｜企业级内网与不限时',
    rating: 4.87,
    speedScore: 97,
    stabilityScore: 96,
    priceStarting: 19.0,
    priceDisplay: '19.0 元/月 (150GB)',
    priceType: '真实月付价',
    cycle: '月付',
    lineTypes: ['IEPL专线', 'BGP中转'],
    protocols: ['Shadowsocks'],
    nodesCount: '75+ 节点',
    bandwidth: '3.0Gbps 专线',
    trafficStarting: '150GB / 月 (提供不限时套餐)',
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
    establishedYear: 2024,
    status: 'active',
    couponCode: 'lmao888',
    couponDiscount: '新人注册立享 9 折',
    badge: '月付大流量性价比王',
    featured: true,
    paymentMethods: ['支付宝', '微信', 'USDT'],
    benchmarkImage: '/images/benchmarks/civetnet-speedtest.png',
    pros: [
      '19 元直接给到 150GB 专线流量，同价位单位流量单价几乎最低',
      '提供不限时套餐，无月度清零压力',
      '企业级内网专线节点延迟低，网页加载瞬时响应'
    ],
    cons: [
      '协议以 Shadowsocks 为主，高敏感时期建议搭配内网入口',
      '节点导入需咨询在线客服获取特定格式'
    ],
    bestFor: ['追剧达人、频繁看 YouTube 4K 视频的大流量月付用户'],
    reviewPath: '/reviews/civetnet'
  },
  {
    id: 'jiliancloud',
    name: '极连云',
    slug: 'jiliancloud',
    tagline: '2024年综合专线｜18元100GB｜自研客户端与AI流媒体兼顾',
    rating: 4.82,
    speedScore: 95,
    stabilityScore: 94,
    priceStarting: 18.0,
    priceDisplay: '18.0 元/月',
    priceType: '真实月付价',
    cycle: '月付',
    lineTypes: ['IEPL专线'],
    protocols: ['Shadowsocks'],
    nodesCount: '50+ 节点',
    bandwidth: '2.0Gbps 专线',
    trafficStarting: '100GB / 月',
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
    establishedYear: 2024,
    status: 'active',
    couponCode: 'ji8888',
    couponDiscount: '专属优惠码抵扣',
    badge: '20元内均衡之选',
    featured: false,
    paymentMethods: ['支付宝', '微信', 'USDT'],
    benchmarkImage: '/images/benchmarks/jiliancloud-speedtest.png',
    pros: [
      '月预算控制在 20 元以内（18元/月），IEPL 专线保障',
      '提供自研客户端，降低新手配置门槛',
      'AI 与流媒体场景全面兼顾'
    ],
    cons: [
      '节点总数相较百节点大厂略少',
      '非热门地区节点带宽有上限'
    ],
    bestFor: ['预算卡在 20 元以内、追求开箱即用的小白用户'],
    reviewPath: '/reviews/jiliancloud'
  },
  {
    id: 'yuzhouyun',
    name: '宇宙云',
    slug: 'yuzhouyun',
    tagline: '2023年老牌技术流｜14.9元超低门槛IEPL专线｜VLESS高吞吐',
    rating: 4.89,
    speedScore: 98,
    stabilityScore: 96,
    priceStarting: 14.9,
    priceDisplay: '14.9 元/月 (100GB)',
    priceType: '真实月付价',
    cycle: '月付',
    lineTypes: ['IEPL专线'],
    protocols: ['Vless', 'Shadowsocks'],
    nodesCount: '70+ 节点',
    bandwidth: '9Gbps 超大测速带宽接口',
    trafficStarting: '100GB / 月',
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
    couponCode: 'YUZHOU553',
    couponDiscount: '专属立减优惠码',
    badge: '15元档性价比天花板',
    featured: true,
    paymentMethods: ['支付宝', '微信', 'USDT'],
    benchmarkImage: '/images/benchmarks/yuzhouyun-speedtest.png',
    pros: [
      '仅需 14.9 元即可享受真 IEPL 专线与 VLESS 协议，门槛极低',
      '实测采用珠海联通 9Gbps 超高带宽后端，峰值下行极其亮眼',
      '自研客户端与第三方订阅双通道完备'
    ],
    cons: [
      '14.9 元入门套餐晚高峰偶尔需切换备用专线节点',
      '流媒体节点由于使用人数多需按需挑选'
    ],
    bestFor: ['注重 15 元预算极限性价比、追求 VLESS 专线架构的技术型用户'],
    reviewPath: '/reviews/yuzhouyun'
  },
  {
    id: 'v2yun',
    name: '唯兔云',
    slug: 'v2yun',
    tagline: '60+节点全三网优化｜智能负载均衡调度｜14.9元灵活月付',
    rating: 4.81,
    speedScore: 94,
    stabilityScore: 95,
    priceStarting: 14.9,
    priceDisplay: '14.9 元/月',
    priceType: '真实月付价',
    cycle: '月付',
    lineTypes: ['IEPL专线', 'BGP中转'],
    protocols: ['Vless', 'Shadowsocks'],
    nodesCount: '60+ 节点',
    bandwidth: '2.5Gbps 专线集群',
    trafficStarting: '100GB / 月',
    streamingUnlock: {
      netflix: true,
      youtube4k: true,
      disney: false,
      tiktok: true,
      spotify: true
    },
    aiUnlock: {
      chatgpt: true,
      claude: true,
      gemini: false,
      cursor: true
    },
    establishedYear: 2023,
    status: 'active',
    couponCode: 'weitu666',
    couponDiscount: '新用户专享 9 折',
    badge: '节点调度·三网优化',
    featured: false,
    paymentMethods: ['支付宝', '微信', 'USDT'],
    benchmarkImage: '/images/benchmarks/v2yun-speedtest.png',
    pros: [
      '针对电信、联通、移动进行深度入口差异化优化',
      '智能负载均衡算法，单节点拥堵时自动平滑分流',
      '14.9 元月付起步，支持 100GB 基础流量'
    ],
    cons: [
      '资料重点在于基础网络调度，AI 与冷门流媒体原生解锁需看实际节点',
      '客户端需依官方订阅格式手动导入'
    ],
    bestFor: ['移动宽带或北方联通等网络环境挑剔、注重三网适配的用户'],
    reviewPath: '/reviews/v2yun'
  },
  {
    id: 'u1s1',
    name: 'U1S1',
    slug: 'u1s1',
    tagline: '20元档专线均衡代表｜120GB流量｜VLESS与IEPL深度结合',
    rating: 4.83,
    speedScore: 95,
    stabilityScore: 95,
    priceStarting: 20.0,
    priceDisplay: '20.0 元/月',
    priceType: '真实月付价',
    cycle: '月付',
    lineTypes: ['IEPL专线'],
    protocols: ['Vless', 'Shadowsocks'],
    nodesCount: '60+ 节点',
    bandwidth: '2.5Gbps 专线',
    trafficStarting: '120GB / 月',
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
    couponCode: 'akaka',
    couponDiscount: '专属优惠码',
    badge: '20元经典均衡',
    featured: false,
    paymentMethods: ['支付宝', '微信', 'USDT'],
    benchmarkImage: '/images/benchmarks/u1s1-speedtest.png',
    pros: [
      '20 元月付配比 120GB 流量，各方面没有明显短板',
      '提供自研客户端，同时支持 Clash / Shadowrocket',
      '海外流媒体支持较好'
    ],
    cons: [
      '品牌资料未提供大额新人注册折扣',
      '客服响应集中在工作时段'
    ],
    bestFor: ['追求稳定月付、不想费心挑选套餐的上班族'],
    reviewPath: '/reviews/u1s1'
  },
  {
    id: 'gnt',
    name: '光年梯',
    slug: 'gnt',
    tagline: '2025年新星｜18元110GB｜IEPL专线与VLESS轻度综合型',
    rating: 4.80,
    speedScore: 94,
    stabilityScore: 94,
    priceStarting: 18.0,
    priceDisplay: '18.0 元/月',
    priceType: '真实月付价',
    cycle: '月付',
    lineTypes: ['IEPL专线'],
    protocols: ['Vless', 'Shadowsocks'],
    nodesCount: '50+ 节点',
    bandwidth: '2.0Gbps 专线',
    trafficStarting: '110GB / 月',
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
    establishedYear: 2025,
    status: 'active',
    couponCode: 'gnt6666',
    couponDiscount: '专属激活优惠码',
    badge: '18元综合新选择',
    featured: false,
    paymentMethods: ['支付宝', '微信', 'USDT'],
    benchmarkImage: '/images/benchmarks/gnt-speedtest.png',
    pros: [
      '18 元给到 110GB 专线，性价比较高',
      '具备自研客户端，支持第三方订阅',
      'AI 与海外视频工具表现流畅'
    ],
    cons: [
      '2025年成立的新品牌，长期生命周期需持续观察'
    ],
    bestFor: ['想尝鲜新专线机场、控制月成本在 20 元以内的用户'],
    reviewPath: '/reviews/gnt'
  },
  {
    id: '1flyun',
    name: '一翻云',
    slug: '1flyun',
    tagline: '20元档大流量王牌｜150GB专线配比｜IEPL与VLESS高吞吐',
    rating: 4.86,
    speedScore: 96,
    stabilityScore: 95,
    priceStarting: 20.0,
    priceDisplay: '20.0 元/月 (150GB)',
    priceType: '真实月付价',
    cycle: '月付',
    lineTypes: ['IEPL专线'],
    protocols: ['Vless', 'Shadowsocks'],
    nodesCount: '70+ 节点',
    bandwidth: '3.0Gbps 专线',
    trafficStarting: '150GB / 月',
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
    establishedYear: 2024,
    status: 'active',
    couponCode: 'yfy6666',
    couponDiscount: '专属优惠码抵扣',
    badge: '20元150GB大流量',
    featured: false,
    paymentMethods: ['支付宝', '微信', 'USDT'],
    benchmarkImage: '/images/benchmarks/1flyun-speedtest.png',
    pros: [
      '20 元直给 150GB，在专线机场中极为罕见的大流量配置',
      '实测下行吞吐充沛，适合下载与多媒体消耗',
      '第三方订阅格式支持完善'
    ],
    cons: [
      '未标配自研客户端，需配合第三方软件使用',
      '高峰期个别节点延迟稍有波动'
    ],
    bestFor: ['每月需要 150GB 左右的大流量追剧党与跨境电商店铺管理者'],
    reviewPath: '/reviews/1flyun'
  },
  {
    id: 'sogoyun',
    name: 'SOGO云',
    slug: 'sogoyun',
    tagline: '2026年全架构新锐｜25元150GB综合旗舰｜IEPL与自研双持',
    rating: 4.82,
    speedScore: 96,
    stabilityScore: 94,
    priceStarting: 25.0,
    priceDisplay: '25.0 元/月',
    priceType: '真实月付价',
    cycle: '月付',
    lineTypes: ['IEPL专线'],
    protocols: ['Vless', 'Shadowsocks'],
    nodesCount: '60+ 节点',
    bandwidth: '2.5Gbps 专线',
    trafficStarting: '150GB / 月',
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
    establishedYear: 2026,
    status: 'active',
    couponCode: 'sss777',
    couponDiscount: '专属优惠码',
    badge: '2026新秀·综合型',
    featured: false,
    paymentMethods: ['支付宝', '微信', 'USDT'],
    benchmarkImage: '/images/benchmarks/sogoyun-speedtest.png',
    pros: [
      '25 元提供 150GB 专线，整体定位偏向中高端综合型',
      '自研客户端界面新颖，第三方导入无缝对接',
      '晚高峰带宽分配充裕'
    ],
    cons: [
      '2026年新开品牌，建议优先月付体验'
    ],
    bestFor: ['喜欢尝试全新架构、要求大带宽与自研客户端的用户'],
    reviewPath: '/reviews/sogoyun'
  },
  {
    id: 'kosing',
    name: '可信云',
    slug: 'kosing',
    tagline: '2024年多设备支持｜25元150GB｜VLESS专线与三网适配',
    rating: 4.81,
    speedScore: 95,
    stabilityScore: 94,
    priceStarting: 25.0,
    priceDisplay: '25.0 元/月',
    priceType: '真实月付价',
    cycle: '月付',
    lineTypes: ['IEPL专线'],
    protocols: ['Vless', 'Shadowsocks'],
    nodesCount: '60+ 节点',
    bandwidth: '2.5Gbps 专线',
    trafficStarting: '150GB / 月',
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
      gemini: false,
      cursor: true
    },
    establishedYear: 2024,
    status: 'active',
    couponCode: 'kkk333',
    couponDiscount: '专属抵扣码',
    badge: '多设备专线档',
    featured: false,
    paymentMethods: ['支付宝', '微信', 'USDT'],
    benchmarkImage: '/images/benchmarks/kosing-speedtest.png',
    pros: [
      '25 元 150GB 大容量，专为多设备同时在线优化并发连接',
      'IEPL 专线全链路低丢包率'
    ],
    cons: [
      'AI 与特定流媒体未公开专门解锁承诺，视节点 IP 情况而定',
      '客服以工单为主'
    ],
    bestFor: ['手机、平板、电脑多设备并发使用的重度专线需求者'],
    reviewPath: '/reviews/kosing'
  },
  {
    id: 'speedworld',
    name: '速界',
    slug: 'speedworld',
    tagline: 'AI场景专属优化专线｜25元150GB｜ChatGPT/Claude/Gemini',
    rating: 4.85,
    speedScore: 96,
    stabilityScore: 95,
    priceStarting: 25.0,
    priceDisplay: '25.0 元/月',
    priceType: '真实月付价',
    cycle: '月付',
    lineTypes: ['IEPL专线'],
    protocols: ['Vless', 'Shadowsocks'],
    nodesCount: '65+ 节点',
    bandwidth: '2.5Gbps 专线',
    trafficStarting: '150GB / 月',
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
    establishedYear: 2024,
    status: 'active',
    couponCode: 'sss1111',
    couponDiscount: '专属优惠码',
    badge: 'AI场景专攻',
    featured: false,
    paymentMethods: ['支付宝', '微信', 'USDT'],
    benchmarkImage: '/images/benchmarks/speedworld-speedtest.png',
    pros: [
      '重点针对 OpenAI、Claude、Gemini 的官方 API 与 Web 端进行 IP 清洁度轮换',
      '25 元配比 150GB 高规格流量，支持自研客户端与第三方客户端',
      'IEPL 专线防封锁特性突出'
    ],
    cons: [
      '流媒体解锁并非其首要宣传点',
      '冷门地区节点较少'
    ],
    bestFor: ['日常频繁调用 ChatGPT、Claude、Cursor 等 AI 生产力工具的开发者'],
    reviewPath: '/reviews/speedworld'
  },
  {
    id: 'flashleap',
    name: '闪跃',
    slug: 'flashleap',
    tagline: '2024年多设备专线｜24元150GB｜VLESS高吞吐与IEPL专线',
    rating: 4.80,
    speedScore: 94,
    stabilityScore: 94,
    priceStarting: 24.0,
    priceDisplay: '24.0 元/月',
    priceType: '真实月付价',
    cycle: '月付',
    lineTypes: ['IEPL专线'],
    protocols: ['Vless', 'Shadowsocks'],
    nodesCount: '55+ 节点',
    bandwidth: '2.0Gbps 专线',
    trafficStarting: '150GB / 月',
    streamingUnlock: {
      netflix: true,
      youtube4k: true,
      disney: false,
      tiktok: true,
      spotify: true
    },
    aiUnlock: {
      chatgpt: true,
      claude: true,
      gemini: false,
      cursor: true
    },
    establishedYear: 2024,
    status: 'active',
    couponCode: 'shanyue',
    couponDiscount: '专属优惠券',
    badge: '24元大容量档',
    featured: false,
    paymentMethods: ['支付宝', '微信', 'USDT'],
    pros: [
      '24 元 150GB，介于 20 元与 25 元之间的折中大容量方案',
      'VLESS 协议与 IEPL 专线底层，基础网页与视频畅快'
    ],
    cons: [
      '流媒体与 AI 数据保持中性，需按需测试'
    ],
    bestFor: ['注重月付大流量与多设备同时在线的普通网民'],
    reviewPath: '/reviews/flashleap'
  },
  {
    id: 'globalcloud',
    name: '全球云',
    slug: 'globalcloud',
    tagline: '2026年综合新秀｜20元120GB｜VLESS与IEPL专线经典组合',
    rating: 4.81,
    speedScore: 95,
    stabilityScore: 94,
    priceStarting: 20.0,
    priceDisplay: '20.0 元/月',
    priceType: '真实月付价',
    cycle: '月付',
    lineTypes: ['IEPL专线'],
    protocols: ['Vless', 'Shadowsocks'],
    nodesCount: '60+ 节点',
    bandwidth: '2.5Gbps 专线',
    trafficStarting: '120GB / 月',
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
    establishedYear: 2026,
    status: 'active',
    couponCode: 'qqy7777',
    couponDiscount: '专属激活优惠码',
    badge: '2026专线新力军',
    featured: false,
    paymentMethods: ['支付宝', '微信', 'USDT'],
    benchmarkImage: '/images/benchmarks/globalcloud-speedtest.png',
    pros: [
      '20 元 120GB 主流规格，VLESS + IEPL 专线经典抗封锁配置',
      '覆盖常见 AI 工具与流媒体访问需求',
      '第三方客户端全面兼容'
    ],
    cons: [
      '2026年新上线品牌，推荐采用月付模式'
    ],
    bestFor: ['预算 20 元、寻找新专线资源分流的用户'],
    reviewPath: '/reviews/globalcloud'
  }
];

export function getAirportBySlug(slug: string): Airport | undefined {
  return airportsData.find((a) => a.slug === slug || a.id === slug);
}
