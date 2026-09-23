import fs from 'fs';
import path from 'path';

const troubleshootingDeepArticles: Record<string, {
  title: string;
  description: string;
  keywords: string;
  tldr: string;
  selectedAirportsIds: string[];
  symptomAnalysis: string;
  rootCauseBreakdown: string;
  troubleshootTableData: Array<{ symptom: string; probableCause: string; quickFix: string; permanentSolution: string; severity: string }>;
  stepByStepRecovery: string;
  faqList: Array<{ q: string; a: string }>;
}> = {
  'connection-failed.md': {
    title: '2026 节点全部超时？科学上网自查速修五步终极排障手册',
    description: '针对Clash、小火箭所有节点突然全部超时、无法上网的终极自救方案：系统时间差、代理冲突、订阅过期与DNS污染全排查。',
    keywords: '节点全部超时, 翻墙连不上解决, 节点全部红叹号, Clash节点超时, 科学上网排障手册',
    tldr: '遇到客户端内所有节点突然全部显示“Timeout”或红色感叹号时，90% 的用户会误以为是机场服务器全部瘫痪。实际上绝大部分故障源于本地环境：第一是本地电脑系统时间与互联网时间误差超过 60 秒（导致 TLS 握手认证直接失败）；第二是本地代理端口被第三方管家软件冲突占用；第三是订阅域名被本地 DNS 污染未及时刷新。按照本手册五步排查，可在 3 分钟内 100% 自愈恢复。',
    selectedAirportsIds: ['feimaoyun', 'guangsucloud', 'xingdaomeng'],
    symptomAnalysis: `
### 假性故障 vs 真性机房事故快速甄别

- **假性本地故障（占比 90%）**：所有节点同时瞬间全部报超时，而手机用蜂窝网络却能正常连接，或官方群内毫无异常公告；
- **真性机房事故（占比 10%）**：个别特定地区的节点不可用，或官方渠道发布了光缆维护割接通知。
`,
    rootCauseBreakdown: `
## 🔬 导致节点全部暴毙的三大高频隐藏元凶

1. **系统时间漂移**：VLESS Reality 与现代 TLS 协议为了防范重放攻击，严格校验客户端与服务端的 UNIX 时间戳，时间相差 1 分钟即刻强行丢弃数据包；
2. **系统代理未成功接管**：Windows 系统设置中的代理开关被杀毒软件误关，或注册表项损坏；
3. **本地运营商 DNS 污染**：原订阅入口域名的 IP 被解析到虚假地址（如 127.0.0.1）。
`,
    troubleshootTableData: [
      { symptom: '所有节点全部红灯', probableCause: '系统时间未同步 / 误差>60s', quickFix: '设置中点击“立即同步时间”', permanentSolution: '开启 Windows 自动时间同步服务', severity: '高频 (45%)' },
      { symptom: '测速有延迟但打不开网页', probableCause: '浏览器代理插件冲突 / 系统代理被挤占', quickFix: '关闭 SwitchyOmega 等多余扩展', permanentSolution: '开启客户端 TUN 虚拟网卡模式', severity: '常见 (30%)' },
      { symptom: '订阅更新提示超时', probableCause: '订阅分发域名被运营商阻断', quickFix: '挂手机热点更新或用备用链接', permanentSolution: '使用具备动态备用域名的老牌机场', severity: '中等 (15%)' }
    ],
    stepByStepRecovery: `
## 🚀 五步极速自愈 SOP

1. **第一步：校准系统时间**（Windows 打开“设置” -> “时间和语言” -> 点击“立即同步”）；
2. **第二步：彻底重启客户端进程**（任务管理器彻底结束进程后重新以管理员身份运行）；
3. **第三步：更新订阅**（在订阅面板点击刷新，拉取最新可用机房入口）；
4. **第四步：切换 TUN 模式**（绕过本地浏览器的代理端口冲突）；
5. **第五步：切换备用应急节点**（启用星岛梦不限时备用包确认连通性）。
`,
    faqList: [
      { q: '为什么手机能连，电脑连不上？', a: '电脑端更容易遭遇杀毒软件干扰和端口被占，优先在电脑客户端开启 TUN 模式即可解决。' },
      { q: '所有节点 ping 都通，但还是打不开 Google？', a: '说明中转链路正常，但境外落地出口在维护，切换同机场的其他编号节点或联系客服更新。' }
    ]
  },

  'nodes-timeout.md': {
    title: '2026 节点频繁掉线超时成因与长效根治思路',
    description: '深度诊断科学上网频繁断流与每隔几分钟超时痛点：运营商UDP阻断、TCP连接回收机制与长效优化方案。',
    keywords: '节点频繁超时, 翻墙断流解决, 机场老是掉线, TCP连接重置, 光速云',
    tldr: '刚连上好好的，刷一会儿视频突然断流，几秒后又自动恢复，这种“抽风式掉线”是公网中转和劣质机场的典型通病。核心诱因是公网国际海缆在晚高峰的 QoS 随机丢包、或者劣质服务器频繁强制回收长连接端口。根治思路：一是换用纯企业 IEPL 物理专线（如光速云）；二是客户端启用心跳包保持与自动 Fallback 故障迁移。',
    selectedAirportsIds: ['guangsucloud', 'breezenet'],
    symptomAnalysis: `
### 频繁掉线的两大表现特征

- 刷 Twitter 或 TikTok 时图片视频突然卡死，右下角节点延迟飙升至 9999ms，十秒后又恢复；
- 远程 SSH 终端每隔两三分钟就提示 Connection reset by peer。
`,
    rootCauseBreakdown: `
## 🔬 深入协议底层的断流机理

普通公网代理使用的 TCP 连接由于没有专用通道保障，在穿越运营商省际网关时极易被防火墙标记为“可疑长连接”，并主动下发 TCP RST 伪造重置包强制斩断连接。企业专线由于端到端物理封闭传输，完全杜绝了外部 RST 注入。
`,
    troubleshootTableData: [
      { symptom: '每隔几分钟断流一次', probableCause: '公网长连接遭遇 QoS 查杀', quickFix: '客户端开启 TCP KeepAlive', permanentSolution: '升级为全内网 IEPL 专线', severity: '严重影响工作' },
      { symptom: '大流量下载时突然断网', probableCause: '单节点并发连接数超限触发保护', quickFix: '降低多线程下载线程数', permanentSolution: '选用宇宙云/微风网络大管道', severity: '影响下载' }
    ],
    stepByStepRecovery: `
## 🛠️ 客户端防断流调优清单

- 在配置中添加 \`tcp-concurrent: true\` 开启 TCP 并发优化；
- 配置 \`keep-alive-interval: 15\`，每隔 15 秒向服务器发送保活心跳。
`,
    faqList: [
      { q: '换节点能解决断流吗？', a: '如果整个机场走的是劣质公网，换节点依然会断流；只有换到物理隔离的专线服务商才能从根本上解决。' },
      { q: '掉线会导致我的真实 IP 暴露吗？', a: '客户端开启 TUN 模式并配合 Kill-Switch 断网急停功能，可在代理中断时瞬间掐断网络，保护真实 IP 不外泄。' }
    ]
  },

  'speed-slow.md': {
    title: '2026 为什么测速几百兆看视频却转圈？网速卡顿终极诊断指南',
    description: '深度解密“测速很快但实际很卡”的悖论：单线程与多线程差异、单流限速、高丢包对视频缓冲的致命破坏。',
    keywords: '为什么翻墙测速快看视频卡, 机场网速慢排查, 油管转圈解决, 4K视频卡顿, 微风网络',
    tldr: '很多用户感到极度困惑：为什么在 Speedtest 测速能跑 300Mbps，但打开 YouTube 看 4K 却疯狂转圈？原因在于：Speedtest 采用数十个并发线程将机房碎带宽拼接起来，制造了虚假的峰值假象；而实际观看视频、下载网页使用的是单一 TCP 长连接。如果节点存在单流限速或 1% 丢包，单流速度会瞬间跌至 5Mbps 以下。',
    selectedAirportsIds: ['breezenet', 'yuzhouyun', 'guangsucloud'],
    symptomAnalysis: `
### 测速假象与实际体验落差

- Speedtest 测速图：下行 350Mbps（绿油油一片）；
- YouTube 详细统计：Connection Speed 仅有 3,200Kbps，画质自动退化到 480P。
`,
    rootCauseBreakdown: `
## 🔬 丢包率对 TCP 吞吐的毁灭性数学打击

根据数学上的 Mathis 吞吐量公式，TCP 连接的最大吞吐量与丢包率的平方根成反比。即使带宽有 1000Mbps，只要存在 2% 的丢包，单流吞吐量就无法超过 15Mbps。这就是为什么 0.0% 零丢包专线能秒开 4K，而廉价高丢包中转看视频必卡死的根本物理原因。
`,
    troubleshootTableData: [
      { symptom: '测速快但看视频慢', probableCause: '高丢包压制 TCP 单流 / 服务端单流限速', quickFix: '切换至单线程性能优异的专线', permanentSolution: '选购微风网络/光速云高冗余专线', severity: '体验极其割裂' },
      { symptom: '网页加载延迟长达数秒', probableCause: 'DNS 解析超时或本地递归解析缓慢', quickFix: '开启 Fake-IP 模式', permanentSolution: '配置远端公共 DoH', severity: '高频影响' }
    ],
    stepByStepRecovery: `
## ⚡ 终结转圈的优化实操

1. 打开 YouTube 视频右键查看真实 Connection Speed；
2. 切换至微风网络或宇宙云带有“大带宽”标识的节点；
3. 观察连接速度瞬间飙升至 150,000Kbps 以上，卡顿立即解除。
`,
    faqList: [
      { q: '怎么测真实的单线程速度？', a: '在 YouTube 播放 4K 视频查看统计数据，或者使用专门的单线程测速脚本。' },
      { q: '家里 Wi-Fi 信号差会拖慢速度吗？', a: '会。穿墙后的 2.4G Wi-Fi 本身延迟波动极大，看 4K 务必使用 5G Wi-Fi 或网线直连。' }
    ]
  },

  'high-latency.md': {
    title: '2026 节点延迟突然从几十ms飙升到几百ms排障手记',
    description: '深度排查科学上网延迟突增与跳Ping问题：路由绕路、跨网结算阻塞、本地网络拥堵与解决方案。',
    keywords: '节点延迟突然变高, 翻墙延迟高解决, 机场跳ping排查, 节点绕路排查, 光速云',
    tldr: '平时 30ms 的香港节点突然飙升到 300ms，往往是因为：机场入口机房发生故障触发了劣质备用公网路由、本地网络发生跨省绕路、或者晚高峰本地骨干网严重拥堵。排查核心手段是通过 mtr 工具进行全路径路由追踪，找出具体在哪一跳发生延迟剧增。',
    selectedAirportsIds: ['guangsucloud', 'speedworld'],
    symptomAnalysis: `
### 延迟暴涨的三大常见表象

- 香港节点从 35ms 变成 280ms（典型绕美路由）；
- 日本节点从 40ms 变成 350ms；
- 游戏对局中频繁出现延迟红色告警。
`,
    rootCauseBreakdown: `
## 🌐 路由绕路 (BGP Sub-optimal Routing)

当主用跨境光缆割接时，低端机场为了省钱，会将流量重定向到走太平洋绕行美国再回到香港的廉价公网，物理距离暴增导致延迟翻倍。
`,
    troubleshootTableData: [
      { symptom: '延迟从30ms变280ms', probableCause: '机房主光缆断开，走绕美公网备份', quickFix: '切换至同机场日本或新加坡专线', permanentSolution: '选用具备多路物理光缆备份的老牌大厂', severity: '严重' },
      { symptom: '游戏内频繁跳 Ping', probableCause: '本地 Wi-Fi 丢包或同网大流量下载', quickFix: '改用有线网卡连接', permanentSolution: '在路由器配置 QoS 优先保障游戏包', severity: '影响竞技' }
    ],
    stepByStepRecovery: `
## 🛠️ 排障执行方案

1. 使用 \`ping\` 命令探测本地到网关延迟（排查本地 Wi-Fi）；
2. 使用 \`traceroute\` 追踪入口延迟；
3. 切换至具备真专线保障的光速云主力节点。
`,
    faqList: [
      { q: '延迟高看网页会慢吗？', a: '会略有感知，但对看长视频影响有限，受影响最大的是外服网游和网页首屏加载。' },
      { q: '为什么有时候测速延迟是负数或 0ms？', a: '这是客户端本地 Fake-IP 欺骗导致的异常读数，刷新客户端即可恢复。' }
    ]
  },

  'packet-loss.md': {
    title: '2026 晚高峰丢包严重的原因与客户端抗丢包调优实战',
    description: '针对国际网络晚高峰丢包率居高不下的深度技术拆解：公网QoS机制、专线信道隔离与客户端参数调优。',
    keywords: '晚高峰丢包严重, 翻墙丢包率高, 减少网络丢包, 抗丢包协议, 宇宙云',
    tldr: '丢包是网络卡顿与降速的万恶之源。在晚高峰 20:30 到 22:30，公网国际海缆常态化处于过载状态，三大运营商路由器实施主动丢包策略。对抗丢包的唯一根本解：在传输层使用物理隔离的 IEPL 专线，使数据完全不与民用公网争抢出口；在应用层配置合理的滑动窗口与轻量重传机制。',
    selectedAirportsIds: ['guangsucloud', 'yuzhouyun'],
    symptomAnalysis: `
### 丢包的直接后果

- 语音通话断断续续或吞字；
- 远程桌面和终端操作极其卡顿；
- 网页需要反复刷新才能加载完整。
`,
    rootCauseBreakdown: `
## 🔬 丢包率与物理线路的直接对应关系

- **民用公网直连**：晚高峰丢包率通常在 20% - 40%；
- **单线公网中转**：晚高峰丢包率在 8% - 18%；
- **全内网 IEPL 专线**：全天 24 小时丢包率恒定在 0.0% - 0.2%。
`,
    troubleshootTableData: [
      { symptom: '长 Ping 丢包率 > 15%', probableCause: '公网海缆出口过载 QoS 丢弃', quickFix: '在非高峰时段使用', permanentSolution: '升级至光速云/宇宙云纯 IEPL 专线', severity: '致命影响' }
    ],
    stepByStepRecovery: `
## 🛠️ 调优实战

选择纯内网专线节点 -> 禁用激进暴力发包 -> 启用标准 BBR 算法，实现全天候极速零丢包。
`,
    faqList: [
      { q: '丢包能通过多开线程解决吗？', a: '不能，多线程反而会进一步加剧公网拥堵导致更严重的丢包。' },
      { q: '专线真的能做到 0% 丢包吗？', a: '在机房未发生硬件故障的前提下，企业级专用以太网二层光纤确实能做到全天候 0 丢包。' }
    ]
  },

  'clash-start-error.md': {
    title: '2026 Clash 启动报错（Port in use / Core error）速修全解指南',
    description: '全面排查Clash客户端无法启动的常见系统报错：7890端口冲突、TUN网卡安装失败、内核闪退与配置文件语法错误。',
    keywords: 'Clash启动报错, Clash端口被占用, Port in use解决, Clash打不开, Clash Verge修复',
    tldr: 'Clash 客户端启动失败通常集中在两大原因：一是默认的 7890 或 7897 本地代理端口被其他后台软件冲突抢占（报错 Port 7890 in use）；二是配置文件存在 YAML 缩进语法错误导致内核闪退。解决非常简单：在设置中将混合代理端口改成随机数字（如 17890），或重置并重新导入标准订阅。',
    selectedAirportsIds: ['feimaoyun', 'guangsucloud'],
    symptomAnalysis: `
### 启动报错的三种典型提示

- \`listen tcp 127.0.0.1:7890: bind: address already in use\`；
- \`Start Core Failed\`；
- 点击启动后系统代理开关瞬间自动弹回关闭状态。
`,
    rootCauseBreakdown: `
## 💻 端口抢占排查方法

在 Windows 命令提示符运行：
\`\`\`cmd
netstat -ano | findstr "7890"
\`\`\`
查看是哪个 PID 进程占用了端口并在任务管理器中将其终止。
`,
    troubleshootTableData: [
      { symptom: 'Port in use 报错', probableCause: '7890 端口被冲突占用', quickFix: '设置中修改端口为 17890', permanentSolution: '开启 TUN 模式无需依赖固定端口', severity: '极高频' },
      { symptom: 'Start Core Failed', probableCause: '配置文件语法损坏', quickFix: '删除配置并重新下载订阅', permanentSolution: '认准提供规范订阅的大厂', severity: '常见' }
    ],
    stepByStepRecovery: `
## 🚀 一分钟排障速通

修改端口为 17890 -> 重新导入订阅 -> 开启系统代理，轻松恢复运行。
`,
    faqList: [
      { q: '为什么电脑重启后端口又被占了？', a: '部分开机自启软件抢先占用了 7890 端口，将 Clash 端口永久改为偏僻的高位端口（如 35890）即可一劳永逸。' },
      { q: '内核升级后打不开了怎么降级？', a: '在 Clash Verge 设置的内核管理中，可以随时点击切换回稳定版内核。' }
    ]
  },

  'chatgpt-region-error.md': {
    title: '2026 彻底解决 ChatGPT Access Denied 与地区不支持报错指南',
    description: '2026年最新ChatGPT无法访问报错终极解决方案：解析Cloudflare 1020拦截、地区不支持原因与高纯净原生节点配置。',
    keywords: 'ChatGPT打不开, ChatGPT地区不支持, Access Denied解决, ChatGPT无法访问, 飞猫云',
    tldr: '打开 ChatGPT 页面提示 Access Denied 或 Not available in your region，根本原因在于当前节点的出口 IP 被 Cloudflare 安全防护系统标记为高风险或机房代理。彻底解决只需三步：更换带有“AI”或“原生双 ISP”标识的纯净专线节点（如飞猫云）、清除浏览器历史 Cookie 缓存、并在无痕模式下重新登录。',
    selectedAirportsIds: ['feimaoyun', 'guangsucloud'],
    symptomAnalysis: `
### 常见的报错特征代码

- Error 1020: Access Denied；
- OpenAI's services are not available in your country；
- 无限循环点击验证码图片。
`,
    rootCauseBreakdown: `
## 🤖 OpenAI 地区策略硬性限制

OpenAI 不支持中国大陆与香港地区 IP 直接访问。因此只要你的流量从香港节点漏出、或者被机房代理标记，就会立即触发阻断。
`,
    troubleshootTableData: [
      { symptom: 'Access Denied 报错', probableCause: 'IP 欺诈评分过高触发防火墙', quickFix: '切换飞猫云原生双 ISP 节点', permanentSolution: '固定使用高纯净专线', severity: '极高频' },
      { symptom: 'Region not supported', probableCause: '使用了香港或未开放国家节点', quickFix: '切换至日本东京或美西专线', permanentSolution: '配置分流规则强制走美日出口', severity: '高频' }
    ],
    stepByStepRecovery: `
## 🛠️ 解决三步法

1. 客户端切换为美西原生节点；
2. 清除浏览器 \`openai.com\` 全部站点数据；
3. 打开无痕窗口重新登录，秒进对话界面。
`,
    faqList: [
      { q: '为什么同一个节点昨天能用今天就不行了？', a: 'OpenAI 动态更新了黑名单，在客户端刷新订阅或切换备用 AI 节点即可。' },
      { q: 'Plus 会员也会被拦截吗？', a: '会，前端防火墙拦截先于账号身份验证生效，必须保障节点 IP 洁净。' }
    ]
  },

  'claude-forbidden.md': {
    title: '2026 彻底根除 Claude 403 Forbidden 与账号封禁风控排查手册',
    description: '针对Anthropic旗下Claude最严苛风控的深度排障手册：彻底消除403 Forbidden、手机号封禁，提供零风控专线环境配置方案。',
    keywords: 'Claude 403 Forbidden, Claude无法访问, Claude封号解决, Claude抗风控, 光速云',
    tldr: '访问 Claude 出现 403 Forbidden 是全网最令人头疼的故障之一。Anthropic 对数据中心 IP 的态度是零容忍，只要检测到批量机房段直接返回 403。要彻底解决 403 报错：必须使用光速云或飞猫云专属的原生住宅双 ISP 落地节点、屏蔽本地 WebRTC 泄漏、并使用干净的海外真实环境登录。',
    selectedAirportsIds: ['guangsucloud', 'feimaoyun'],
    symptomAnalysis: `
### 403 报错的致命性

一旦出现 403，说明当前 IP 整个 C 段已经被 Anthropic 防火墙拉黑，继续尝试刷新不仅无法进入，还会导致当前登录的账号被系统直接标记封号。
`,
    rootCauseBreakdown: `
## 🔬 避免 403 爆发的核心前提

1. 立即停止使用公共廉价机场访问 Claude；
2. 切换至带有“Claude 原生”认证的专属专线节点；
3. 保持单号固定单一节点，严禁频繁换节点。
`,
    troubleshootTableData: [
      { symptom: '403 Forbidden 页面', probableCause: 'IP 属于机房托管商直接被阻断', quickFix: '立即断开，切换光速云专属原生节点', permanentSolution: '使用具备原生住宅 IP 的服务商', severity: '极严重' }
    ],
    stepByStepRecovery: `
## 🛡️ 规避风控标准操作流程

安装独立 Chrome 浏览器 -> 启用 WebRTC Control 禁用泄漏 -> 连接光速云专属节点 -> 登录 Claude。
`,
    faqList: [
      { q: '被 403 后账号还能救回来吗？', a: '只要没有收到账号被禁（Suspended）邮件，换上干净原生节点依然可以正常登录。' },
      { q: '用专线机场使用 Claude Pro 安全吗？', a: '选用光速云独立纯净节点，账号安全度最高。' }
    ]
  },

  'google-recaptcha.md': {
    title: '2026 Google 频繁弹出人机验证（reCAPTCHA）终极破解指南',
    description: '彻底解决Google搜索老是弹出人机验证、点九宫格验证码痛点：深度分析IP滥用惩罚机制，精选免验证纯净专线。',
    keywords: 'Google频繁人机验证, reCAPTCHA怎么解决, 谷歌弹验证码, 纯净IP机场, SOGO云',
    tldr: '每次在 Google 搜索都要先点击几轮“消防栓、公交车、红绿灯”九宫格验证码，这是由于当前机场节点的出口 IP 有大量用户或自动化爬虫在频繁发包，触发了 Google 的防刷安全评分惩罚。彻底摆脱人机验证的终极解法：选择用户密度克制、拥有大量纯净原生 IP 的精品机场（如 SOGO云、光速云），享受零验证码丝滑搜索。',
    selectedAirportsIds: ['sogoyun', 'guangsucloud', 'feimaoyun'],
    symptomAnalysis: `
### 验证码弹出的底层逻辑

Google 对每个公网 IP 建立实时信誉评分。信誉分低的 IP 会被强制定向到 \`google.com/sorry/index\`，强制要求完成图形人机验证。
`,
    rootCauseBreakdown: `
## 🔍 为什么大机场更容易弹验证码？

大机场一个出口节点挂着数千名用户，有人在用脚本爬取数据，整个 IP 的所有邻居用户都会被系统连坐惩罚。
`,
    troubleshootTableData: [
      { symptom: '频繁弹九宫格验证码', probableCause: '出口 IP 邻居用户滥用导致信誉分下降', quickFix: '切换同地区人少的备用编号节点', permanentSolution: '选用 SOGO云/光速云高纯净专线', severity: '极度恼人' }
    ],
    stepByStepRecovery: `
## 🛠️ 三招彻底告别验证码

- 换用小众高口碑精品专线（如 SOGO云，优惠码 \`sss777\`）；
- 登录自己的 Google 账户进行搜索（提升会话信任度）；
- 使用隐私无痕窗口避免历史不良 Cookie 连带影响。
`,
    faqList: [
      { q: '弹验证码是电脑中病毒了吗？', a: '不是，纯粹是当前节点出口 IP 的网络信誉评分过低引起的。' },
      { q: '换节点能立刻消除验证码吗？', a: '只要切换到一个纯净未被滥用的节点，立刻恢复免验证搜索。' }
    ]
  },

  'ip-blocked.md': {
    title: '2026 为什么机场节点经常需要更新？IP 被封原理与防封自愈机制',
    description: '深度揭秘科学上网 IP 为什么会被封锁：GFW 动态主动探测、端口阻断与成熟老牌机场自动化自愈更换机制。',
    keywords: '机场节点被封原理, 为什么节点总更新, IP被墙机制, 机场自愈系统, 光速云',
    tldr: '很多新手好奇：为什么隔一段时间机场就会通知更新节点？因为在公网环境中，防火墙通过 DPI 流量分析与主动探测算法，会定期识别并阻断未加密或特征明显的代理出口 IP。正规老牌机场拥有成熟的自动化运维自愈系统，一旦检测到某 IP 被阻断，后台自动化脚本在数分钟内自动更换新 IP 并通过订阅下发，用户只需点击更新即可恢复畅通。',
    selectedAirportsIds: ['guangsucloud', 'xingdaomeng'],
    symptomAnalysis: `
### IP 被封的具体技术现象

- 节点 Ping 依然能通，但 TCP 握手无法完成（端口阻断）；
- 节点彻底无法连接，路由在进入境内骨干网末端后直接中断（IP 阻断）。
`,
    rootCauseBreakdown: `
## 🛡️ 企业内网 IEPL 专线的天然免封属性

真正的企业级 IEPL 专线由于端到端物理以太网传输，完全不走民用公网国际出口海缆，防火墙根本无法从公网触碰到专线出口，因此专线具备极其强大的物理级抗封锁能力。
`,
    troubleshootTableData: [
      { symptom: '个别节点突发超时', probableCause: '落地 IP 被公网防火墙临时阻断', quickFix: '在客户端点击更新订阅获取新 IP', permanentSolution: '选用纯 IEPL 物理专线机场', severity: '周期性出现' }
    ],
    stepByStepRecovery: `
## 🔄 应对 IP 轮换的标准操作

遇到连不上时 -> 打开客户端订阅列表 -> 点击“更新”拉取最新 IP -> 恢复全速上网。
`,
    faqList: [
      { q: '专线机场的入口域名会被封吗？', a: '机房入口采用多地 BGP 动态域名与高防 CDN 保护，即使个别入口受阻，系统会自动将流量引流至备用入口。' },
      { q: '更新订阅需要重新购买吗？', a: '不需要，只要套餐在有效期内，更新订阅完全免费。' }
    ]
  },

  'dns-leak.md': {
    title: '2026 DNS 泄漏排查与加密 DoH 防污染终极配置实战',
    description: '彻底杜绝科学上网 DNS 泄漏隐患：科普 DNS 污染原理，实测 dnsleaktest，提供 Fake-IP 与 DoH 终极防泄漏方案。',
    keywords: 'DNS泄漏排查, 解决DNS污染, DoH加密配置, Fake-IP设置, 科学上网隐私防护',
    tldr: '很多用户自以为挂了代理就万事大吉，却不知道自己的真实域名访问记录正在被本地运营商的 LocalDNS 实时明文记录并污染，这就是严重的「DNS 泄漏」。彻底解决 DNS 泄漏只需配置好客户端的 Fake-IP (TUN 模式) 并接入远端加密 DoH (DNS over HTTPS)。所有域名解析在境外专线机房内部安全完成，本地运营商只能看到一堆不可解密的字符。',
    selectedAirportsIds: ['guangsucloud', 'feimaoyun'],
    symptomAnalysis: `
### DNS 泄漏的两大恶果

1. **隐私完全裸奔**：本地宽带运营商知道你访问了哪个海外网站；
2. **连接被恶意投毒**：解析返回虚假 IP 导致网页打不开或报证书错误。
`,
    rootCauseBreakdown: `
## 🔍 自测是否存在 DNS 泄漏的方法

连上代理后，打开 **dnsleaktest.com** 并运行 Standard Test：
- 如果测试结果中出现了你本地宽带（如 China Telecom / China Unicom）的 DNS 服务器，说明存在严重 DNS 泄漏；
- 如果结果仅显示香港、日本或 Cloudflare 的境外 DNS，说明防护固若金汤。
`,
    troubleshootTableData: [
      { symptom: '测试显示中国电信 DNS', probableCause: '客户端未接管本地系统 DNS 解析', quickFix: '在客户端开启 Fake-IP 模式', permanentSolution: '部署 DoH 加密上游解析', severity: '严重隐私隐患' }
    ],
    stepByStepRecovery: `
## 🛡️ 客户端终极防泄漏配置四步法

1. 打开 Clash Verge Rev 的设置；
2. 将 DNS 模式由 Redir-Host 改为 **Fake-IP**；
3. 将上游 DNS 设置为 \`https://1.1.1.1/dns-query\`；
4. 重新测试，享受 100% 纯净防泄漏网络。
`,
    faqList: [
      { q: '开启 Fake-IP 会影响国内网站速度吗？', a: '不会，国内知名域名走本地直连分流规则，完全不增加任何解析延迟。' },
      { q: '什么是 DoH？', a: 'DoH (DNS over HTTPS) 是通过加密的 HTTPS 协议传输域名查询请求，杜绝任何中间人监听与篡改。' }
    ]
  }
};

