import fs from 'fs';
import path from 'path';

const guidesDeepArticles: Record<string, {
  title: string;
  description: string;
  keywords: string;
  tldr: string;
  selectedAirportsIds: string[];
  guideOverview: string;
  corePrinciples: string;
  guideTableData: Array<{ stepStage: string; coreAction: string; pitfallToAvoid: string; bestPractice: string; recTool: string }>;
  detailedInstructions: string;
  faqList: Array<{ q: string; a: string }>;
}> = {
  'beginner-handbook.md': {
    title: '2026 零基础新手科学上网入门白皮书：从概念认知到全设备顺畅使用',
    description: '面向零基础新手的2026全套科学上网入门白皮书：通俗拆解节点、订阅、客户端与专线原理，手把手带你安全出海。',
    keywords: '新手翻墙教程, 科学上网入门白皮书, 机场小白指南, 节点怎么用, 飞猫云, 光速云',
    tldr: '对于刚接触科学上网的小白，面对“节点、订阅、BGP、IEPL、规则分流”等术语往往感到无所适从。本白皮书用最通俗易懂的语言为你梳理全流程：第一步理解「机场提供线路，客户端负责运行」的二元关系；第二步注册如飞猫云或光速云等正规服务商并获取订阅链接；第三步在电脑或手机上导入客户端一键开启。全程只需 5 分钟，彻底告别断网困扰。',
    selectedAirportsIds: ['feimaoyun', 'guangsucloud', 'breezenet'],
    guideOverview: `
### 新手必须理清的核心常识

1. **什么是“机场”？**：它是一家专门租用跨国机房光纤、架设代理节点并打包成套餐出售的服务商；
2. **什么是“客户端”？**：它是安装在你手机或电脑上的网络管理软件（如 Clash、Shadowrocket），负责读取机场提供的节点并智能转发流量；
3. **为什么不能只买软件？**：软件只是空壳汽车，机场的节点订阅才是燃油，二者配合才能顺畅行驶。
`,
    corePrinciples: `
## 🛡️ 新手必须坚守的三大安全底线

- **安全底线一：远离免费公共翻墙工具**：天下没有免费的午餐，免费梯子通常通过兜售用户浏览隐私、注入弹窗广告甚至盗取银行密码维持生计；
- **安全底线二：坚持小额月付试水**：切勿在任何刚接触的平台上直接支付高额年费；
- **安全底线三：严禁使用主邮箱与通用密码**：使用专用独立小号注册机场，保护个人信息。
`,
    guideTableData: [
      { stepStage: '第一步：账号准备', coreAction: '使用小号邮箱注册正规老牌机场', pitfallToAvoid: '使用常用密码', bestPractice: '独立密码/开启两步验证', recTool: '飞猫云 / 光速云' },
      { stepStage: '第二步：获取订阅', coreAction: '在用户中心复制 Clash 订阅链接', pitfallToAvoid: '泄露订阅给他人', bestPractice: '妥善保管/个人独享', recTool: '用户中心后台' },
      { stepStage: '第三步：安装软件', coreAction: '下载电脑端或手机端推荐客户端', pitfallToAvoid: '下载带毒修改版', bestPractice: '前往官方 GitHub 下载', recTool: 'Clash Verge / 小火箭' },
      { stepStage: '第四步：开启代理', coreAction: '导入配置，模式选择“规则 (Rule)”', pitfallToAvoid: '开启全局模式', bestPractice: '规则分流保证国内速度', recTool: '系统代理开关' }
    ],
    detailedInstructions: `
## 🚀 手把手完整实操四步曲

1. 注册选型：在飞猫云或光速云选择 15-20 元基础月付套餐；
2. 软件安装：电脑安装 **[Clash Verge Rev](/clients/clash-verge)**，苹果手机安装 **[小火箭](/clients/shadowrocket)**；
3. 导入节点：在客户端点击导入刚才复制的订阅；
4. 开启代理：选择一个香港或日本节点，打开系统代理开关，即可秒开海外网站。
`,
    faqList: [
      { q: '连上代理后国内微信和淘宝会受影响吗？', a: '只要客户端模式保持为“规则 (Rule)”，国内流量完全走本地宽带直连，速度和 IP 地理位置完全不受任何影响。' },
      { q: '手机和电脑需要买两次套餐吗？', a: '不需要。同一个机场账号的订阅链接可以同时在你的手机、电脑、平板等 2-5 台设备上导入使用。' }
    ]
  },

  'what-is-airport.md': {
    title: '2026 什么是机场？科学上网专线与传统VPN核心技术机制深度全科普',
    description: '深度科普科学上网中的“机场”到底是什么：从Shadowsocks历史起源、机房专线中转到与传统商业VPN（如ExpressVPN）的技术代差。',
    keywords: '什么是机场, 机场与VPN区别, 科学上网科普, 为什么叫机场, IEPL专线原理, 翻墙原理',
    tldr: '“机场”是中文互联网对基于 Shadowsocks、VLESS、Trojan 等新一代混淆代理协议搭建的跨国节点服务商的俗称（因早期软件图标为小飞机而得名）。它与传统商业 VPN（如 ExpressVPN、NordVPN）在底层技术上存在代差：传统 VPN 采用明显的全局特征加密，在境内已被深度包检测（DPI）精准识别阻断；而现代专线机场采用境内 BGP 入口与物理内网专线传输，实现了晚高峰零丢包与超高速体验。',
    selectedAirportsIds: ['guangsucloud', 'yuzhouyun'],
    guideOverview: `
### “机场”这个名字的由来

2012 年前开发者 clowwindy 开源了 Shadowsocks（影梭），其客户端图标是一架轻盈的纸飞机。后来为纸飞机提供跨国机房节点的一揽子服务商，便被社区形象地戏称为“机场”，各大节点被称为“航线”，流量套餐被称为“登机牌”。
`,
    corePrinciples: `
## 🔬 机场 vs 传统商业 VPN 的技术代差

- **传统商业 VPN (OpenVPN/IKEv2)**：设计初衷是跨国企业远程内网接入，加密握手特征极其庞大明显。国内防火墙可以 100% 识别并在数秒内掐断握手；
- **现代企业专线机场**：采用端到端物理以太网二层光缆（IEPL），数据在境内即完成接入，根本不经过公网海缆与防火墙审查节点，因此能做到常年平稳顺畅。
`,
    guideTableData: [
      { stepStage: '物理出海路径', coreAction: '专线机场走运营商专用物理光纤内网', pitfallToAvoid: '传统VPN走公网海缆', bestPractice: '完全不经公网GFW', recTool: '光速云企业IEPL' },
      { stepStage: '协议特征隐蔽性', coreAction: '现代协议高度模拟正常网页访问', pitfallToAvoid: '传统VPN特征明显', bestPractice: 'VLESS Reality / gRPC', recTool: 'VLESS 协议' },
      { stepStage: '晚高峰表现', coreAction: '专线机场全天丢包率贴近 0.0%', pitfallToAvoid: '传统VPN频繁断流断网', bestPractice: '晚高峰极速秒开', recTool: '专线带宽冗余' }
    ],
    detailedInstructions: `
## 💡 为什么国外的知名商业 VPN 在国内越来越难用？

因为海外评测机构是在欧美完全自由的网络环境下测试 ExpressVPN 或 NordVPN；而在中国大陆存在严密的防火墙环境，必须采用专线中转与深度混淆技术方能稳定存活。
`,
    faqList: [
      { q: '专线机场属于 VPN 吗？', a: '广义上都属于代理中转范畴，但狭义上机场采用的是应用层与传输层高级代理协议，灵活性和抗封锁能力远强于传统底层 VPN。' },
      { q: '机场能保证我的上网绝对匿名吗？', a: '专线机场能完全隐藏你对目标站点的本地真实 IP，但严禁将加速服务用于任何违反法律法规的违法用途。' }
    ]
  },

  'how-to-choose.md': {
    title: '2026 怎样科学挑选适合自己的机场？八大核心避坑黄金法则',
    description: '2026年选机黄金指南：根据预算、设备生态、使用场景（办公/追剧/游戏/AI）精准挑选最契合的服务商，拒绝花冤枉钱。',
    keywords: '怎样挑选机场, 机场选购指南, 机场避坑法则, 靠谱机场推荐, 适合自己的机场',
    tldr: '挑选机场最忌讳盲目跟风买所谓的大而全套餐。科学的选型法则包含八大核心考量：是否具备纯正内网专线、是否部署多地 BGP 入口、是否支持纯月付试错、流媒体与大模型是否原生解锁、工单响应时效、运营时间是否超过 2 年、节点负载是否健康、以及客户端配套是否完善。对照这八条法则，能帮你避开 99% 的跑路坑。',
    selectedAirportsIds: ['guangsucloud', 'feimaoyun', 'xingdaomeng', 'breezenet'],
    guideOverview: `
### 八大选机黄金法则清单

1. **查线路用料**：坚决认准全内网 IEPL 专线，拒绝劣质公网直连；
2. **看运营年限**：优先选择运营 3 年以上的老牌稳定品牌；
3. **看付费弹性**：支持单月小额付费，无强制绑架年付；
4. **看原生 IP 质量**：具备原生双 ISP 落地，避免风控；
5. **看三网适配度**：拥有三网 BGP 聚合入口；
6. **看自研/配套客户端**：降低日常使用与维护成本；
7. **看备用冗余**：常备一份按量不过期套餐；
8. **看真实口碑**：在无利益绑定的技术社区查验历史表现。
`,
    corePrinciples: `
## 🎯 四大典型人群精准对号入座

- **重度办公与企业外贸**：无脑锁定 **[光速云](/reviews/guangsucloud)**；
- **全家追剧与小白新手**：无脑锁定 **[飞猫云](/reviews/feimaoyun)**；
- **极客省钱与大流量下载**：无脑锁定 **[宇宙云](/reviews/yuzhouyun)** 或 **[微风网络](/reviews/breezenet)**；
- **出差备用与防断网**：常备一份 **[星岛梦不限时](/reviews/xingdaomeng)**。
`,
    guideTableData: [
      { stepStage: '法则 1-2', coreAction: '验证物理专线与 3 年以上运营历史', pitfallToAvoid: '被虚标千兆直连迷惑', bestPractice: '实测晚高峰长Ping丢包', recTool: '光速云 (6年老牌)' },
      { stepStage: '法则 3-4', coreAction: '优先单月小额付款并测试 AI 解锁', pitfallToAvoid: '盲目年付未知新站', bestPractice: '月付体验满意再升级', recTool: '飞猫云 (月付19)' },
      { stepStage: '法则 5-8', coreAction: '检查三网入口与备用冗余机制', pitfallToAvoid: '单机场单点故障瘫痪', bestPractice: '主力专线+不限时双保险', recTool: '星岛梦 (不限时)' }
    ],
    detailedInstructions: `
## 🛒 避开虚假营销宣传的三大话术

- 凡是声称“9.9 元无限流量”的，100% 会严重降速或跑路；
- 凡是声称“绝对永不被墙”的，100% 是不懂网络技术的黑产骗子；
- 凡是声称“上千个节点”的，绝大多数是单机多端口虚标。
`,
    faqList: [
      { q: '怎么看一家机场开了多久？', a: '查看其官方 Telegram 频道的最早发布历史，或在 whois 网站查询其最早历史域名的注册年限。' },
      { q: '价格贵的一定比便宜的好吗？', a: '在一定区间内是的，物理专线和原生住宅 IP 的硬件成本是刚性的；但在高端区间也要警惕虚高溢价。' }
    ]
  },

  'how-to-buy.md': {
    title: '2026 机场购买完整流程与安全防套牢防跑路指南',
    description: '2026年机场下单购买全流程指南：结算通道甄别、优惠码使用、防冲动消费策略与资金安全红线。',
    keywords: '机场购买教程, 机场怎么买, 机场付费指南, 科学上网购买流程, 飞猫云优惠码',
    tldr: '购买机场看似简单，但背后涉及资金安全与隐私保护的诸多细节。安全下单四步法：挑选正规品牌、优先选择单月周期、在结账页面输入本站专属优惠码享受折扣、通过正规免实名快捷通道小额付款。严禁使用信用卡直接绑定未知小平台的自动扣款，杜绝资金风险。',
    selectedAirportsIds: ['feimaoyun', 'guangsucloud', 'breezenet'],
    guideOverview: `
### 安全购买操作清单

1. 确认访问的是官方防失联最新正规域名，警惕搜索引擎广告钓鱼伪站；
2. 注册账号时使用独立密码；
3. 选择月付或包含体验退款承诺的周期；
4. 复制本站专属折扣码（如飞猫云 \`flycat888\`、光速云 \`AMM\`、微风网络 \`flat888\`）填入输入框立享优惠。
`,
    corePrinciples: `
## 💳 支付安全与隐私保护核心常识

- 优先使用支付宝或微信的第四方小额免密扫码通道；
- 绝对不要在小机场页面直接输入个人的国内双币信用卡 CVV 码；
- 保留支付成功的订单截图与流水号，以备售后查验。
`,
    guideTableData: [
      { stepStage: '官网识别', coreAction: '通过本站认证安全通道直达官网', pitfallToAvoid: '点击搜索广告钓鱼山寨站', bestPractice: '认准本站官方链接', recTool: '直达安全通道' },
      { stepStage: '周期选择', coreAction: '首选单月或最低季度周期', pitfallToAvoid: '冲动购买 3 年甚至终生包', bestPractice: '小步试错验证品质', recTool: '月付模式' },
      { stepStage: '优惠抵扣', coreAction: '输入本站独家优惠码立享 8-9 折', pitfallToAvoid: '原价直接结算', bestPractice: '节省 10%-20% 开销', recTool: '专属优惠码' }
    ],
    detailedInstructions: `
## 🚀 下单五步实操

1. 点击本站卡片上的【直达官网购买 →】；
2. 注册并登录服务商用户中心；
3. 点击“购买订阅”选择匹配你的流量档位；
4. 输入优惠码并核验折后金额；
5. 完成扫码支付，套餐即刻生效到账。
`,
    faqList: [
      { q: '付款后没到账怎么办？', a: '稍等 1-2 分钟刷新页面，若仍未到账，在后台提交工单并附上微信/支付宝的交易单号，客服会人工补单。' },
      { q: '自动扣费功能怎么关闭？', a: '在支付宝或微信的“免密支付/自动扣款”设置中随时可以一键关闭。' }
    ]
  },

  'how-to-register.md': {
    title: '2026 机场注册注意事项与邮箱隐私防护技巧指南',
    description: '科学上网账号注册隐私安全指南：如何选用安全注册邮箱、规避信息泄漏、密码管理与两步验证 (2FA) 配置。',
    keywords: '机场注册教程, 科学上网注册隐私, 翻墙邮箱推荐, 账号安全防范, 临时邮箱',
    tldr: '很多用户习惯用自己的日常主力 QQ 邮箱或网易 163 邮箱直接注册各类机场，这存在巨大的隐私泄露隐患（一旦小机场数据库泄露，个人真实身份直接暴露）。注册核心准则：使用与个人真实身份完全脱钩的独立海外邮箱（如 Outlook、ProtonMail 或 Gmail 小号），并配合独立随机密码与两步验证。',
    selectedAirportsIds: ['guangsucloud', 'feimaoyun'],
    guideOverview: `
### 注册隐私保护四大军规

1. **绝对不用 QQ 邮箱或 163 邮箱**：QQ 邮箱直接包含个人 QQ 号码，属于实名级信息；
2. **绝对不用常用密码**：避免因某一家平台遭遇撞库导致全网账号失窃；
3. **开启二步验证 (2FA / TOTP)**：重要生产力账号开启 Google Authenticator 动态口令；
4. **警惕强制手机号短信注册的平台**：正规机场全靠邮箱验证，强制要求大陆手机号的大多是不良收集商。
`,
    corePrinciples: `
## 📧 推荐使用的安全注册邮箱

- **微软 Outlook / Hotmail**：门槛极低，国内直连可注册，与个人身份隔离；
- **ProtonMail**：瑞士端到端加密邮箱，无需任何手机号验证，极客首选；
- **Gmail 小号**：全球通用性最强。
`,
    guideTableData: [
      { stepStage: '邮箱挑选', coreAction: '准备专用海外小号邮箱', pitfallToAvoid: '使用个人 QQ 邮箱注册', bestPractice: 'Outlook / ProtonMail', recTool: '安全独立邮箱' },
      { stepStage: '密码设定', coreAction: '使用密码管理器生成 16 位强随机密码', pitfallToAvoid: '使用个人生日或手机号密码', bestPractice: '完全独立无关联', recTool: 'Bitwarden / 1Password' },
      { stepStage: '安全加固', coreAction: '后台绑定 Google 2FA 动态令牌', pitfallToAvoid: '仅依赖单一弱密码', bestPractice: '动态防撞库防盗号', recTool: 'Google Authenticator' }
    ],
    detailedInstructions: `
## 🛠️ 注册标准操作流程

打开官网注册界面，填入准备好的专用邮箱，设置独立密码，完成图形滑块验证后即可成功创建账号。
`,
    faqList: [
      { q: '收不到注册验证码邮件怎么办？', a: '先查看邮箱的垃圾邮件箱（Spam），部分邮件系统可能会误拦截系统邮件；若仍未收到，尝试更换为 Outlook 邮箱。' },
      { q: '注册信息会被机场站长看到吗？', a: '站长只能看到你注册时填写的邮箱字符串。使用脱钩的独立小号邮箱，站长无法知晓你的真实身份。' }
    ]
  },

  'clash-import.md': {
    title: '2026 Clash 订阅链接一键导入与订阅转换全流程保姆教程',
    description: '手把手教你将机场订阅导入 Clash Verge Rev / Clash for Windows：解决订阅拉取失败、链接格式不兼容与本地转换技巧。',
    keywords: 'Clash导入订阅, Clash订阅转换, Clash配置教程, 订阅链接使用, 飞猫云Clash',
    tldr: '订阅链接是连接你的客户端与机场服务端的唯一桥梁。绝大多数新手在使用 Clash 时遇到的“Invalid Config”或“Network Error”，90% 源于订阅链接复制不完整、格式未对齐或被本地运营商阻断。通过飞猫云或光速云等原生提供标准 Clash 订阅的服务商，直接复制导入即可 100% 成功。',
    selectedAirportsIds: ['feimaoyun', 'guangsucloud'],
    guideOverview: `
### 订阅导入标准三步法

1. 登录机场后台，点击“复制 Clash 订阅”；
2. 打开 Clash Verge Rev，点击左侧“订阅”面板；
3. 粘贴链接，点击“保存并导入”，等待节点列表加载完毕。
`,
    corePrinciples: `
## ⚠️ 谨慎使用公共在线订阅转换平台

市面上很多免费公共的 \`subconverter\` 在线转换网站，可能会在后台偷偷记录用户的订阅 Token 甚至盗用你的专线流量。优先选择后台自带原生 Clash 配置的优质机场，避免将敏感订阅上传给第三方未知网站。
`,
    guideTableData: [
      { stepStage: '第一步', coreAction: '复制原生 Clash 完整订阅链接', pitfallToAvoid: '少复制末尾 token 字符', bestPractice: '点击一键复制按钮', recTool: '机场后台' },
      { stepStage: '第二步', coreAction: '打开客户端粘贴至订阅管理面板', pitfallToAvoid: '误粘贴在代理配置单节点处', bestPractice: '保存并立即更新', recTool: 'Clash Verge Rev' },
      { stepStage: '第三步', coreAction: '在代理组中勾选延迟最低的节点', pitfallToAvoid: '未勾选节点直接开代理', bestPractice: '开启系统代理模式', recTool: '规则模式 (Rule)' }
    ],
    detailedInstructions: `
## 🛠️ 订阅导入报错排障自查

- 提示 \`Unsupported Config\`：说明机场生成的是旧版格式，在 Clash Verge 设置中将内核切换为最新的 Mihomo 即可；
- 提示 \`Download Timeout\`：原订阅分发域名受阻，连接手机热点重试或向机场客服索取最新备用订阅分发域名。
`,
    faqList: [
      { q: '订阅链接泄露了怎么办？', a: '立即登录机场后台，在用户中心点击“重置订阅信息 (Reset Token)”，旧订阅会瞬间永久失效，重新复制新链接导入即可。' },
      { q: '每次开机都需要重新导入订阅吗？', a: '不需要。订阅只需导入一次即可长期保存在本地，客户端会在后台自动定时更新节点。' }
    ]
  },

  'shadowrocket-guide.md': {
    title: '2026 小火箭 Shadowrocket 扫码导入与规则分流高级配置实战',
    description: '苹果iOS平台小火箭深度配置指南：扫码极速导入、远程规则白名单订阅、去广告与防断流配置。',
    keywords: '小火箭教程, Shadowrocket扫码导入, iOS小火箭规则, 苹果手机翻墙配置, 飞猫云小火箭',
    tldr: 'Shadowrocket（小火箭）是 iPhone 与 iPad 用户科学上网的标准配置。相比繁琐的手动输入，小火箭支持全自动摄像头扫码极速导入，支持自动按需连接与远程规则分流。配合飞猫云或光速云，手机打开扫一扫即可在 3 秒内完成全部设置，国内应用极速秒开、海外服务无感加速。',
    selectedAirportsIds: ['feimaoyun', 'guangsucloud'],
    guideOverview: `
### 小火箭四大核心功能模块

- **节点列表**：展示所有可用国家和延迟；
- **配置规则 (Config)**：智能判定哪些网站走直连、哪些走专线；
- **场景模式 (Scenario)**：根据 Wi-Fi 与蜂窝数据自动切换连接策略；
- **证书管理**：用于高级 HTTPS 解密与去广告功能。
`,
    corePrinciples: `
## 📱 苹果手机使用小火箭最佳设置

1. 全局路由必须设置为“配置”；
2. 开启“自动更新订阅”并设置周期为 24 小时；
3. 允许小火箭在后台常驻运行。
`,
    guideTableData: [
      { stepStage: '导入阶段', coreAction: '点击右上角加号或扫码图标一秒导入', pitfallToAvoid: '手动打错字符', bestPractice: '直接摄像头扫码', recTool: '飞猫云二维码' },
      { stepStage: '模式设定', coreAction: '全局路由选择“配置”模式', pitfallToAvoid: '误选“代理”模式', bestPractice: '保证国内微信直连', recTool: '规则分流' },
      { stepStage: '启动连接', coreAction: '点击顶部开关并允许添加 VPN 描述文件', pitfallToAvoid: '输入错误锁屏密码', bestPractice: '指纹或面容快速确认', recTool: 'iOS 系统权限' }
    ],
    detailedInstructions: `
## 🚀 极速实操三步法

打开飞猫云后台二维码 -> 小火箭扫一扫 -> 勾选香港 01 节点并开启顶部开关，完成！
`,
    faqList: [
      { q: '小火箭连上后右上角为什么没有 VPN 图标？', a: 'iOS 16 及以上系统在灵动岛或状态栏对 VPN 图标进行了折叠，下拉控制中心即可看到 VPN 运行标志。' },
      { q: '小火箭会消耗很多电量吗？', a: '小火箭基于原生 NetworkExtension 开发，优化极深，后台运行全天电量消耗通常低于 2%。' }
    ]
  },

  'import-subscription.md': {
    title: '2026 订阅导入常见错误全排查与格式转换通用技巧',
    description: '全面排查机场订阅导入失败的所有疑难杂症：SSL证书错误、格式解析失败、Token过期与通用转换指南。',
    keywords: '订阅导入失败, 机场订阅更新错误, 订阅转换教程, 解决订阅拉取超时, 科学上网教程',
    tldr: '订阅导入是科学上网过程中最常见的一类故障：表现为拉取超时、提示 404、或客户端报错“Invalid Format”。排查此类问题只需三步：检查订阅链接中是否包含完整的 Token 参数；测试订阅域名在本地是否被 DNS 污染；并在必要时通过自建或可信的格式适配器完成转换。选择飞猫云或光速云等原生提供多格式订阅的品牌，可彻底根治此类问题。',
    selectedAirportsIds: ['feimaoyun', 'guangsucloud', 'yuzhouyun'],
    guideOverview: `
### 订阅失败的四大典型根因

1. **Token 字符复制缺失**：手动选中链接时遗漏了末尾一两个字母；
2. **本地运营商 DNS 污染**：原订阅分发域名被阻断，客户端拉取不到内容；
3. **客户端版本过于陈旧**：不支持新一代的 VLESS 或 Reality 语法；
4. **套餐已欠费或已到期**：服务商系统自动冻结了该订阅的 API 输出。
`,
    corePrinciples: `
## 🛠️ 自行排查的标准处置 SOP

- 第一步：检查机场用户中心账户状态是否正常（未过期、流量未用完）；
- 第二步：重新在后台点击“复制订阅”按钮；
- 第三步：客户端将内核升级至最新版本后重新导入。
`,
    guideTableData: [
      { stepStage: '报错一：Download Timeout', coreAction: '检查本地网络或切换手机热点拉取', pitfallToAvoid: '盲目重复点击更新', bestPractice: '更换备用分发域名', recTool: '备用订阅链接' },
      { stepStage: '报错二：Format Error', coreAction: '更新客户端内核或选择对应格式', pitfallToAvoid: '将旧版配置强塞新客户端', bestPractice: '认准 Mihomo / Sing-box', recTool: 'Clash Verge Rev' },
      { stepStage: '报错三：Empty Nodes', coreAction: '核验账户余额与到期时间', pitfallToAvoid: '误以为节点挂了', bestPractice: '及时续费恢复服务', recTool: '用户中心后台' }
    ],
    detailedInstructions: `
## 💡 如何在本地测试订阅链接是否活着？

直接将订阅链接粘贴进浏览器地址栏并回车访问：如果能正常下载一个文本文件或弹出一串 Base64 加密字符，说明订阅完全正常，问题出在客户端配置；若浏览器也无法打开，说明该订阅域名在本地已被阻断，需联系机场客服获取备用链接。
`,
    faqList: [
      { q: '订阅链接里的 Token 会经常变化吗？', a: '只要你没有主动在后台点击“重置订阅”，Token 会永久保持固定。' },
      { q: '一个订阅链接能在几台设备上同时导入？', a: '可以在你拥有的所有设备上随意导入，只有当多台设备同时发起网络连接时，才会计入套餐的同时在线并发限制。' }
    ]
  },

  'update-subscription.md': {
    title: '2026 订阅自动更新失败深度原因分析与自愈修复指南',
    description: '针对Clash、小火箭订阅无法自动更新问题的终极解决方案：解析节点不同步、订阅过期与自动化定时刷新配置。',
    keywords: '订阅更新失败, 节点不更新解决, 自动更新配置, 机场节点变动同步, 飞猫云',
    tldr: '很多用户经常遇到“明明机场发了公告更换了新节点，但自己客户端里还是旧节点无法使用”的尴尬。这通常是因为客户端关闭了自动更新、或者在更新时被本地系统防火墙阻断。正确配置客户端的定时自动更新（如每 24 小时自动刷新一次），并掌握手动强制刷新技巧，能保证你的节点永远处于最新、最健康的状态。',
    selectedAirportsIds: ['feimaoyun', 'guangsucloud', 'breezenet'],
    guideOverview: `
### 为什么订阅必须保持定期更新？

机场运维团队会动态优化机房拓扑：当某个落地的 IP 被 Netflix 或 Cloudflare 临时风控时，运维会在服务端更换新 IP，并通过订阅分发给用户。如果不及时更新，客户端就会一直尝试连接已被封禁的旧 IP 导致持续红灯。
`,
    corePrinciples: `
## 🔄 配置全自动静默更新的黄金周期

- 日常主力电脑：设置自动更新间隔为 **1440 分钟（24 小时）**；
- 遇到突发重大网络波动期：在客户端中手动点击一次“刷新/Update”即可立即获取最新救援节点。
`,
    guideTableData: [
      { stepStage: '电脑端自动更新', coreAction: 'Clash Verge 订阅设置更新周期 1440m', pitfallToAvoid: '设为 0 (永不自动更新)', bestPractice: '每天开机自动同步', recTool: 'Clash Verge Rev' },
      { stepStage: '苹果手机端更新', coreAction: '小火箭设置中开启“打开应用时自动更新”', pitfallToAvoid: '数月不手动刷新', bestPractice: '随时保持最新节点池', recTool: 'Shadowrocket' }
    ],
    detailedInstructions: `
## 🛠️ 强制更新三部曲

1. 开启代理客户端当前能用的任意一个备用节点；
2. 挂着代理访问客户端订阅管理界面；
3. 点击“强制更新全部订阅 (Force Update)”，利用代理通道绕过本地网络污染拉取最新配置。
`,
    faqList: [
      { q: '更新订阅会重置我个人的分流设置吗？', a: '正规客户端（如 Clash Verge Rev）将节点列表与个人自定义规则（Rule Override）完全解耦，更新订阅仅刷新节点 IP，绝对不会破坏你自己的分流配置。' },
      { q: '更新订阅提示 404 是怎么回事？', a: '说明你的订阅 Token 在后台被意外重置或套餐已过期，重新在官网复制新订阅即可。' }
    ]
  },

  'select-nodes.md': {
    title: '2026 节点挑选实战秘籍：如何按业务需求精准匹配最优节点？',
    description: '科学上网节点挑选全攻略：香港、日本、新加坡、美国各区域节点特点深度剖析，教你按场景精准选用最快节点。',
    keywords: '怎么选节点, 节点选择技巧, 香港日本节点对比, 玩游戏选哪个节点, 看4K选哪个节点',
    tldr: '面对机场列表中几十个不同国家和编号的节点，很多用户不知道该选哪一个。节点挑选的核心逻辑：根据你的“业务目标”匹配最佳地理与网络特性。日常主力浏览与中文字幕视频选「香港专线」（延迟最低、字幕最全）；外服游戏与大模型 AI 选「日本专线」（响应极快、OpenAI 官方支持）；美区流媒体独播与海外海淘选「美国美西专线」；大文件极速下载选大带宽节点。',
    selectedAirportsIds: ['guangsucloud', 'feimaoyun', 'yuzhouyun'],
    guideOverview: `
### 四大核心节点区域特色速查

- **香港节点 (HK)**：延迟 10-35ms，中文字幕最全，日常主力无脑首选；
- **日本节点 (JP)**：延迟 28-50ms，外服游戏电竞级首选，大模型免验证；
- **新加坡节点 (SG)**：延迟 35-55ms，东南亚业务与流媒体极佳备用；
- **美国节点 (US)**：延迟 135-150ms，美区独播电影、AI 功能首发体验。
`,
    corePrinciples: `
## 🎯 按需选节点实用决策树

- 刷微博/看 B 站/微信聊天：直接国内直连（规则分流自动处理）；
- 看 YouTube 4K / 刷 Twitter：首选 **香港 01 / 香港 02**；
- 玩《APEX》《英雄联盟台服》：首选 **日本 01 / 台湾 01**；
- 与 ChatGPT 4o / Claude 对话：首选 **带有专属“AI/原生”标识的日本或美西节点**。
`,
    guideTableData: [
      { stepStage: '日常办公/影音', coreAction: '锁定香港 IEPL 专线', pitfallToAvoid: '盲目选美国高延迟节点', bestPractice: '极低时延/首屏秒开', recTool: '光速云香港专线' },
      { stepStage: '电竞外服联机', coreAction: '锁定日本低抖动专线', pitfallToAvoid: '使用延迟大于100ms的节点', bestPractice: '抖动<1ms/零丢包', recTool: '速界日本专线' },
      { stepStage: 'AI 交互免验证', coreAction: '选用原生住宅双 ISP 节点', pitfallToAvoid: '使用机房广播公用节点', bestPractice: '免弹验证码秒回传', recTool: '飞猫云原生双ISP' }
    ],
    detailedInstructions: `
## ⚙️ 善用客户端自动测速优选 (URL-Test)

在 Clash 中将策略组设置为 \`url-test\`，客户端会每隔 10 分钟自动对组内节点发起静默测速，自动将连接路由切换到当前可用延迟最低的节点上，实现完全免维护的智能化漫游。
`,
    faqList: [
      { q: '节点名称前面的倍率 (0.5x / 1.0x / 2.0x) 是什么意思？', a: '倍率代表流量消耗系数。例如 0.5x 节点你用 1GB 实际只扣除 0.5GB 配额；2.0x 高性能节点用 1GB 会扣除 2GB 配额。' },
      { q: '测速延迟显示 9999ms 或 Timeout 怎么办？', a: '说明当前节点在维护或本地连不上，切换到列表中的其他备用节点即可。' }
    ]
  }
};

