import fs from 'node:fs';
import path from 'node:path';
import { topicClusters } from '../src/data/navigation.ts';

const SRC_DIR = path.resolve('src');

function getCategoryAdvice(clusterId: string, subTitle: string, keyword: string): string {
  switch (clusterId) {
    case 'recommend':
      return `针对【${subTitle}】，用户在 2026 年选购时最关键的指标是**晚高峰抗拥堵能力与线路 SLA 可用性**。建议优先选择拥有企业级 IEPL 专线的服务商，拒绝无保障的低端公网直连。`;
    case 'ranking':
      return `在【${subTitle}】维度上，本站基于 30 天 24 小时不间断自动化测速脚本，重点评估各服务商在黄金拥堵时段的丢包率、延迟抖动与带宽吞吐上限。`;
    case 'brands':
      return `针对【${subTitle}】，本文提供该品牌的全面信用档案。包含运营历史、团队背景、线路架构、免翻墙备用官网镜像、优惠码及跑路风险监测。`;
    case 'reviews':
      return `本篇针对【${subTitle}】进行全维度的实机实测拆解，覆盖套餐性价比、高峰期网络表现、流媒体 4K 秒开率与 Claude/ChatGPT 原生住宅 IP 解锁测试。`;
    case 'compare':
      return `在【${subTitle}】对比分析中，我们从协议支持、国际海缆专线、晚高峰延迟波动以及售后工单响应速度等硬核维度进行深度剖析。`;
    case 'pricing':
      return `针对【${subTitle}】，我们深入分析该价位档的成本模型与超卖比。帮助你在控制预算的同时，避开“低价年付吸资后跑路”的行业陷阱。`;
    case 'lines':
      return `【${subTitle}】属于科学上网的核心底层架构。不同的传输协议与光纤专线（如 IEPL、IPLC、BGP）对网络抗封锁与跨国延迟有着决定性影响。`;
    case 'use-cases':
      return `针对【${subTitle}】场景，主流海外平台对机房 IP 实施了严密的威胁情报风控。必须配备纯净的原生住宅 IP 才能保证零验证码与长效稳定。`;
    case 'benchmarks':
      return `【${subTitle}】数据来源于千兆家用光纤环境下的连续抽样测试，展示真实的测速中位数与丢包雷达，拒绝纸面理论峰值。`;
    case 'clients':
      return `针对【${subTitle}】，本文提供最新稳定版的官方下载渠道、跨平台安装配置教程与订阅链接一键导入分流策略指南。`;
    case 'guides':
      return `【${subTitle}】是为新手用户量身打造的科普与实操手册，化繁为简，助你在 5 分钟内搞懂核心概念并顺畅连通网络。`;
    case 'troubleshooting':
      return `遇到【${subTitle}】问题时无需慌张，通常由于本地时间偏差、规则分流失效或服务商入口维护引起。请按照本文 5 步排障法快速定位修复。`;
    case 'unlock':
      return `针对【${subTitle}】，重点解决地区报错（Region Not Supported）、人机验证死循环与画质降级问题，推荐适配的极速原生节点。`;
    case 'intel':
      return `【${subTitle}】属于本站风险情报监控体系。持续追踪行业异常动态、域名失效与服务商运营健康度，守护你的财产与账号安全。`;
    default:
      return `本文为你详细解读【${subTitle}】的核心要点、实机表现与选购建议。`;
  }
}

function generateMarkdownContent(cluster: (typeof topicClusters)[0], sub: (typeof topicClusters)[0]['subTopics'][0]): string {
  const advice = getCategoryAdvice(cluster.id, sub.title, sub.keyword);

  return `---
title: ${sub.title} (2026权威指南)
description: 2026年最新${sub.keyword}指南：深度解析${sub.title}，结合晚高峰实测数据、线路架构与价格套餐，提供专业选购与避坑指引。
head:
  - - meta
    - name: keywords
      content: ${sub.keyword}, ${cluster.keywords.join(', ')}
---

<script setup>
import { airportsData } from '../data/airports';
const featuredList = airportsData.filter(a => a.featured && a.status === 'active');
</script>

# ${sub.title}

在 2026 年的科学上网与网络加速环境中，**${sub.keyword}** 是广大用户非常关注的核心主题。随着国际网络环境与各大海外服务风控规则的持续更新，掌握准确客观的信息至关重要。

---

## 📌 核心要点与背景剖析

${advice}

### 💡 2026 年的三大核心考量原则：
1. **优先保障线路品质**：不管是专线还是中转，核心看晚高峰（20:00-23:00）的实测丢包率与稳定性；
2. **拒绝超大额年付陷阱**：除非是运营 5 年以上的大牌服务商，否则新机场坚持按月付费；
3. **重视 IP 纯净度**：若用于 ChatGPT、Claude 或流媒体，必须选择配备住宅原生 IP 的优质节点。

---

## 🏆 2026 推荐服务商梯队与参数参考

以下为通过本站 30 天连续网络监控的核心精选服务商列表：

<CompareTable />

---

## 🛠️ 实操建议与使用指引

1. **客户端适配**：推荐使用新一代基于 Mihomo 内核的客户端（如 [Clash Verge Rev](/clients/clash-verge) 或 [Shadowrocket](/clients/shadowrocket)）；
2. **规则分流**：开启“规则模式 (Rule)”，让国内流量直连、海外流量走专线代理，节省流量并降低延迟；
3. **遇到故障自查**：若遇到节点红叹号或超时，请参考本站排障专栏：[节点全部超时排查指南](/troubleshooting/connection-failed)。

---

## ❓ 常见问题解答 FAQ

### Q1：为什么同一家机场在不同网络下速度差异很大？
国内不同宽带运营商（电信、联通、移动）的出海骨干网路由各不相同。优质机场通常采用 **三网 BGP 入口智能就近调度**，确保无论你是电信还是移动，都能自动接入最优中转节点。

### Q2：使用该专栏推荐的服务需要注意什么？
请遵守当地法律法规，文明合规使用网络加速服务，切勿将节点用于违法违规用途。

<TopicCluster title="${sub.title}" />
`;
}

let generatedCount = 0;
let skippedCount = 0;

for (const cluster of topicClusters) {
  for (const sub of cluster.subTopics) {
    const targetFile = path.join(SRC_DIR, `${sub.path.replace(/^\//, '')}.md`);
    const targetDir = path.dirname(targetFile);

    if (fs.existsSync(targetFile)) {
      skippedCount++;
      continue;
    }

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const content = generateMarkdownContent(cluster, sub);
    fs.writeFileSync(targetFile, content, 'utf-8');
    generatedCount++;
    console.log(`[Generated] ${sub.path}.md`);
  }
}

console.log(`\n========================================`);
console.log(`✅ 专题页面生成完成！`);
console.log(`- 成功新增页面: ${generatedCount} 篇`);
console.log(`- 跳过已存在精写页面: ${skippedCount} 篇`);
console.log(`- 全站总覆盖专题: ${generatedCount + skippedCount} 篇`);
console.log(`========================================\n`);