const baseDir = path.resolve('src/troubleshooting');

for (const [filename, item] of Object.entries(troubleshootingDeepArticles)) {
  const slug = filename.replace(/\.md$/, '');
  const canonicalUrl = 'https://jichangtuijian.run/troubleshooting/' + slug;
  const filePath = path.join(baseDir, filename);

  const selectedListStr = JSON.stringify(item.selectedAirportsIds);

  const tableRows = item.troubleshootTableData.map(r => 
    `| **${r.symptom}** | ${r.probableCause} | ${r.quickFix} | **${r.permanentSolution}** | ${r.severity} |`
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

> **【排障诊断核心速览与自愈结论】**：${item.tldr}

---

## 🏆 推荐替换的高可用稳定专线服务商

<div v-for="item in displayAirports" :key="item.id" class="my-4">
  <AirportCard :airport="item" />
</div>

---

${item.symptomAnalysis}

---

## 📊 常见网络报错症状与速查排除总表

| 具体故障症状表现 | 最核心诱发根因 | 一分钟临时应急速修 | 终极彻底根治方案 | 发生频率与严重度 |
| :--- | :--- | :--- | :--- | :--- |
${tableRows}

---

${item.rootCauseBreakdown}

---

${item.stepByStepRecovery}

---

## ❓ 常见疑难排障问答 FAQ

${faqMarkdown}

---

<TopicCluster title="${item.title.split('：')[0]}" />
`;

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Successfully upgraded ' + filename + ': ' + content.length + ' chars, ' + content.split('\n').length + ' lines');
}

console.log('All 11 troubleshooting articles upgraded to deep comprehensive standard!');
