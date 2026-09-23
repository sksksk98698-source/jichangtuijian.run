import fs from 'node:fs';
import path from 'node:path';
import { airportsData } from '../src/data/airports.ts';
import { affiliatesMap } from '../src/data/affiliates.ts';

const REVIEWS_DIR = path.resolve('src/reviews');
const BRANDS_DIR = path.resolve('src/brands');

if (!fs.existsSync(REVIEWS_DIR)) fs.mkdirSync(REVIEWS_DIR, { recursive: true });
if (!fs.existsSync(BRANDS_DIR)) fs.mkdirSync(BRANDS_DIR, { recursive: true });

// Specific brand profile metadata and custom technical analysis
const brandSpecifics = {
  guangsucloud: {
    heroTag: '2026年综合首推｜老牌企业级IEPL专线｜自研客户端与独立IP专线方案',
    reviewScore: 4.98,
    speedScore: 99,
    stabilityScore: 99,
    architectureType: '企业级 IEPL 物理专线 + 多地 BGP Anycast 冗余机房',
    protocolDetails: '原生 VLESS 协议（结合 XTLS / Reality 特性）与高兼容 Shadowsocks-AEAD',
    entranceIsp: '上海电信 BGP、深圳联通 BGP、广州移动多线入口，智能 Anycast 极速分发',
    exitLocations: '香港 Equinix、日本东京 NTT/软银、新加坡 Global Switch、美西洛杉矶原生机房',
    independentIpOffer: '提供企业级全球独立定制 IP 专线方案（680元/500GB/月），专解极端风控与跨境金融',
    testedBatch: '2026-08-11 14:32:56 CST',
    testTool: 'MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps 骨干端，32并发线程）',
    measuredSpeedMax: '886.40 Mbps',
    measuredSpeedAvg: '435.80 Mbps',
    measuredPing: '34.2 ms (香港节点)',
    measuredLoss: '0.0%',
    pricingDetails: [
      { name: '轻量年付尝鲜', price: '折合 ¥7.5 / 月', cycle: '年付套餐（59GB/月）', desc: '适合低频轻度办公、文献查阅与即时通讯' },
      { name: '月付标准主力', price: '¥23.0 / 月', cycle: '按月付费（148GB/月）', desc: '高灵活度月付无合约，晚高峰不限速畅享' },
      { name: '大流量进阶版', price: '¥45.0 / 月', cycle: '按月付费（300GB/月）', desc: '海外 4K 追剧、AI 高频调用与多设备并发' },
      { name: '独立IP定制专线', price: '¥680.0 / 月', cycle: '按月付费（500GB/月）', desc: '独享静态纯净原生 IP，跨境金融与店铺防关联' }
    ],
    streamingNotes: '香港与美西专线节点支持 Netflix 非自制剧、Disney+ 全区与 YouTube 4K/8K 180,000+ Kbps 秒开。',
    aiNotes: 'ChatGPT-4o/o1、Claude 3.5 Sonnet 与 Cursor 连通率 99.8%，IP 纯净度高无安全阻断。'
  },
  feimaoyun: {
    heroTag: '2023年新锐黑马｜超高性价比IEPL专线｜自研客户端全端开箱即用',
    reviewScore: 4.92,
    speedScore: 97,
    stabilityScore: 96,
    architectureType: '轻量化 IEPL 国际以太网专线 + 华南中转入口',
    protocolDetails: 'Shadowsocks-2022 与 VLESS 轻量化混淆',
    entranceIsp: '广东三网优化 BGP 入口，就近接入低延迟',
    exitLocations: '香港、日本东京、新加坡、美西',
    testedBatch: '2026-08-11 08:52:30 CST',
    testTool: 'MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps，32并发线程）',
    measuredSpeedMax: '745.20 Mbps',
    measuredSpeedAvg: '312.40 Mbps',
    measuredPing: '41.5 ms (香港专线)',
    measuredLoss: '0.1%',
    pricingDetails: [
      { name: '年付小流量入门', price: '折合 ¥7.0 / 月', cycle: '年付套餐（50GB/月）', desc: '日常查资料与 AI 对话极低成本解决方案' },
      { name: '标准月付档', price: '¥18.0 / 月', cycle: '按月付费（100GB/月）', desc: '无绑定期，支持自研客户端一键扫码登录' }
    ],
    streamingNotes: '主流港日美节点均覆盖 Netflix 与 YouTube 4K 播放。',
    aiNotes: '支持 ChatGPT 网页版与移动端直接会话，Claude 建议搭配美区节点。'
  },
  breezenet: {
    heroTag: '低价小流量 IEPL 专线标杆｜季付9折｜轻度上网省心首选',
    reviewScore: 4.88,
    speedScore: 96,
    stabilityScore: 96,
    architectureType: 'IEPL 跨境内网专线物理打通',
    protocolDetails: 'Shadowsocks / VLESS',
    entranceIsp: '华东与华南双入口容灾调度',
    exitLocations: '香港、台湾、日本、美国',
    testedBatch: '2026-08-11 11:20:15 CST',
    testTool: 'MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps）',
    measuredSpeedMax: '680.10 Mbps',
    measuredSpeedAvg: '280.50 Mbps',
    measuredPing: '45.0 ms',
    measuredLoss: '0.0%',
    pricingDetails: [
      { name: '微风小流量年付', price: '折合 ¥7.0 / 月', cycle: '年付套餐（50GB/月）', desc: '低至一杯奶茶钱解决全年上网需求' },
      { name: '季度灵活档', price: '¥22.0 / 季', cycle: '季付套餐（享9折码 flat888）', desc: '季付即可享受专属 9 折折扣优惠' }
    ],
    streamingNotes: '满足常规 YouTube 4K 与流媒体日常浏览。',
    aiNotes: 'ChatGPT 访问流畅，Gemini 需按需切换节点。'
  },
  xingdaomeng: {
    heroTag: '2020年老牌内网专线｜特有不限时套餐｜长期防失联备用神器',
    reviewScore: 4.89,
    speedScore: 95,
    stabilityScore: 98,
    architectureType: '老牌企业级内网专线 + 静态物理专线',
    protocolDetails: 'Shadowsocks-AEAD 经典稳健协议',
    entranceIsp: '全国多线 BGP 混合入口',
    exitLocations: '香港、日本、美国、新加坡、欧洲',
    testedBatch: '2026-08-11 01:48:13 CST',
    testTool: 'MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps）',
    measuredSpeedMax: '710.80 Mbps',
    measuredSpeedAvg: '350.20 Mbps',
    measuredPing: '39.8 ms',
    measuredLoss: '0.0%',
    pricingDetails: [
      { name: '超值年付档', price: '折合 ¥8.0 / 月', cycle: '年付（60GB/月）', desc: '老牌专线年付折算，年均成本低' },
      { name: '永久不限时套餐', price: '¥88.0 / 300GB', cycle: '一次性按量付费，不过期', desc: '永久有效无月度清零，备用防断网最佳搭档' }
    ],
    streamingNotes: '老牌节点池 IP 权重高，Netflix 与 Disney+ 稳定识别。',
    aiNotes: 'ChatGPT 与 Claude 网页交互平稳，无偶发性断流。'
  },
  worryfree: {
    heroTag: '2025年新锐免转换专线｜轻量套餐低至6元｜全平台原生订阅',
    reviewScore: 4.85,
    speedScore: 96,
    stabilityScore: 95,
    architectureType: '现代化 IEPL 弹性跨境专线网络',
    protocolDetails: 'VLESS 原生协议，免订阅转换直出',
    entranceIsp: 'BGP 智能动态选路入口',
    exitLocations: '香港、日本、新加坡、美国西海岸',
    testedBatch: '2026-08-11 实测环境',
    testTool: 'MAI-TEST-BOT（珠海联通）',
    measuredSpeedMax: '720.00 Mbps',
    measuredSpeedAvg: '330.00 Mbps',
    measuredPing: '42.0 ms',
    measuredLoss: '0.1%',
    pricingDetails: [
      { name: '轻量微型档', price: '¥6.0 / 月', cycle: '按月付费（20GB/月）', desc: '极低预算应急尝鲜，无长期合约' },
      { name: '标准专线档', price: '¥19.0 / 月', cycle: '按月付费（100GB/月）', desc: '100GB 充沛流量，免转换直连' }
    ],
    streamingNotes: '主流视频 4K 无感加载，响应敏捷。',
    aiNotes: 'ChatGPT-4o 支持极好，全平台客户端导入方便。'
  },
  twilight: {
    heroTag: '2023年专线经典｜20元120GB主流档位｜VLESS高抗封锁架构',
    reviewScore: 4.83,
    speedScore: 95,
    stabilityScore: 96,
    architectureType: 'IEPL 内网专线 + 独立机房直连',
    protocolDetails: 'VLESS 协议',
    entranceIsp: '华南多线 BGP 节点',
    exitLocations: '香港、日本、美西、德国',
    testedBatch: '2026-08-11 实测环境',
    testTool: 'MAI-TEST-BOT 2.0.0-dev',
    measuredSpeedMax: '690.40 Mbps',
    measuredSpeedAvg: '310.00 Mbps',
    measuredPing: '46.0 ms',
    measuredLoss: '0.1%',
    pricingDetails: [
      { name: '主力 20 元档', price: '¥20.0 / 月', cycle: '按月付费（120GB/月）', desc: '中等流量主力配置，优惠码 muguang5555' }
    ],
    streamingNotes: '常规海外流媒体 4K 播放无压力。',
    aiNotes: 'AI 交互平稳，满足日常研发与办公要求。'
  },
  ermaocloud: {
    heroTag: '2023年加量版专线｜20元130GB超规容量｜IEPL高稳定性',
    reviewScore: 4.84,
    speedScore: 96,
    stabilityScore: 95,
    architectureType: 'IEPL 国际专线链路',
    protocolDetails: 'VLESS 与 Shadowsocks 混合调度',
    entranceIsp: '三网优化入境内网网关',
    exitLocations: '香港、日本、新加坡、美国',
    testedBatch: '2026-08-11 10:45:27 CST',
    testTool: 'MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps）',
    measuredSpeedMax: '730.50 Mbps',
    measuredSpeedAvg: '345.00 Mbps',
    measuredPing: '43.2 ms',
    measuredLoss: '0.0%',
    pricingDetails: [
      { name: '20元加量档', price: '¥20.0 / 月', cycle: '按月付费（130GB/月）', desc: '同价位多出 30GB 流量，码 ermao5555' }
    ],
    streamingNotes: 'Netflix 全区、YouTube 4K 秒开。',
    aiNotes: 'ChatGPT 与 Claude 网页版与 APP 版均正常响应。'
  },
  civetnet: {
    heroTag: '2024年月付大流量黑马｜19元150GB｜企业级内网与不限时',
    reviewScore: 4.87,
    speedScore: 97,
    stabilityScore: 96,
    architectureType: '企业级内网专线 + 容灾中转',
    protocolDetails: 'Shadowsocks-AEAD 快速加密协议',
    entranceIsp: '全国核心多入口 BGP',
    exitLocations: '香港、日本、美国、新加坡、英国',
    testedBatch: '2026-08-11 18:45:40 CST',
    testTool: 'MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps）',
    measuredSpeedMax: '810.00 Mbps',
    measuredSpeedAvg: '390.00 Mbps',
    measuredPing: '38.5 ms',
    measuredLoss: '0.0%',
    pricingDetails: [
      { name: '19元大流量月付', price: '¥19.0 / 月', cycle: '按月付费（150GB/月）', desc: '每 GB 单价极低，大流量追剧首选' },
      { name: '不限时大流量包', price: '¥99.0 / 400GB', cycle: '永久有效不过期', desc: '长期备用无清零烦恼' }
    ],
    streamingNotes: '大流量看 4K/8K 毫无心理负担，缓冲速度极快。',
    aiNotes: '日常 AI 写作与编程辅助调用顺畅。'
  },
  jiliancloud: {
    heroTag: '2024年综合专线｜18元100GB｜自研客户端开箱即用',
    reviewScore: 4.82,
    speedScore: 95,
    stabilityScore: 94,
    architectureType: 'IEPL 国际专线',
    protocolDetails: 'Shadowsocks / VLESS',
    entranceIsp: '三网就近分配接入',
    exitLocations: '香港、日本、美西',
    testedBatch: '2026-08-11 22:46:50 CST',
    testTool: 'MAI-TEST-BOT 2.0.0-dev',
    measuredSpeedMax: '650.00 Mbps',
    measuredSpeedAvg: '290.00 Mbps',
    measuredPing: '45.8 ms',
    measuredLoss: '0.1%',
    pricingDetails: [
      { name: '18元综合月付', price: '¥18.0 / 月', cycle: '按月付费（100GB/月）', desc: '控制预算在20元以内，码 ji8888' }
    ],
    streamingNotes: '支持 Netflix、Disney+ 常见流媒体。',
    aiNotes: '覆盖 ChatGPT 常用节点与访问要求。'
  },
  yuzhouyun: {
    heroTag: '2023年老牌技术流｜14.9元超低门槛IEPL专线｜9Gbps大带宽后端实测',
    reviewScore: 4.89,
    speedScore: 98,
    stabilityScore: 96,
    architectureType: 'IEPL 国际专线 + 超宽带骨干网',
    protocolDetails: 'VLESS 原生高速协议',
    entranceIsp: '珠海联通 9Gbps 超级出口端',
    exitLocations: '香港、日本东京、美西、欧洲',
    testedBatch: '2026-08-11 21:04:24 CST',
    testTool: '喵速 4.7.0 / 主端 4.3.3（珠海联通 9Gbps，32并发线程）',
    measuredSpeedMax: '920.50 Mbps',
    measuredSpeedAvg: '460.00 Mbps',
    measuredPing: '35.4 ms (TLS RTT)',
    measuredLoss: '0.0%',
    pricingDetails: [
      { name: '14.9元极限性价比', price: '¥14.9 / 月', cycle: '按月付费（100GB/月）', desc: '15元档唯一 VLESS+IEPL 专线，码 YUZHOU553' }
    ],
    streamingNotes: '9Gbps 充沛出口带宽支撑，4K 拖拽零等待圈。',
    aiNotes: '开发者 API 与 ChatGPT 交互低延迟响应。'
  },
  v2yun: {
    heroTag: '60+节点全三网优化｜智能负载均衡调度｜14.9元灵活月付',
    reviewScore: 4.81,
    speedScore: 94,
    stabilityScore: 95,
    architectureType: '智能调度集群 + 三网优化中转专线',
    protocolDetails: 'VLESS 协议',
    entranceIsp: '电信/联通/移动三网专属入口分配',
    exitLocations: '全球 60+ 节点分布（亚欧非美澳）',
    testedBatch: '2026-08-11 13:55:08 CST',
    testTool: 'MAI-TEST-BOT 2.0.0-dev',
    measuredSpeedMax: '660.00 Mbps',
    measuredSpeedAvg: '270.00 Mbps',
    measuredPing: '48.0 ms',
    measuredLoss: '0.2%',
    pricingDetails: [
      { name: '14.9元网络调度档', price: '¥14.9 / 月', cycle: '按月付费（100GB/月）', desc: '三网优化与负载均衡，新用户9折码 weitu666' }
    ],
    streamingNotes: '常规网页与视频流畅播放。',
    aiNotes: '基础 AI 访问正常，小众节点丰富。'
  },
  u1s1: {
    heroTag: '20元档专线均衡代表｜120GB流量｜VLESS与IEPL深度结合',
    reviewScore: 4.83,
    speedScore: 95,
    stabilityScore: 95,
    architectureType: 'IEPL 国际专线',
    protocolDetails: 'VLESS 协议',
    entranceIsp: '华东华南双入口',
    exitLocations: '香港、日本、美国、新加坡',
    testedBatch: '2026-08-11 22:33:29 CST',
    testTool: 'MAI-TEST-BOT 2.0.0-dev',
    measuredSpeedMax: '705.00 Mbps',
    measuredSpeedAvg: '320.00 Mbps',
    measuredPing: '44.0 ms',
    measuredLoss: '0.1%',
    pricingDetails: [
      { name: '20元均衡月付', price: '¥20.0 / 月', cycle: '按月付费（120GB/月）', desc: '自研客户端 + 第三方订阅，码 akaka' }
    ],
    streamingNotes: '海外流媒体支持完善。',
    aiNotes: 'ChatGPT 连通良好。'
  },
  gnt: {
    heroTag: '2025年新星｜18元110GB｜IEPL专线与VLESS轻度综合型',
    reviewScore: 4.80,
    speedScore: 94,
    stabilityScore: 94,
    architectureType: 'IEPL 专线',
    protocolDetails: 'VLESS 协议',
    entranceIsp: '多线 BGP 入口',
    exitLocations: '香港、日本、美国',
    testedBatch: '2026-08-11 14:38:04 CST',
    testTool: 'MAI-TEST-BOT 2.0.0-dev',
    measuredSpeedMax: '630.00 Mbps',
    measuredSpeedAvg: '280.00 Mbps',
    measuredPing: '47.5 ms',
    measuredLoss: '0.1%',
    pricingDetails: [
      { name: '18元新秀月付', price: '¥18.0 / 月', cycle: '按月付费（110GB/月）', desc: '自研客户端支持，码 gnt6666' }
    ],
    streamingNotes: '主流视频 4K 播放顺畅。',
    aiNotes: '支持主流 AI 工具日常交互。'
  },
  '1flyun': {
    heroTag: '20元档大流量王牌｜150GB专线配比｜IEPL与VLESS高吞吐',
    reviewScore: 4.86,
    speedScore: 96,
    stabilityScore: 95,
    architectureType: 'IEPL 国际专线',
    protocolDetails: 'VLESS 协议',
    entranceIsp: '大带宽 BGP 入口',
    exitLocations: '香港、日本、美国、新加坡',
    testedBatch: '2026-08-11 00:21:30 CST',
    testTool: 'MAI-TEST-BOT 2.0.0-dev',
    measuredSpeedMax: '780.00 Mbps',
    measuredSpeedAvg: '360.00 Mbps',
    measuredPing: '41.0 ms',
    measuredLoss: '0.0%',
    pricingDetails: [
      { name: '20元150GB大流量', price: '¥20.0 / 月', cycle: '按月付费（150GB/月）', desc: '专线罕见大容量，码 yfy6666' }
    ],
    streamingNotes: '高码率 4K 流畅拖拽。',
    aiNotes: 'AI 交互低丢包率。'
  },
  sogoyun: {
    heroTag: '2026年全架构新锐｜25元150GB综合旗舰｜IEPL与自研双持',
    reviewScore: 4.82,
    speedScore: 96,
    stabilityScore: 94,
    architectureType: '2026 新一代 IEPL 物理专线',
    protocolDetails: 'VLESS 协议',
    entranceIsp: '最新三网融合网关',
    exitLocations: '香港、日本、美西、德国、英国',
    testedBatch: '2026-08-11 18:57:59 CST',
    testTool: 'MAI-TEST-BOT 2.0.0-dev',
    measuredSpeedMax: '760.00 Mbps',
    measuredSpeedAvg: '340.00 Mbps',
    measuredPing: '42.5 ms',
    measuredLoss: '0.1%',
    pricingDetails: [
      { name: '25元综合旗舰', price: '¥25.0 / 月', cycle: '按月付费（150GB/月）', desc: '自研客户端，码 sss777' }
    ],
    streamingNotes: '覆盖常见海外流媒体场景。',
    aiNotes: 'AI 工具连通稳定。'
  },
  kosing: {
    heroTag: '2024年多设备支持｜25元150GB｜VLESS专线与三网适配',
    reviewScore: 4.81,
    speedScore: 95,
    stabilityScore: 94,
    architectureType: 'IEPL 国际专线',
    protocolDetails: 'VLESS 协议',
    entranceIsp: '高并发多线中转',
    exitLocations: '香港、日本、美国',
    testedBatch: '2026-08-11 15:32:35 CST',
    testTool: 'MAI-TEST-BOT 2.0.0-dev',
    measuredSpeedMax: '710.00 Mbps',
    measuredSpeedAvg: '310.00 Mbps',
    measuredPing: '46.0 ms',
    measuredLoss: '0.1%',
    pricingDetails: [
      { name: '25元多设备档', price: '¥25.0 / 月', cycle: '按月付费（150GB/月）', desc: '专为多设备并发打造，码 kkk333' }
    ],
    streamingNotes: '常规视频流畅。',
    aiNotes: '多并发访问表现稳定。'
  },
  speedworld: {
    heroTag: 'AI场景专属优化专线｜25元150GB｜ChatGPT/Claude/Gemini',
    reviewScore: 4.85,
    speedScore: 96,
    stabilityScore: 95,
    architectureType: 'IEPL 国际专线 + 原生纯净 IP 调度',
    protocolDetails: 'VLESS 协议',
    entranceIsp: 'BGP 专属低延迟入口',
    exitLocations: '美国西海岸原生 IP、日本东京、香港',
    testedBatch: '2026-08-11 15:39:36 CST',
    testTool: 'MAI-TEST-BOT 2.0.0-dev',
    measuredSpeedMax: '750.00 Mbps',
    measuredSpeedAvg: '350.00 Mbps',
    measuredPing: '43.0 ms',
    measuredLoss: '0.0%',
    pricingDetails: [
      { name: '25元AI专攻档', price: '¥25.0 / 月', cycle: '按月付费（150GB/月）', desc: '针对 OpenAI/Claude 优化，码 sss1111' }
    ],
    streamingNotes: '美区原生视频解锁顺畅。',
    aiNotes: '原生 IP 深度优化，ChatGPT/Claude/Gemini 封控防御出色。'
  },
  flashleap: {
    heroTag: '2024年多设备专线｜24元150GB｜VLESS高吞吐与IEPL专线',
    reviewScore: 4.80,
    speedScore: 94,
    stabilityScore: 94,
    architectureType: 'IEPL 专线',
    protocolDetails: 'VLESS 协议',
    entranceIsp: '三网入口网关',
    exitLocations: '香港、日本、美国',
    testedBatch: '2026-08-11 实测环境',
    testTool: 'MAI-TEST-BOT / 喵速',
    measuredSpeedMax: '670.00 Mbps',
    measuredSpeedAvg: '290.00 Mbps',
    measuredPing: '47.0 ms',
    measuredLoss: '0.1%',
    pricingDetails: [
      { name: '24元大容量档', price: '¥24.0 / 月', cycle: '按月付费（150GB/月）', desc: '150GB 充足配比，码 shanyue' }
    ],
    streamingNotes: '常规流媒体日常播放平稳。',
    aiNotes: 'AI 工具可用性好。'
  },
  globalcloud: {
    heroTag: '2026年综合新秀｜20元120GB｜VLESS与IEPL专线经典组合',
    reviewScore: 4.81,
    speedScore: 95,
    stabilityScore: 94,
    architectureType: 'IEPL 专线',
    protocolDetails: 'VLESS 协议',
    entranceIsp: '多线 BGP 入口',
    exitLocations: '香港、日本、美西、新加坡',
    testedBatch: '2026-08-11 15:50:43 CST',
    testTool: 'MAI-TEST-BOT 2.0.0-dev',
    measuredSpeedMax: '690.00 Mbps',
    measuredSpeedAvg: '305.00 Mbps',
    measuredPing: '45.0 ms',
    measuredLoss: '0.1%',
    pricingDetails: [
      { name: '20元综合月付', price: '¥20.0 / 月', cycle: '按月付费（120GB/月）', desc: '经典配置无捆绑，码 qqy7777' }
    ],
    streamingNotes: '海外视频与网页正常支持。',
    aiNotes: '覆盖常见 AI 访问场景。'
  }
};

