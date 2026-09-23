export interface SubTopic {
  title: string;
  slug: string;
  path: string;
  keyword: string;
  badge?: string;
}

export interface TopicCluster {
  id: string;
  num: string;
  title: string;
  path: string;
  description: string;
  keywords: string[];
  subTopics: SubTopic[];
  group: 'recommend' | 'selection' | 'usecase' | 'tutorial' | 'intel';
}

export interface NavGroup {
  name: string;
  slug: string;
  description: string;
  clusters: TopicCluster[];
}

export const topicClusters: TopicCluster[] = [
  {
    id: 'recommend',
    num: '01',
    title: '机场推荐',
    path: '/recommend/',
    description: '全站最核心 Topic Cluster，抢占 2026 年度稳定、性价比与各层级核心主搜词。',
    keywords: ['机场推荐', '机场推荐2026', '2026机场推荐', '稳定机场推荐', '靠谱机场推荐'],
    group: 'recommend',
    subTopics: [
      { title: '2026 综合首选机场推荐', slug: '2026', path: '/recommend/2026', keyword: '2026机场推荐', badge: '必看' },
      { title: '稳定不掉线机场推荐', slug: 'stable', path: '/recommend/stable', keyword: '稳定机场推荐' },
      { title: '高性价比平价机场推荐', slug: 'budget', path: '/recommend/budget', keyword: '性价比机场推荐' },
      { title: '新手一键傻瓜式机场推荐', slug: 'beginner', path: '/recommend/beginner', keyword: '新手机场推荐' },
      { title: '5年以上老牌实力机场推荐', slug: 'established', path: '/recommend/established', keyword: '老牌机场推荐' },
      { title: '企业级高端 IEPL 专线推荐', slug: 'premium', path: '/recommend/premium', keyword: '高端机场推荐' },
      { title: '10元以下便宜实用机场推荐', slug: 'cheap', path: '/recommend/cheap', keyword: '便宜机场推荐' },
      { title: '不超卖小众精品机场推荐', slug: 'niche', path: '/recommend/niche', keyword: '小众机场推荐' },
      { title: '国内三网优化节点机场推荐', slug: 'china-optimized', path: '/recommend/china-optimized', keyword: '国内用户机场' },
      { title: '长期主力使用防跑路机场推荐', slug: 'long-term', path: '/recommend/long-term', keyword: '长期使用机场' }
    ]
  },
  {
    id: 'ranking',
    num: '02',
    title: '机场排行',
    path: '/ranking/',
    description: '拆解多维度搜索意图，提供晚高峰、稳定性、速度与流媒体专项排行榜单。',
    keywords: ['机场排行', '机场排行榜', '机场排行榜前十名', '最稳定机场排名'],
    group: 'recommend',
    subTopics: [
      { title: '2026 机场综合实力前十名', slug: 'overall', path: '/ranking/overall', keyword: '机场综合排行', badge: 'TOP10' },
      { title: '99.9% SLA 稳定性天梯榜', slug: 'stability', path: '/ranking/stability', keyword: '稳定性排行' },
      { title: '每元流量性价比最高榜', slug: 'cost-effective', path: '/ranking/cost-effective', keyword: '性价比排行' },
      { title: '千兆极限带宽测速榜', slug: 'speed', path: '/ranking/speed', keyword: '速度排行' },
      { title: '晚高峰（21点）不卡顿排行榜', slug: 'peak-hours', path: '/ranking/peak-hours', keyword: '晚高峰排行', badge: '严选' },
      { title: 'ChatGPT / Claude 解锁成功率榜', slug: 'ai-unlock', path: '/ranking/ai-unlock', keyword: 'AI解锁排行' },
      { title: 'Netflix 4K / Disney+ 榜单', slug: 'streaming', path: '/ranking/streaming', keyword: '流媒体排行' },
      { title: '全球国家与节点数量排行', slug: 'nodes-count', path: '/ranking/nodes-count', keyword: '节点数量排行' },
      { title: 'IEPL / IPLC 纯专线质量榜', slug: 'iplc-iepl', path: '/ranking/iplc-iepl', keyword: '线路质量排行' },
      { title: '本月最新动态口碑风云榜', slug: 'monthly', path: '/ranking/monthly', keyword: '月度机场榜单' }
    ]
  },
  {
    id: 'brands',
    num: '03',
    title: '机场品牌库',
    path: '/brands/',
    description: '吃透海量品牌词：官网、怎么样、优惠码、套餐、跑路了没有等独立档案入口。',
    keywords: ['机场品牌', '机场官网', 'XX机场怎么样', 'XX机场跑路了吗', 'XX机场优惠码'],
    group: 'selection',
    subTopics: [
      { title: '光速云 (主推首选) 完整档案', slug: 'guangsucloud', path: '/brands/guangsucloud', keyword: '光速云官网', badge: '首推' },
      { title: '飞猫云 (第二推荐) 完整档案', slug: 'feimaoyun', path: '/brands/feimaoyun', keyword: '飞猫云官网' },
      { title: '微风网络 (低价专线) 完整档案', slug: 'breezenet', path: '/brands/breezenet', keyword: '微风网络怎么样' },
      { title: '星岛梦 (老牌不限时) 完整档案', slug: 'xingdaomeng', path: '/brands/xingdaomeng', keyword: '星岛梦优惠码' },
      { title: '无忧链接 (免转换) 完整档案', slug: 'worryfree', path: '/brands/worryfree', keyword: '无忧链接评测' },
      { title: '宇宙云 (15元专线) 完整档案', slug: 'yuzhouyun', path: '/brands/yuzhouyun', keyword: '宇宙云官网' },
      { title: '老牌实力品牌专栏', slug: 'legacy', path: '/brands/legacy', keyword: '老牌机场名录' },
      { title: '新崛起黑马品牌专栏', slug: 'emerging', path: '/brands/emerging', keyword: '新兴机场品牌' },
      { title: '全IEPL专线品牌大全', slug: 'iepl-brands', path: '/brands/iepl-brands', keyword: 'IEPL机场品牌' },
      { title: '纯IPLC专线品牌大全', slug: 'iplc-brands', path: '/brands/iplc-brands', keyword: 'IPLC机场品牌' }
    ]
  },
  {
    id: 'reviews',
    num: '04',
    title: '机场深度评测',
    path: '/reviews/',
    description: '商业转化黄金层：统一标准化深度长文评测，全指标数据实操检验。',
    keywords: ['机场评测', '机场实测', 'XX机场评测', '机场体验报告'],
    group: 'selection',
    subTopics: [
      { title: '光速云 2026 深度实机评测', slug: 'guangsucloud', path: '/reviews/guangsucloud', keyword: '光速云评测', badge: '首推' },
      { title: '飞猫云 2026 全面实机评测', slug: 'feimaoyun', path: '/reviews/feimaoyun', keyword: '飞猫云评测', badge: '精华' },
      { title: '微风网络 低价IEPL实机评测', slug: 'breezenet', path: '/reviews/breezenet', keyword: '微风网络实测' },
      { title: '星岛梦 老牌内网专线深度报告', slug: 'xingdaomeng', path: '/reviews/xingdaomeng', keyword: '星岛梦评测' },
      { title: '宇宙云 15元档VLESS实机评测', slug: 'yuzhouyun', path: '/reviews/yuzhouyun', keyword: '宇宙云评测' },
      { title: '晚高峰 21点 拥堵度实机抽测', slug: 'peak-stress-test', path: '/reviews/peak-stress-test', keyword: '晚高峰评测' },
      { title: 'AI (ChatGPT/Claude) 连通性专项评测', slug: 'ai-matrix-review', path: '/reviews/ai-matrix-review', keyword: 'AI解锁评测' },
      { title: '主流全平台客户端兼容实测', slug: 'client-compatibility', path: '/reviews/client-compatibility', keyword: '客户端兼容评测' },
      { title: '售后客服与工单响应速度实测', slug: 'support-speed', path: '/reviews/support-speed', keyword: '售后服务评测' },
      { title: '半年长期挂机不掉线连续监控', slug: 'long-term-stability', path: '/reviews/long-term-stability', keyword: '长期使用评测' }
    ]
  },
  {
    id: 'compare',
    num: '05',
    title: '机场对比',
    path: '/compare/',
    description: '瞄准决策临门一脚：双雄对决、同价位横评、专线vs中转深度对比。',
    keywords: ['机场对比', 'XX vs YY', '机场哪个好', 'IEPL与IPLC区别'],
    group: 'selection',
    subTopics: [
      { title: '光速云 vs 飞猫云：老牌旗舰对决新锐专线', slug: 'guangsu-vs-feimao', path: '/compare/guangsu-vs-feimao', keyword: '光速云vs飞猫云', badge: '热门' },
      { title: '飞猫云 vs 宇宙云：高端IEPL谁更稳？', slug: 'feimao-vs-yuzhou', path: '/compare/feimao-vs-yuzhou', keyword: '飞猫云vs宇宙云' },
      { title: '微风网络 vs 星岛梦：低价年付与不限时之争', slug: 'breeze-vs-xingdao', path: '/compare/breeze-vs-xingdao', keyword: '微风vs星岛梦' },
      { title: '三家老牌专线机场百项参数大横评', slug: 'triple-flagship', path: '/compare/triple-flagship', keyword: '三家机场横评' },
      { title: '15元套餐 vs 30元套餐体验差异真相', slug: 'price-tier-gap', path: '/compare/price-tier-gap', keyword: '10元与30元机场区别' },
      { title: 'IEPL 内网专线 vs IPLC 专线区别详解', slug: 'iepl-vs-iplc', path: '/compare/iepl-vs-iplc', keyword: 'IEPL与IPLC对比' },
      { title: 'BGP 高速中转 vs 跨境直连线路对比', slug: 'bgp-vs-direct', path: '/compare/bgp-vs-direct', keyword: '中转vs直连' },
      { title: '按月付费 vs 一次性年付：哪种划算？', slug: 'monthly-vs-annual', path: '/compare/monthly-vs-annual', keyword: '年付vs月付' },
      { title: '小流量精品 vs 海量大流量套餐横评', slug: 'small-vs-large-quota', path: '/compare/small-vs-large-quota', keyword: '大流量机场对比' },
      { title: 'ChatGPT/Claude 专属 AI 机场对比', slug: 'ai-specialists', path: '/compare/ai-specialists', keyword: 'AI机场对比' },
      { title: '极致 4K/8K 蓝光流媒体机场对比', slug: 'streaming-specialists', path: '/compare/streaming-specialists', keyword: '流媒体机场对比' }
    ]
  },
  {
    id: 'pricing',
    num: '06',
    title: '价格套餐',
    path: '/pricing/',
    description: '吃透价格敏感型与按量付费海量长尾：从几元到大流量一网打尽。',
    keywords: ['便宜机场', '10元机场', '15元机场', '按量付费机场', '不限时机场'],
    group: 'selection',
    subTopics: [
      { title: '10元以下极便宜实用机场清单', slug: 'under-10-yuan', path: '/pricing/under-10-yuan', keyword: '10元机场', badge: '热搜' },
      { title: '15元档黄金平衡性价比套餐', slug: '15-yuan-tier', path: '/pricing/15-yuan-tier', keyword: '15元机场' },
      { title: '20元主流高质专线推荐', slug: '20-yuan-tier', path: '/pricing/20-yuan-tier', keyword: '20元机场' },
      { title: '30元高端免受晚高峰拥堵套餐', slug: '30-yuan-tier', path: '/pricing/30-yuan-tier', keyword: '30元机场' },
      { title: '50元以上顶级商务与大流量包', slug: '50-yuan-tier', path: '/pricing/50-yuan-tier', keyword: '50元机场' },
      { title: '纯月付灵活套餐（零门槛试错）', slug: 'monthly-plans', path: '/pricing/monthly-plans', keyword: '月付机场' },
      { title: '年付骨折优惠与防跑路年付指引', slug: 'annual-plans', path: '/pricing/annual-plans', keyword: '年付机场' },
      { title: '流量永不过期：不限时机场精选', slug: 'never-expire', path: '/pricing/never-expire', keyword: '不限时机场', badge: '常备' },
      { title: '按实际使用量扣费（用多少花多少）', slug: 'pay-as-you-go', path: '/pricing/pay-as-you-go', keyword: '按量付费机场' },
      { title: '500G-1TB 海量下载与团队大流量包', slug: 'huge-bandwidth', path: '/pricing/huge-bandwidth', keyword: '大流量机场' }
    ]
  },
  {
    id: 'lines',
    num: '07',
    title: '线路节点',
    path: '/lines/',
    description: '硬核技术与地域划分：IEPL/IPLC、BGP入口与全球各国节点指南。',
    keywords: ['IEPL机场', 'IPLC机场', '原生IP', '香港节点', '日本节点'],
    group: 'selection',
    subTopics: [
      { title: 'IEPL 企业级内网专线机场推荐', slug: 'iepl', path: '/lines/iepl', keyword: 'IEPL机场', badge: '核心' },
      { title: 'IPLC 点对点国际专线精选', slug: 'iplc', path: '/lines/iplc', keyword: 'IPLC机场' },
      { title: '电信 CN2 GIA 高阶线路解析', slug: 'cn2-gia', path: '/lines/cn2-gia', keyword: 'CN2机场' },
      { title: '移动 CMI 优质骨干网线路推荐', slug: 'cmi', path: '/lines/cmi', keyword: 'CMI机场' },
      { title: '多线 BGP 自动智能调度中转', slug: 'bgp', path: '/lines/bgp', keyword: 'BGP机场' },
      { title: '纯原生 IP (Native IP) 解锁合集', slug: 'native-ip', path: '/lines/native-ip', keyword: '原生IP机场' },
      { title: '住宅家宽 IP (Residential IP) 解析', slug: 'residential-ip', path: '/lines/residential-ip', keyword: '家宽IP机场' },
      { title: '香港优质低延迟节点机场指南', slug: 'hongkong', path: '/lines/hongkong', keyword: '香港节点机场' },
      { title: '日本东京/大阪极速节点汇总', slug: 'japan', path: '/lines/japan', keyword: '日本节点机场' },
      { title: '美国全区原生解锁节点精选', slug: 'united-states', path: '/lines/united-states', keyword: '美国原生IP' }
    ]
  },
  {
    id: 'use-cases',
    num: '08',
    title: '用途推荐',
    path: '/use-cases/',
    description: '一个应用场景 = 一个高转化搜索入口：ChatGPT、办公、游戏、外贸。',
    keywords: ['ChatGPT机场', 'Claude机场', 'YouTube机场', '游戏机场', '跨境办公'],
    group: 'usecase',
    subTopics: [
      { title: 'AI 生产力：ChatGPT 与 OpenAI 严选', slug: 'chatgpt', path: '/use-cases/chatgpt', keyword: 'ChatGPT机场', badge: '重点' },
      { title: '极速过风控：Claude 3.5 Sonnet 优选', slug: 'claude', path: '/use-cases/claude', keyword: 'Claude机场' },
      { title: 'Google Gemini & Workspace 专线', slug: 'gemini', path: '/use-cases/gemini', keyword: 'Gemini机场' },
      { title: 'YouTube 4K/8K 丝滑不卡顿推荐', slug: 'youtube', path: '/use-cases/youtube', keyword: 'YouTube机场' },
      { title: 'Netflix 全球各区片库无障碍解锁', slug: 'netflix', path: '/use-cases/netflix', keyword: 'Netflix机场' },
      { title: 'TikTok 海外带货与视频发布专线', slug: 'tiktok', path: '/use-cases/tiktok', keyword: 'TikTok机场' },
      { title: '外服联机与电竞低延迟加速推荐', slug: 'gaming', path: '/use-cases/gaming', keyword: '游戏机场' },
      { title: '外贸出海、Shopify 与跨境办公', slug: 'ecommerce', path: '/use-cases/ecommerce', keyword: '跨境办公机场' },
      { title: 'AI 编程神器 Cursor / Copilot 专线', slug: 'cursor-ai', path: '/use-cases/cursor-ai', keyword: 'Cursor机场' },
      { title: 'Telegram 极速下载与超清看图推荐', slug: 'telegram', path: '/use-cases/telegram', keyword: 'Telegram机场' }
    ]
  },
  {
    id: 'benchmarks',
    num: '09',
    title: '实测中心',
    path: '/benchmarks/',
    description: '数据化支撑：从推荐博客跃升为权威实测机构，建立数据信任背书。',
    keywords: ['机场测速', '晚高峰测速', '机场速度实测', '丢包率测试'],
    group: 'recommend',
    subTopics: [
      { title: '2026 全机场峰值速度实机天梯', slug: 'speed-ladder', path: '/benchmarks/speed-ladder', keyword: '机场速度实测', badge: '实测' },
      { title: '晚高峰（20:00-23:00）抗拥堵压测', slug: 'evening-rush', path: '/benchmarks/evening-rush', keyword: '晚高峰测速' },
      { title: '千次 Ping 延迟与三网丢包率雷达', slug: 'latency-loss', path: '/benchmarks/latency-loss', keyword: '延迟测试' },
      { title: 'AI 工具解锁矩阵实时复测看板', slug: 'ai-matrix', path: '/benchmarks/ai-matrix', keyword: 'AI解锁测试' },
      { title: 'Netflix 蓝光与双语字幕解锁测试', slug: 'netflix-unlock', path: '/benchmarks/netflix-unlock', keyword: 'Netflix解锁' },
      { title: 'YouTube 4K 缓冲区跑分连续记录', slug: 'youtube-4k', path: '/benchmarks/youtube-4k', keyword: 'YouTube 4K测试' },
      { title: '30 天长期可用性 SLA 连通度', slug: '30-days-sla', path: '/benchmarks/30-days-sla', keyword: '长期稳定性测试' },
      { title: '每月例行复测与最新变动通告', slug: 'monthly-retest', path: '/benchmarks/monthly-retest', keyword: '每月复测' }
    ]
  },
  {
    id: 'clients',
    num: '10',
    title: '客户端',
    path: '/clients/',
    description: '全平台客户端下载、版本比较、配置说明与订阅一键导入指南。',
    keywords: ['Clash', 'Clash Verge', 'Mihomo', 'Shadowrocket', 'v2rayN', 'sing-box'],
    group: 'tutorial',
    subTopics: [
      { title: 'Clash Verge Rev 现代桌面端完全指南', slug: 'clash-verge', path: '/clients/clash-verge', keyword: 'Clash Verge', badge: '热门' },
      { title: 'Shadowrocket (小火箭) iOS 新手配置', slug: 'shadowrocket', path: '/clients/shadowrocket', keyword: 'Shadowrocket' },
      { title: 'v2rayN Windows 经典客户端使用技巧', slug: 'v2rayn', path: '/clients/v2rayn', keyword: 'v2rayN' },
      { title: 'sing-box 通用下一代通用代理平台', slug: 'sing-box', path: '/clients/sing-box', keyword: 'sing-box' },
      { title: 'Mihomo Party 优雅图形化客户端', slug: 'mihomo-party', path: '/clients/mihomo-party', keyword: 'Mihomo' },
      { title: 'Stash (iOS / macOS 极客客户端)', slug: 'stash', path: '/clients/stash', keyword: 'Stash' },
      { title: 'Surfboard (Android 冲浪板完全教程)', slug: 'surfboard', path: '/clients/surfboard', keyword: 'Surfboard' },
      { title: 'Windows 平台全客户端横向横评推荐', slug: 'windows', path: '/clients/windows', keyword: 'Windows客户端' },
      { title: 'Mac 苹果系统全客户端选择指南', slug: 'macos', path: '/clients/macos', keyword: 'Mac客户端' },
      { title: 'Android 与 iPhone 手机端最优方案', slug: 'mobile', path: '/clients/mobile', keyword: '手机客户端' }
    ]
  },
  {
    id: 'guides',
    num: '11',
    title: '教程中心',
    path: '/guides/',
    description: '吃透“什么是”、“怎么用”等基础意图词，打造稳定常青树高权重入口。',
    keywords: ['机场怎么用', '机场是什么', '订阅怎么导入', '机场节点是什么'],
    group: 'tutorial',
    subTopics: [
      { title: '什么是机场？科学上网原理浅显科普', slug: 'what-is-airport', path: '/guides/what-is-airport', keyword: '机场是什么', badge: '基础' },
      { title: '小白如何从零挑选适合自己的机场', slug: 'how-to-choose', path: '/guides/how-to-choose', keyword: '机场怎么选' },
      { title: '如何安全购买与支付（防诈避坑技巧）', slug: 'how-to-buy', path: '/guides/how-to-buy', keyword: '机场怎么买' },
      { title: '手把手从注册到拿到第一条订阅', slug: 'how-to-register', path: '/guides/how-to-register', keyword: '机场怎么注册' },
      { title: '机场订阅链接一键导入客户端指南', slug: 'import-subscription', path: '/guides/import-subscription', keyword: '机场订阅教程' },
      { title: 'Clash 订阅转换与规则策略分流', slug: 'clash-import', path: '/guides/clash-import', keyword: 'Clash导入教程' },
      { title: 'Shadowrocket 扫码与添加节点完整步', slug: 'shadowrocket-guide', path: '/guides/shadowrocket-guide', keyword: '小火箭教程' },
      { title: '香港/日本/美国节点如何按需切换', slug: 'select-nodes', path: '/guides/select-nodes', keyword: '节点选择教程' },
      { title: '订阅更新失败、配置刷新不出来的解决方法', slug: 'update-subscription', path: '/guides/update-subscription', keyword: '订阅更新教程' },
      { title: '2026 新手科学上网避坑防走丢完全手册', slug: 'beginner-handbook', path: '/guides/beginner-handbook', keyword: '新手完整教程' }
    ]
  },
  {
    id: 'troubleshooting',
    num: '12',
    title: '网络排障',
    path: '/troubleshooting/',
    description: '痛点即转化点：连接失败、节点超时、Region Not Supported 自然引流至稳定机场。',
    keywords: ['机场连不上', '节点超时', 'Clash连接失败', 'Region Not Supported'],
    group: 'tutorial',
    subTopics: [
      { title: '排查指南：机场突然连不上与全部超时', slug: 'connection-failed', path: '/troubleshooting/connection-failed', keyword: '机场连不上', badge: '高频' },
      { title: '节点全部 Ping 不通（红叹号）怎么破', slug: 'nodes-timeout', path: '/troubleshooting/nodes-timeout', keyword: '节点超时' },
      { title: 'Clash 启动失败或系统代理无法打开', slug: 'clash-start-error', path: '/troubleshooting/clash-start-error', keyword: 'Clash连接失败' },
      { title: 'DNS 污染、DNS 泄漏与劫持排查修复', slug: 'dns-leak', path: '/troubleshooting/dns-leak', keyword: 'DNS问题' },
      { title: '延迟几千毫秒！排查梯子降速与拥堵', slug: 'high-latency', path: '/troubleshooting/high-latency', keyword: '延迟过高' },
      { title: '丢包率高达 50%？线路故障自检办法', slug: 'packet-loss', path: '/troubleshooting/packet-loss', keyword: '丢包严重' },
      { title: '访问特定网站报 IP 异常/异地封禁处理', slug: 'ip-blocked', path: '/troubleshooting/ip-blocked', keyword: 'IP异常' },
      { title: 'OpenAI 提示 Region Not Supported 救砖', slug: 'chatgpt-region-error', path: '/troubleshooting/chatgpt-region-error', keyword: 'Region Not Supported' },
      { title: 'Claude 提示 403 / App Not Available 方案', slug: 'claude-forbidden', path: '/troubleshooting/claude-forbidden', keyword: 'Claude风控' },
      { title: 'Google 频繁弹出“请证明您不是机器人”', slug: 'google-recaptcha', path: '/troubleshooting/google-recaptcha', keyword: 'Too Many Requests' }
    ]
  },
  {
    id: 'unlock',
    num: '13',
    title: 'AI与流媒体',
    path: '/unlock/',
    description: '高价值垂直场景：ChatGPT、Claude、Gemini、Netflix、YouTube 节点策略。',
    keywords: ['ChatGPT解锁', 'Claude风控', 'Netflix解锁', 'Gemini地区限制'],
    group: 'usecase',
    subTopics: [
      { title: 'ChatGPT Plus 与 OpenAI o1/4o 节点配置', slug: 'chatgpt-guide', path: '/unlock/chatgpt-guide', keyword: 'ChatGPT', badge: '必看' },
      { title: 'Claude 3.5 Sonnet 注册与防止封号 IP 指南', slug: 'claude-guide', path: '/unlock/claude-guide', keyword: 'Claude' },
      { title: 'Google Gemini Advanced / AI Studio 地区突破', slug: 'gemini-guide', path: '/unlock/gemini-guide', keyword: 'Gemini' },
      { title: 'Perplexity Pro 智能搜索引擎顺畅访问', slug: 'perplexity', path: '/unlock/perplexity', keyword: 'Perplexity' },
      { title: 'Netflix 奈飞非自制剧（全区片库）解锁线路', slug: 'netflix-guide', path: '/unlock/netflix-guide', keyword: 'Netflix' },
      { title: 'YouTube Premium 跨区订阅与 4K 超清配置', slug: 'youtube-guide', path: '/unlock/youtube-guide', keyword: 'YouTube' },
      { title: 'Disney+ 报错 73/83 绕过与原生 IP 推荐', slug: 'disney-guide', path: '/unlock/disney-guide', keyword: 'Disney+' },
      { title: 'Spotify 海外曲库跨区免切号技巧', slug: 'spotify-guide', path: '/unlock/spotify-guide', keyword: 'Spotify' },
      { title: 'TikTok 拔卡与免拔卡海外版运营节点方案', slug: 'tiktok-guide', path: '/unlock/tiktok-guide', keyword: 'TikTok' },
      { title: 'Midjourney 与 Discord 稳定连接专线方案', slug: 'discord-midjourney', path: '/unlock/discord-midjourney', keyword: 'Discord' }
    ]
  },
  {
    id: 'intel',
    num: '14',
    title: '风险情报',
    path: '/intel/',
    description: '差异化权威背书：跑路曝光、官网打不开、域名更换与黑名单雷达。',
    keywords: ['机场跑路', '机场失联', 'XX机场跑路了吗', '机场最新域名'],
    group: 'intel',
    subTopics: [
      { title: '2026 近期跑路与失联机场曝光黑榜', slug: 'exit-scam-list', path: '/intel/exit-scam-list', keyword: '机场跑路', badge: '黑名单' },
      { title: '机场突然失联？官方通知与求证指南', slug: 'disconnect-alerts', path: '/intel/disconnect-alerts', keyword: '机场失联' },
      { title: '各大主流机场最新免翻镜像与应急域名', slug: 'mirror-domains', path: '/intel/mirror-domains', keyword: '域名更换', badge: '更新' },
      { title: '近期套餐涨价、降配与倍率调整监控', slug: 'price-changes', path: '/intel/price-changes', keyword: '套餐涨价' },
      { title: '骨干专线检修与敏感期断流情报通报', slug: 'line-outages', path: '/intel/line-outages', keyword: '线路变化' },
      { title: '如何识别随时可能卷钱跑路的快餐机场', slug: 'how-to-spot-scams', path: '/intel/how-to-spot-scams', keyword: '风险名单' },
      { title: '避坑指南：为什么绝对不要年付超低价小机场', slug: 'avoid-annual-traps', path: '/intel/avoid-annual-traps', keyword: '机场避坑' },
      { title: '备用救命梯子清单：突发断网如何自救', slug: 'backup-lifeline', path: '/intel/backup-lifeline', keyword: '应急机场' }
    ]
  }
];

export const navGroups: NavGroup[] = [
  {
    name: '推荐排行',
    slug: 'recommend',
    description: '核心主推与权威榜单',
    clusters: topicClusters.filter((c) => c.group === 'recommend')
  },
  {
    name: '选机分类',
    slug: 'selection',
    description: '品牌库、横评、价格与线路',
    clusters: topicClusters.filter((c) => c.group === 'selection')
  },
  {
    name: '场景用途',
    slug: 'usecase',
    description: 'ChatGPT、Claude与流媒体',
    clusters: topicClusters.filter((c) => c.group === 'usecase')
  },
  {
    name: '教程排障',
    slug: 'tutorial',
    description: '客户端下载、入门与故障排查',
    clusters: topicClusters.filter((c) => c.group === 'tutorial')
  },
  {
    name: '风险情报',
    slug: 'intel',
    description: '跑路避坑与官方动态',
    clusters: topicClusters.filter((c) => c.group === 'intel')
  }
];
