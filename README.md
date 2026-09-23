<div align="center">

# 🌐 机场推荐网 (jichangtuijian.run)

**2026 专业机场推荐 · 企业级 IEPL 物理专线实测 · 科学上网知识图谱**

[![Official Website](https://img.shields.io/badge/Official%20Site-jichangtuijian.run-amber?style=for-the-badge&logo=google-chrome&logoColor=white)](https://jichangtuijian.run)
[![VitePress](https://img.shields.io/badge/VitePress-1.6.4-emerald?style=for-the-badge&logo=vite&logoColor=white)](https://vitepress.dev/)
[![Vue 3](https://img.shields.io/badge/Vue-3.5-green?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Pagefind](https://img.shields.io/badge/Search-Pagefind%201.5-orange?style=for-the-badge&logo=speedtest&logoColor=white)](https://pagefind.app/)
[![SEO Health](https://img.shields.io/badge/SEO%20Health-100%25%20PASS-blue?style=for-the-badge&logo=google&logoColor=white)](https://jichangtuijian.run)
[![License](https://img.shields.io/badge/License-ISC-stone?style=for-the-badge)](LICENSE)

<br />

[⚡ 访问官网主站](https://jichangtuijian.run) · [🧮 智能选机计算器](https://jichangtuijian.run/tools/calculator) · [📊 核心横评大盘](https://jichangtuijian.run/compare/) · [🛡️ 跑路风险情报](https://jichangtuijian.run/intel/warning-signs)

</div>

---

## 📖 项目简介与定位

**机场推荐网（jichangtuijian.run）** 是一套专注于 **2026 年科学上网生态、企业级物理专线实测与避坑决策** 的现代化静态内容知识库。

拒绝浮夸营销与虚假测速截图。本项目基于网络工程实测原则，针对 **19 家活跃服务商** 展开 30 天 24 小时连续晚高峰抗丢包压测，深入解析三大电信运营商骨干网路由（电信 163/CN2、联通 169/9929、移动 CMI/CMIN2），涵盖 **14 大核心主题集群**、**123 篇二级长文矩阵** 与 **43.8 万字原创技术内容**。

---

## ✨ 核心特色功能

### 1. 🧮 全网独家交互式选机计算器 (`/tools/calculator`)
- **纯前端实时运算**：免登录、无广告、毫秒级响应；
- **4 维立体模型**：宽带运营商（电信/移动/联通/校园网）、每日流媒体时长与画质（1080P/4K/8K）、AI 与代码工具频次（ChatGPT/Claude/Cursor）、预算周期偏好；
- **量身智能输出**：精确计算月度流量建议（如 `85 ~ 110 GB / 月`），分析运营商出口特性，直接匹配最优服务商与专属优惠券。

### 2. 🏆 19 家真实服务商深度横评与性能天梯
- **旗舰物理专线**：[光速云](/reviews/guangsucloud)（全物理 IEPL、低抖动、原生住宅 IP、AI 全解锁）；
- **高端多协议抗封**：[飞猫云](/reviews/feimaoyun)（多协议冗余、全平台一键适配）；
- **亲民性价比中端**：[微风网络](/reviews/breezenet)（内网中转、大带宽低门槛）；
- **常备保命生命线**：[星岛梦](/reviews/xingdaomeng)（按量计费、永不过期不限时流量包）；
- **横向数据对比大盘**：价格梯度、SLA 保证、流媒体与 ChatGPT 原生解锁支持一览无遗。

### 3. 🛡️ 发布自动化 SEO 安全门禁 (`npm run seo:check`)
- **防掉索引硬性拦截**：本地 Build 自动运行 11 维度的健康检查；
- **核心检测项**：Robots 误杀阻断、全站 Noindex 异常扫描、Canonical 规范自引用核验、Sitemap 数量波动熔断、内部死链与空链接爬虫、防黑防博彩注入检测；
- **IndexNow 自动推送**：每次发布通过 `npm run indexnow` 即时通知 Bing 及全球搜索引擎优先索引。

### 4. 🔍 全文离线毫秒级搜索 (Pagefind)
- 内置 WebAssembly 驱动的 Pagefind 搜索引擎；
- 索引全站 209 个公开页面与 6,380+ 词条，支持拼音、关键词与模糊匹配。

---

## 🗂️ 14 大核心专题内容矩阵架构

```text
src/
├── recommend/       # 01 机场推荐 (综合首选、稳定防掉、平价、新手、老牌、高端等 13 篇)
├── ranking/         # 02 机场排行 (综合实力、晚高峰抗拥堵、99.9% SLA、速度天梯等 10 篇)
├── brands/          # 03 机场品牌库 (19 家服务商独立品牌技术档案)
├── reviews/         # 04 深度评测 (19 篇万字级实机网络长测与路由跳数实录)
├── compare/         # 05 机场对比 (三强头对头对比、专线 vs 中转、月付 vs 年付等 11 篇)
├── pricing/         # 06 价格套餐 (10元以下、15元档、大流量、不限时按量等 10 篇)
├── lines/           # 07 线路节点 (IEPL/IPLC 原理、BGP 智能接入、CN2 GIA、CMI等 10 篇)
├── use-cases/       # 08 用途推荐 (ChatGPT、Claude、Cursor、Netflix、外贸等 10 篇)
├── benchmarks/      # 09 实测中心 (30天丢包监控、晚高峰实测、流媒体解锁测试等 8 篇)
├── clients/         # 10 客户端下载 (Clash Verge Rev、Sing-box、Shadowrocket等 10 篇)
├── guides/          # 11 教程中心 (新手白皮书、订阅导入更新、分流规则配置等 10 篇)
├── troubleshooting/ # 12 网络排障 (节点全部超时、断流、ChatGPT 报错等 11 篇)
├── unlock/          # 13 AI与流媒体 (海外流媒体与大模型解锁配置手册 10 篇)
├── intel/           # 14 风险情报 (跑路前兆雷达、资金安全防坑、海缆波动等 10 篇)
└── tools/           # 🧮 实用工具箱 (智能流量测算与选机匹配推荐器)
```

---

## 🛠️ 本地开发与构建

### 1. 克隆代码仓库
```bash
git clone https://github.com/sksksk98698-source/jichangtuijian.run.git
cd jichangtuijian.run
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动本地开发预览
```bash
npm run dev
# 本地服务将监听在 http://localhost:5173/
```

### 4. 生产环境构建与 SEO 门禁检测
```bash
npm run build
```
> 执行流程：
> 1. `npm run generate:rss`：自动生成全站 162 篇条目的 `rss.xml`；
> 2. `vitepress build src`：全量静态预渲染 210 个 HTML 页面；
> 3. `pagefind --site src/.vitepress/dist`：自动构建全文检索索引；
> 4. `npm run seo:check`：自动执行 11 维度 SEO 门禁检查，若存在死链或 noindex 错误将自动中断发布。

### 5. 即时推送更新至搜索引擎 (IndexNow)
```bash
npm run indexnow
```

---

## 📊 技术栈

| 层次 | 选型与工具 |
| :--- | :--- |
| **SSG 静态生成** | VitePress 1.6.4 + Vue 3.5 |
| **样式与交互** | Tailwind CSS 3.4 + 自研奶白极简设计系统 |
| **本地全文检索** | Pagefind 1.5.2 (Wasm) |
| **结构化数据** | Schema.org (Organization, WebSite, Product, Review, Article, FAQPage, WebApplication) |
| **SEO 基础设施** | 动态 Canonical、自动 Sitemap、Robots 隔离、RSS 2.0、IndexNow API |
| **部署环境** | Apache 静态托管 (`.htaccess` 301 裸域规范化 + Clean URLs + Gzip) |

---

## 📜 商业道德与免责声明

1. 本站坚持**实机网络测速与客观数据评估**，所有上榜品牌均经过严格长测筛选；
2. 倡导“月付保平安”原则，坚决抵制无技术实力的劣质超卖跑路平台；
3. 本项目为开源静态知识库，请遵守当地法律法规，文明合规使用网络加速服务，严禁用于任何非法违规用途。

---

<div align="center">
  <sub>Copyright © 2026 <a href="https://jichangtuijian.run">jichangtuijian.run</a> · 机场推荐. All Rights Reserved.</sub>
</div>