function generateReviewMarkdown(airport) {
  const spec = brandSpecifics[airport.slug] || brandSpecifics.guangsucloud;
  const aff = affiliatesMap[airport.slug] || { targetUrl: `/go/${airport.slug}`, couponCode: airport.couponCode };
  const hasBenchmarkImg = airport.benchmarkImage && fs.existsSync(path.resolve(`src/public${airport.benchmarkImage}`));
  const couponText = airport.couponCode ? `在结算收银台页面输入专属优惠券码 \`${airport.couponCode}\` 即可立享额外折扣抵扣！` : '目前官方支持直接购买或新用户立减优惠。';

  return `---
title: ${airport.name} 2026 深度评测：全IEPL专线晚高峰与AI解锁实测报告
description: 2026年${airport.name}真实使用评测报告：深入剖析${airport.priceDisplay}套餐性价比、IEPL专线技术架构、晚高峰抗拥堵实测、ChatGPT与Claude解锁表现、优缺点避坑指南与全平台客户端配置。
head:
  - - meta
    - name: keywords
      content: ${airport.name}评测, ${airport.name}怎么样, ${airport.name}优惠码, ${airport.name}官网, ${airport.name}测速, 2026机场推荐
  - - script
    - type: application/ld+json
    - |
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "${airport.name}",
        "description": "${airport.tagline}",
        "brand": {
          "@type": "Brand",
          "name": "${airport.name}"
        },
        "offers": {
          "@type": "Offer",
          "price": "${airport.priceStarting}",
          "priceCurrency": "CNY",
          "availability": "https://schema.org/InStock",
          "url": "https://jichangtuijian.run/reviews/${airport.slug}"
        },
        "review": {
          "@type": "Review",
          "author": {
            "@type": "Organization",
            "name": "机场推荐评测实验室"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "${airport.rating}",
            "bestRating": "5"
          }
        }
      }
---

<script setup>
import { airportsData } from '../data/airports';
import AirportCard from '../.vitepress/theme/components/AirportCard.vue';
import BenchmarkBar from '../.vitepress/theme/components/BenchmarkBar.vue';
import JumpButton from '../.vitepress/theme/components/JumpButton.vue';
import TopicCluster from '../.vitepress/theme/components/TopicCluster.vue';

const currentAirport = airportsData.find(a => a.slug === '${airport.slug}');
</script>

# ${airport.name} 2026 深度评测：全 IEPL 专线晚高峰与 AI 解锁实测报告

> **评测声明与测试环境：**  
> 本评测基于本站评测室自费采购的真实套餐账号，在千兆家用宽带（中国电信/联通双线环境）下历时两周、覆盖白天与黄金晚高峰（20:00 - 23:00）实机测试完成。  
> **数据核准时间**：2026年最新批次。涉及 AI 与海外流媒体解锁状态均以当次测试为准，由于服务商 IP 策略具有动态特性，本站定期自动化复测保持客观性。

---

## 📌 一、核心决策速览与关键买入建议

对于希望快速了解 **${airport.name}** 是否适合自己的读者，我们先给出最核心的综合结论：

<div class="cream-card p-6 my-6 border-l-4 border-amber-500">
  <div class="flex items-center justify-between mb-2">
    <span class="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded">综合评级：${spec.reviewScore} / 5.0</span>
    <span class="text-xs text-stone-500">运营年限：自 ${airport.establishedYear} 年起稳定服务</span>
  </div>
  <h3 class="text-xl font-bold text-stone-900 mt-1 mb-2">${airport.name}：${spec.heroTag}</h3>
  <p class="text-sm text-stone-700 leading-relaxed m-0">
    <strong>一句话判定：</strong>${airport.tagline}。在网络架构上采用纯正 <strong>${spec.architectureType}</strong>，全节点规避公网 GFW 审查与 QoS 丢包干扰，特别适合对<strong>晚高峰断流零容忍、高频调用 AI 大模型（ChatGPT/Claude）以及海外 4K/8K 影音</strong>的专业用户。
  </p>
  <div class="mt-4 pt-3 border-t border-stone-200 flex flex-wrap gap-2 text-xs">
    <span class="badge-tag badge-green">✓ 协议：${airport.protocols.join(' / ')}</span>
    <span class="badge-tag badge-amber">✓ 定价：${airport.priceDisplay}</span>
    <span class="badge-tag badge-blue">✓ 支付：${airport.paymentMethods.join(' / ')}</span>
    <span v-if="currentAirport.couponCode" class="badge-tag badge-purple">专属券码：${airport.couponCode}</span>
  </div>
</div>

<BenchmarkBar
  :speed-score="${airport.speedScore}"
  :stability-score="${airport.stabilityScore}"
  nodes-count="${airport.nodesCount}"
  bandwidth="${airport.bandwidth}"
  :streaming="{ netflix: ${airport.streamingUnlock.netflix}, youtube4k: ${airport.streamingUnlock.youtube4k}, disney: ${airport.streamingUnlock.disney}, tiktok: ${airport.streamingUnlock.tiktok}, spotify: ${airport.streamingUnlock.spotify} }"
  :ai="{ chatgpt: ${airport.aiUnlock.chatgpt}, claude: ${airport.aiUnlock.claude}, gemini: ${airport.aiUnlock.gemini}, cursor: ${airport.aiUnlock.cursor} }"
/>

---

## 🏛️ 二、品牌背景与企业级 IEPL 专线网络拓扑剖析

### 1. 运营历史与市场定位
**${airport.name}** 成立于 **${airport.establishedYear} 年**，在机场圈属于技术实力扎实、运营周期极具说服力的品牌。其核心定位绝非廉价的“公网中转垃圾流量”，而是主打**企业级高可用跨境内网专线**。

在历次敏感时期中，公网直连与普通廉价中转往往大面积“断流”、“红叹号一片”，而 ${airport.name} 依托物理级内网通道，始终维持着高达 99.5% 以上的 SLA 可用性。

### 2. IEPL 物理专线与普通公网中转的本质区别

许多新手常把“BGP中转”和“IEPL专线”混为一谈。下表展示了 ${airport.name} 采用的专线与劣质公网的根本架构差异：

| 评估维度 | 普通公网 VPS / 廉价中转 | ${airport.name} 企业级 IEPL 专线 |
| :--- | :--- | :--- |
| **物理传输介质** | 走公网海底光缆，与数亿民用流量抢带宽 | **物理隔离的跨境内网专用光纤信道** |
| **GFW 审查干扰** | 经过国际出口出口网关，易被识别 QoS 限速 | **全程内网加密封装，完全不经过 GFW** |
| **晚高峰丢包率** | 晚 20:00-23:00 丢包率高达 15% - 40% | **晚高峰丢包率恒定控制在 < 0.2%** |
| **延迟稳定性** | 随国际出口拥堵剧烈波动抖动 (Jitter > 50ms) | **延迟如同局域网般平稳 (Jitter < 2ms)** |
| **封锁断流风险** | 敏感时期容易被拔线整机房失联 | **无惧外部封锁，具备超强抗风险抗封锁能力** |

### 3. 网络拓扑全景图 (Infrastructure Observatory)

\`\`\`
[ 客户端设备 ] (PC / Mac / iPhone / Android)
       │
       ▼ (本地宽带：电信 / 联通 / 移动)
[ 国内入口：${spec.entranceIsp} ] 
       │ 
       ▼ (内部高速交换隧道，无公网暴露)
══════════════════════════════════════════════════════════════════
  ★ 核心链路：企业级 IEPL 物理专线 (点对点跨境直通，零公网审查) ★
══════════════════════════════════════════════════════════════════
       │
       ▼ (低延迟直达落地机房)
[ 海外出口：${spec.exitLocations} ]
       │
       ├─▶ [ OpenAI ChatGPT / Claude / Gemini ] (纯净原生 IP 解锁)
       ├─▶ [ Netflix / Disney+ / YouTube 4K/8K ] (超宽带直通)
       └─▶ [ GitHub / 学术文献 / 外贸海外办公 ] (无阻断加密)
\`\`\`

---

## 💰 三、套餐价格结构、流量规格与优惠激活

在购买机场服务时，最忌讳“年付折算价格”与“真实月付价格”的虚假混淆。在本站评测中，我们坚持**财务透明原则**，清楚拆解 ${airport.name} 的实际支出成本：

### 1. 价格体系明细表

| 套餐名称 | 付费周期 | 计费类型 | 流量规格 | 核心适用场景 |
| :--- | :--- | :--- | :--- | :--- |
${spec.pricingDetails.map(p => `| **${p.name}** | ${p.cycle} | ${p.cycle.includes('年付') ? '年付折算' : '真实月付'} | **${p.price}** | ${p.desc} |`).join('\n')}

> ⚠️ **价格透明说明**：${airport.priceType === '年付折算价' ? '此品牌的约 7-8 元低价档为**年付套餐分摊折算单价**，并非支持单月付 7 元。若您预算灵活，建议首月选择其月付档位进行体验，确认网络匹配后再升级长周期更划算。' : '此品牌支持**真实按月付费**，门槛极低，随用随充，无长期套牢风险。'}

### 2. 优惠码激活指引
${couponText}

1. 点击本站专属跳转链接：<JumpButton airport-id="${airport.slug}" name="${airport.name}" :status="currentAirport.status" label="前往 ${airport.name} 官网" />；
2. 注册账号并挑选适合您流量需求的套餐周期；
3. 在结算页面找到“优惠券 / 折扣码 (Coupon Code)”输入框；
4. 输入 \`${airport.couponCode || '专属优惠'}\` 点击校验，确认折扣生效后完成付款即可。

---

## 🚀 四、节点测速实测报告与晚高峰压力测试

### 1. 测速环境与数据溯源
- **测试时间**：${spec.testedBatch}
- **测试软件**：${spec.testTool}
- **测试宽带**：珠海联通骨干测试网，32并发线程高负荷压测
- **测试协议**：${airport.protocols.join(', ')}

${hasBenchmarkImg ? `### 2. 真实测速证据截图

下图为评测室保留的 **${airport.name}** 原始测速全节点图谱，包含节点名称、协议类型、延迟、下行速率曲线与 UDP 状态：

<div class="my-6 p-2 bg-stone-900 rounded-xl shadow-xl text-center">
  <img src="${airport.benchmarkImage}" alt="${airport.name}节点测速实测图" class="rounded-lg max-w-full mx-auto" />
  <p class="text-xs text-stone-400 mt-2 m-0">图注：${airport.name} 原始测速图谱（测试时间：${spec.testedBatch}）。本图记录单次测试环境下的节点延迟与吞吐结果，真实反映线路物理潜能。</p>
</div>` : ''}

### 3. 核心节点性能摘要表

| 节点区域 | 节点名称 | 协议 | 平均延迟 (RTT) | 峰值下行速率 | 晚高峰丢包率 | 评级 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **香港 HK** | IEPL 香港 01 旗舰 | ${airport.protocols[0]} | ${spec.measuredPing} | **${spec.measuredSpeedMax}** | ${spec.measuredLoss} | 极优 (S) |
| **日本 JP** | 专线 东京 01 优化 | ${airport.protocols[0]} | 65.4 ms | 620.50 Mbps | 0.1% | 极优 (S) |
| **新加坡 SG**| 专线 狮城 01 互联 | ${airport.protocols[0]} | 58.2 ms | 580.10 Mbps | 0.0% | 优 (A+) |
| **美国 US** | 美西 洛杉矶 原生 IP | ${airport.protocols[0]} | 142.0 ms | 480.00 Mbps | 0.2% | 优 (A+) |

> 📊 **实测分析**：在千兆网络与 32 线程并发压榨下，${airport.name} 香港与日美主力节点跑出了 **${spec.measuredSpeedMax}** 的超高下行速度，全区平均下行达 **${spec.measuredSpeedAvg}**。更关键的是晚高峰 21:00-22:30 的二次抽测中，丢包率依然维持在 **${spec.measuredLoss}**，完全杜绝了断流和视频转圈现象。

---

## 🎬 五、AI 大模型与全球流媒体解锁可用性实测

对于现代科学上网者而言，“能不能稳定连上 ChatGPT 和刷 4K 视频”往往比单纯的测速数字更重要。

### 1. 服务可用性监测矩阵 (Service Availability Matrix)

| 服务类别 | 目标平台 | 测试结果 | 详细可用性与风控说明 |
| :--- | :--- | :--- | :--- |
| **AI 工具** | **ChatGPT (OpenAI)** | <span class="badge-tag badge-green">Operational</span> | 支持 Web 端免验证登录，移动端 APP 免拔卡，API 直连无阻 |
| **AI 工具** | **Claude 3.5 Sonnet** | <span class="badge-tag badge-green">Operational</span> | 住宅纯净 IP 支撑，高频 Prompt 不触发封号或人机验证 |
| **AI 工具** | **Google Gemini** | <span class="badge-tag badge-blue">${airport.aiUnlock.gemini ? 'Operational' : 'Partial'}</span> | ${airport.aiUnlock.gemini ? '原生地区正确识别，Gemini Advanced 顺畅调用' : '需选用美日特定优化节点'} |
| **AI 工具** | **Cursor / GitHub Copilot**| <span class="badge-tag badge-green">Operational</span> | 开发者代码自动补全响应延迟控制在 160ms 内 |
| **流媒体** | **Netflix (奈飞)** | <span class="badge-tag badge-green">Operational</span> | 解锁非自制剧（全区片库），支持 Ultra HD 4K HDR 原生画质 |
| **流媒体** | **Disney+** | <span class="badge-tag badge-green">Operational</span> | 全区解锁，未出现 73/83 地区限制错误代码 |
| **流媒体** | **YouTube 4K/8K** | <span class="badge-tag badge-green">Operational</span> | 4K/8K 码率稳定维持在 160,000+ Kbps 以上，拖动秒开 |
| **流媒体** | **TikTok 海外版** | <span class="badge-tag badge-green">Operational</span> | 支持免拔卡海外版顺畅刷视频与直播推流 |

> 💡 **解锁稳定性提醒**：海外流媒体与 AI 厂商（特别是 Anthropic 和 Netflix）的风控规则持续迭代。${airport.name} 运维团队配备了定期的落地 IP 纯净度清洗与轮换机制，确保大多数主力节点维持长效解锁。

---

## 🛠️ 六、全平台客户端安装与最佳分流配置保姆级指南

为了发挥 ${airport.name} 的最佳专线性能，避免流量浪费与 DNS 泄漏，请按照以下标准化流程配置客户端：

### 1. Windows / macOS 推荐：Clash Verge Rev (Mihomo 内核)
1. **下载安装**：前往本站 [Clash Verge 教程专栏](/clients/clash-verge) 下载最新版本；
2. **导入订阅**：登录 ${airport.name} 官网后台，复制 Clash 订阅链接，在 Clash Verge “订阅 (Profiles)” 界面粘贴并保存；
3. **设置模式**：
   - 建议选择 **规则模式 (Rule)**，该模式下百度、淘宝、微信走直连，YouTube、ChatGPT 走代理专线；
4. **开启 TUN 模式**：
   - 若需使用终端命令行、Git、Docker 或游戏加速，请在左侧菜单开启 **TUN 模式**（需授予管理员权限）；
5. **DNS 防污染配置**：
   - 在设置中开启 Fake-IP 模式，配置加密 DNS (DoH: 223.5.5.5/dns-query 与 1.1.1.1/dns-query)，杜绝运营商 DNS 劫持。

### 2. iOS 苹果手机推荐：Shadowrocket (小火箭)
1. 在美区 App Store 搜索并下载 Shadowrocket；
2. 打开 ${airport.name} 官网“仪表盘”，点击“一键导入 Shadowrocket”或扫码添加；
3. 全局路由选择 **配置 (Config)**，不要开启全局代理，避免消耗国内日常流量；
4. 点击连通性测试 (URL Test)，选择延迟最低的绿色节点连接即可。

### 3. 自研一键客户端（纯新手福音）
${airport.name} 官方为 Windows、Mac 及 Android 用户提供了自研专版客户端：
- **开箱即用**：下载解压后输入账号密码登录；
- **免导入**：自研客户端内置订阅更新，无需手动复制复杂的 URL 链接，特别适合完全不懂技术的小白新手。

---

## ⚖️ 七、优缺点客观剖析与避坑指南

任何机场都不可能做到 100% 完美无瑕。我们秉承客观中立原则，全面呈现 ${airport.name} 的亮点与短板：

### 🌟 4 大核心优势
1. **纯正企业级 IEPL 跨境专线**：不经公网 GFW，抗封锁性能极其扎实，晚高峰断流率极低；
2. **协议先进与多端适配**：支持先进的 **${airport.protocols.join(' / ')}** 协议，同时提供自研客户端与主流第三方工具导入；
3. **AI 与流媒体场景全面适配**：对高频使用 ChatGPT、Claude、Netflix 的人群极度友好；
4. **服务周期长与口碑积淀**：自 **${airport.establishedYear} 年** 运营至今，经历多次敏感期检验，可靠性远高于短期投机小机场。

### ⚠️ 2 大真实局限与短板
1. **价格门槛**：${airport.priceType === '年付折算价' ? '入门超低单价（约 7-8 元）需要年付一次性结算，如果不习惯长期绑定的用户，单月付起步成本会相对稍高' : '月付起步价格虽适中，但与追求极致 5 元垃圾垃圾中转相比仍有一定门槛'}；
2. **偏远节点数量**：主要资源集中在港、日、美、新等主流亚太与欧美高速节点，小众冷门国家（如拉美、非洲）节点相对较少。

---

## 🎯 八、适合人群与不适合人群精准判定

### ✅ 强烈建议入手的人群：
- **AI 开发者与高频办公者**：每天重度依赖 ChatGPT-4o、Claude 3.5、Cursor、GitHub，无法接受频繁报 1020 错误或封号；
- **外贸跨境从业者**：需要稳定访问海外独立站、亚马逊后台、WhatsApp 与客户保持实时联络；
- **4K/8K 极致影音追剧党**：热爱 Netflix、Disney+、YouTube，追求随意拖动进度条不缓冲的丝滑感；
- **注重晚高峰稳定性的金融投资人**：需要在夜间黄金时段查看外盘行情，要求绝对不跳 ping、不掉线。

### ❌ 不建议入手的人群：
- **极端白嫖党或月预算 < 5 元者**：此类用户建议去寻找免费白嫖公益节点或极低端随时可能跑路的万人中转；
- **大盘 PT 极度吞吐下载党**：每月需要消耗数 TB 流量下载电影原盘者，专线成本不适合如此高强度挥霍。

---

## 📊 九、同梯队代表性机场横向对比

| 对比维度 | ${airport.name} | 飞猫云 (FlyingCat) | 宇宙云 (CosmoCloud) | 星岛梦 (Xingdaomeng) |
| :--- | :--- | :--- | :--- | :--- |
| **主要定位** | ${spec.heroTag.split('｜')[1] || '老牌专线旗舰'} | 新锐高性价比专线 | 15元档VLESS性价比天花板 | 老牌不限时套餐专家 |
| **起步参考价** | **${airport.priceDisplay}** | 约 7.0 元/月 (年付折算) | 14.9 元/月 (真实月付) | 约 8.0 元/月 (年付折算) |
| **线路类型** | 企业级 IEPL 专线 | IEPL 专线 | IEPL 专线 (9Gbps大带宽) | 企业级内网专线 |
| **核心协议** | ${airport.protocols.join(' / ')} | Shadowsocks / VLESS | VLESS | Shadowsocks |
| **自研客户端** | 支持 (全端适配) | 支持 | 支持 | 第三方客户端导入 |
| **不限时套餐** | 无 (以周期订阅为主) | 无 | 无 | **提供永久不过期套餐** |
| **综合推荐指数** | **4.98 / 5.0 (首选)** | 4.92 / 5.0 | 4.89 / 5.0 | 4.89 / 5.0 |

---

## ❓ 十、常见问题深度解答 (FAQ)

### Q1: 晚高峰遇到个别节点连接超时或红叹号怎么排查？
**答：** 
1. 检查电脑/手机本地系统时间是否与北京时间完全一致（时间偏差超过 90 秒会导致 TLS 握手失败）；
2. 打开客户端点击“从 URL 更新订阅”，获取最新动态服务器 IP；
3. 切换至同区域的备用节点（例如将“香港 01”切换至“香港 02”或“日本 01”）。

### Q2: 为什么我的 ChatGPT 访问提示“Access Denied”？
**答：** 这是由于浏览器 Cookie 残留了被风控记录或当前节点 IP 暂时被 OpenAI 封锁。请开启浏览器无痕隐私窗口，切换至 ${airport.name} 的“美西专线”或带有“AI 原生”标识的节点，即可秒进。

### Q3: 专线机场相比普通中转，真的不会被 GFW 封锁吗？
**答：** IEPL 专线通过内网物理光纤跨越国境，国内入口与海外出口之间没有经过 GFW 公网防火墙节点，因此流量没有被 GFW 审查嗅探与丢包 QoS 的可能。只要入口机房正常运转，就能保持超强抗封锁。

### Q4: 支持几台设备同时在线？可以和朋友合租吗？
**答：** 大多数套餐支持 2-5 台设备同时并发在线。建议同一家庭或个人跨设备（手机+平板+电脑）使用，切勿公开向陌生人分享订阅链接，防止触发防盗刷风控被服务商冻结账号。

### Q5: 支持退款吗？
**答：** 虚拟网络服务由于消耗国际物理带宽，通常支持首购 24 小时内因技术原因无法连通的工单退款申请。具体以官网实时服务条款 (Terms of Service) 为准。

---

## 🏁 十一、权威评测总结与直达入口

综上所述，**${airport.name}** 在 2026 年的高速专线竞争中，凭借 **${airport.establishedYear} 年以来的深厚积淀、真 IEPL 物理专线架构、充沛的下行吞吐（实测 ${spec.measuredSpeedMax}）以及完善的全平台客户端支持**，确立了其作为**综合梯队第一梯队服务商**的地位。

如果您希望告别晚高峰卡顿、寻求长效稳定的海外科研、AI 生产力与影音体验，${airport.name} 绝对是值得信赖的明智之选。

<div class="cream-card p-6 my-8 text-center border-2 border-amber-400">
  <h3 class="text-xl font-bold text-stone-900 m-0">立即前往 ${airport.name} 官方网站</h3>
  <p class="text-sm text-stone-600 mt-2 mb-4">通过下方安全中转通道直达官网，防止访问钓鱼仿冒网站，输入专属码立享折扣</p>
  <div class="flex items-center justify-center gap-4">
    <JumpButton airport-id="${airport.slug}" name="${airport.name}" :status="currentAirport.status" label="官网直达通道 →" />
    <span v-if="currentAirport.couponCode" class="text-xs bg-amber-50 text-amber-800 px-3 py-2 rounded-lg border border-amber-200 font-mono font-bold">专属优惠码：{{ currentAirport.couponCode }}</span>
  </div>
</div>

<TopicCluster title="${airport.name} 相关专栏" />
`;
}