const baseDir = path.resolve('src/guides');

for (const [filename, item] of Object.entries(guidesDeepArticles)) {
  const slug = filename.replace(/\.md$/, '');
  const canonicalUrl = 'https://jichangtuijian.run/guides/' + slug;
  const filePath = path.join(baseDir, filename);

  const selectedListStr = JSON.stringify(item.selectedAirportsIds);

  const tableRows = item.guideTableData.map(r => 
    `| **${r.stepStage}** | ${r.coreAction} | ${r.pitfallToAvoid} | **${r.bestPractice}** | ${r.recTool} |`
  ).join('\n');

  const faqSchema = item.faqList.map(f => ({
    '@type': 'Question',
    'name': f.q,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': f.a
    }
  }));

  const faqMarkdown = item.faqList.map(f => 
    `### Q: ${f.q}\n${f.a}\n`
  ).join('\n');

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': item.title,
    'description': item.description,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': canonicalUrl
    },
    'publisher': {
      '@type': 'Organization',
      'name': '机场推荐评测实验室',
      'url': 'https://jichangtuijian.run'
    }
  };

  const faqPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqSchema
  };

  const indent = (str: string, n: number) => str.split('\n').map(l => ' '.repeat(n) + l).join('\n');

  const content = `---
title: ${item.title}
description: ${item.description}
head:
  - - meta
    - name: keywords
      content: ${item.keywords}
  - - link
    - rel: canonical
      href: ${canonicalUrl}
  - - script
    - type: application/ld+json
    - |
${indent(JSON.stringify(articleSchema, null, 2), 6)}
  - - script
    - type: application/ld+json
    - |
${indent(JSON.stringify(faqPageSchema, null, 2), 6)}
---

<script setup>
import { airportsData } from '../data/airports';
import AirportCard from '../.vitepress/theme/components/AirportCard.vue';
import CompareTable from '../.vitepress/theme/components/CompareTable.vue';
import TopicCluster from '../.vitepress/theme/components/TopicCluster.vue';

const targetIds = ${selectedListStr};
const displayAirports = airportsData.filter(a => targetIds.includes(a.id));
</script>

# ${item.title.split('：')[0]}

> **【教程核心速览与实操结论】**：${item.tldr}

---

## 🏆 推荐搭配使用的高速稳定专线服务商

<div v-for="item in displayAirports" :key="item.id" class="my-4">
  <AirportCard :airport="item" />
</div>

---

${item.guideOverview}

---

## 📊 核心流程步骤与防坑避雷对照表

| 核心推进阶段 | 关键实操动作 | 严禁踩入的误区陷阱 | 业内标准最佳实践 | 推荐使用工具 |
| :--- | :--- | :--- | :--- | :--- |
${tableRows}

---

${item.corePrinciples}

---

${item.detailedInstructions}

---

## ❓ 教程核心疑难解答 FAQ

${faqMarkdown}

---

<TopicCluster title="${item.title.split('：')[0]}" />
`;

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Successfully upgraded ' + filename + ': ' + content.length + ' chars, ' + content.split('\n').length + ' lines');
}

console.log('All 10 guides articles upgraded to deep comprehensive standard!');