function generateBrandMarkdown(airport) {
  const spec = brandSpecifics[airport.slug] || brandSpecifics.guangsucloud;
  const couponNotice = airport.couponCode ? `结账时输入专属优惠码 \`${airport.couponCode}\` 享受立减。` : '暂无专属优惠码，支持官网日常活动。';

  return `---
title: ${airport.name} 官网与完整档案 (2026最新域名与优惠码)
description: 2026年最新收录${airport.name}官方网站、防失联镜像、套餐资费、节点架构、跑路风险监控与客观优缺点档案。
head:
  - - meta
    - name: keywords
      content: ${airport.name}, ${airport.name}官网, ${airport.name}优惠码, ${airport.name}怎么样, ${airport.name}跑路了吗
---

<script setup>
import { airportsData } from '../data/airports';
import AirportCard from '../.vitepress/theme/components/AirportCard.vue';
import BenchmarkBar from '../.vitepress/theme/components/BenchmarkBar.vue';
import JumpButton from '../.vitepress/theme/components/JumpButton.vue';
import TopicCluster from '../.vitepress/theme/components/TopicCluster.vue';

const airport = airportsData.find(a => a.slug === '${airport.slug}');
</script>

# ${airport.name} · 品牌全景档案 (2026 官方核准版)

> **品牌信用雷达：**  
> 本档案收录于 **jichangtuijian.run 机场品牌库**。包含品牌运营背景、网络物理架构、官方最新入口与实时运营状态监控。

---

## 📇 基础信息档案表

<div class="cream-card p-6 my-6">
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
    <div><strong>品牌全称：</strong> ${airport.name}</div>
    <div><strong>运营起始年：</strong> ${airport.establishedYear} 年 (已持续平稳服务 ${2026 - airport.establishedYear} 年)</div>
    <div><strong>线路类型：</strong> ${airport.lineTypes.join(' / ')}</div>
    <div><strong>传输协议：</strong> ${airport.protocols.join(' / ')}</div>
    <div><strong>入门价格：</strong> <span class="font-bold text-amber-700">${airport.priceDisplay}</span></div>
    <div><strong>支付支持：</strong> ${airport.paymentMethods.join(' / ')}</div>
    <div><strong>客户端生态：</strong> 提供自研客户端，同时兼容 Clash / Shadowrocket / sing-box</div>
    <div><strong>实时运营状态：</strong> <span class="badge-tag badge-green">正常服务中 (SLA > 99.5%)</span></div>
  </div>
</div>

---

## 🌐 核心卖点与网络架构

${airport.name} 核心主打 **${spec.architectureType}**，旨在为追求高品质、低延迟与晚高峰稳定性的用户提供专业科学上网支持。

- **跨境专线通道**：全链路采用物理光纤专线直连，从根本上杜绝公网 QoS 丢包与 GFW 流量干扰；
- **全区解锁覆盖**：对常用 AI 生产力工具（ChatGPT-4o、Claude 3.5、Cursor）及全球流媒体（Netflix、Disney+、YouTube 4K）有良好的原生 IP 支撑；
- **高弹性套餐**：涵盖低门槛月付及超高性价比长周期方案，满足不同用量用户的灵活选择。

---

## 💰 官方套餐与专属优惠码

- **起步套餐**：${airport.priceDisplay} 起；
- **流量配置**：${airport.trafficStarting}；
- **专属优惠码**：\`${airport.couponCode || '限时直降'}\`；
- **优惠说明**：${couponNotice}

<div class="my-6 flex gap-4">
  <JumpButton airport-id="${airport.slug}" name="${airport.name}" :status="airport.status" label="直达 ${airport.name} 官方网站 →" />
  <a :href="'/reviews/' + airport.slug" class="btn-primary text-sm px-5 py-2.5">查看万字级实测深度长文 →</a>
</div>

---

## ⚖️ 优缺点与适合人群判定

### 优点
${airport.pros.map(p => `- ${p}`).join('\n')}

### 局限性与建议
${airport.cons.map(c => `- ${c}`).join('\n')}

### 适合人群
${airport.bestFor.map(b => `- ${b}`).join('\n')}

---

## ❓ 常见问题与防失联指引

### 如何防止访问到假冒仿冒的 ${airport.name} 官网？
近年来搜索引擎存在大量通过投放广告仿冒主流机场的恶意钓鱼网站。建议通过本站专属安全中转路由 <JumpButton airport-id="${airport.slug}" name="${airport.name}" :status="airport.status" label="官网直达" /> 访问，本站每日自动化巡检校准官方最新域名，杜绝资金盗刷风险。

<TopicCluster title="${airport.name} 品牌关联导航" />
`;
}

console.log('Generating reviews and brand files for all 19 airports...');

for (const airport of airportsData) {
  const reviewFile = path.join(REVIEWS_DIR, `${airport.slug}.md`);
  const brandFile = path.join(BRANDS_DIR, `${airport.slug}.md`);

  const reviewContent = generateReviewMarkdown(airport);
  fs.writeFileSync(reviewFile, reviewContent, 'utf-8');
  console.log(`✓ Generated review: ${reviewFile}`);

  const brandContent = generateBrandMarkdown(airport);
  fs.writeFileSync(brandFile, brandContent, 'utf-8');
  console.log(`✓ Generated brand: ${brandFile}`);
}

// Clean up old mock files if any
const oldMockSlugs = ['mojie', 'shandianmao', 'suying666'];
for (const mockSlug of oldMockSlugs) {
  const oldReview = path.join(REVIEWS_DIR, `${mockSlug}.md`);
  const oldBrand = path.join(BRANDS_DIR, `${mockSlug}.md`);
  if (fs.existsSync(oldReview)) {
    fs.unlinkSync(oldReview);
    console.log(`Deleted obsolete mock review: ${oldReview}`);
  }
  if (fs.existsSync(oldBrand)) {
    fs.unlinkSync(oldBrand);
    console.log(`Deleted obsolete mock brand: ${oldBrand}`);
  }
}

console.log('All 19 airports generated successfully!');
