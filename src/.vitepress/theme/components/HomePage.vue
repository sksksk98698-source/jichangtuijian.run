<template>
  <div class="home-wrapper">
    <!-- 顶部主标题英雄区 Hero -->
    <header class="hero-box">
      <div class="hero-badge">
        <span class="badge-dot"></span>
        <span>2026年度实测更新 · 99.9% 晚高峰连续压测基准</span>
      </div>
      
      <h1 class="hero-title">
        2026 稳定机场推荐与深度评测知识库
      </h1>
      
      <p class="hero-desc">
        拒绝虚标与虚假推广。聚焦 <strong>IEPL 企业级专线</strong>、<strong>高性价比中转</strong>、<strong>ChatGPT/Claude 专属解锁</strong> 与 <strong>4K/8K 晚高峰不卡顿</strong> 真实网络体验，提供全维度数据指标与跑路风险雷达。
      </p>

      <!-- 首页搜索与快速直达 -->
      <div class="hero-btn-group">
        <a href="/recommend/2026" class="btn-primary">
          🔥 2026 综合首选推荐 →
        </a>
        <a href="/tools/calculator" class="btn-primary" style="background: #15803D; border-color: #15803D;">
          🧮 智能选机计算器
        </a>
        <a href="/ranking/peak-hours" class="btn-outline">
          ⚡ 晚高峰抗拥堵排行榜
        </a>
        <a href="/pricing/under-10-yuan" class="btn-outline">
          💰 平价高性价比选机
        </a>
        <a href="/intel/exit-scam-list" class="btn-outline btn-intel">
          🛡️ 风险情报曝光台
        </a>
      </div>
    </header>

    <!-- 14 个 Topic Cluster 核心专题导航矩阵 -->
    <section class="cluster-section">
      <div class="cluster-header">
        <div>
          <h2 class="section-title">14 大核心专题集群 (Topic Authority)</h2>
          <p class="section-desc">覆盖“选机、评测、对比、教程、排障、风控”完整科学上网搜索意图</p>
        </div>
        <span class="badge-tag badge-amber">140+ 二级专题</span>
      </div>

      <div class="cluster-grid">
        <a href="/recommend/" class="cluster-card">
          <div class="cluster-num">01</div>
          <div class="cluster-name">机场推荐</div>
        </a>
        <a href="/ranking/" class="cluster-card">
          <div class="cluster-num">02</div>
          <div class="cluster-name">机场排行</div>
        </a>
        <a href="/brands/" class="cluster-card">
          <div class="cluster-num">03</div>
          <div class="cluster-name">机场品牌库</div>
        </a>
        <a href="/reviews/" class="cluster-card">
          <div class="cluster-num">04</div>
          <div class="cluster-name">深度评测</div>
        </a>
        <a href="/compare/" class="cluster-card">
          <div class="cluster-num">05</div>
          <div class="cluster-name">机场对比</div>
        </a>
        <a href="/pricing/" class="cluster-card">
          <div class="cluster-num">06</div>
          <div class="cluster-name">价格套餐</div>
        </a>
        <a href="/lines/" class="cluster-card">
          <div class="cluster-num">07</div>
          <div class="cluster-name">线路节点</div>
        </a>
        <a href="/use-cases/" class="cluster-card">
          <div class="cluster-num text-blue">08</div>
          <div class="cluster-name">用途推荐</div>
        </a>
        <a href="/benchmarks/" class="cluster-card">
          <div class="cluster-num text-blue">09</div>
          <div class="cluster-name">实测中心</div>
        </a>
        <a href="/clients/" class="cluster-card">
          <div class="cluster-num text-blue">10</div>
          <div class="cluster-name">客户端</div>
        </a>
        <a href="/guides/" class="cluster-card">
          <div class="cluster-num text-purple">11</div>
          <div class="cluster-name">教程中心</div>
        </a>
        <a href="/troubleshooting/" class="cluster-card">
          <div class="cluster-num text-purple">12</div>
          <div class="cluster-name">网络排障</div>
        </a>
        <a href="/unlock/" class="cluster-card">
          <div class="cluster-num text-emerald">13</div>
          <div class="cluster-name">AI与流媒体</div>
        </a>
        <a href="/intel/" class="cluster-card card-risk">
          <div class="cluster-num text-rose">14</div>
          <div class="cluster-name">风险情报</div>
        </a>
      </div>
    </section>

    <!-- 智能选机测算工具交互区 -->
    <section class="section-block">
      <TrafficCalculator />
    </section>

    <!-- 2026 精选梯队推荐卡片展示 -->
    <section class="section-block">
      <div class="section-header-flex">
        <div>
          <h2 class="section-title">🔥 2026 年度编辑精选推荐梯队</h2>
          <p class="section-desc">经过 30 天 24 小时真实晚高峰连续网络监控与综合考量</p>
        </div>
        <a href="/recommend/" class="section-link">查看全部 10 大梯队推荐 →</a>
      </div>

      <div class="cards-list">
        <div v-for="airport in featuredAirports" :key="airport.id">
          <AirportCard :airport="airport" />
        </div>
      </div>
    </section>

    <!-- 核心机场多维参数横向对比矩阵 -->
    <section class="section-block">
      <div class="section-header-flex">
        <div>
          <h2 class="section-title">📊 核心机场参数横向横评大盘</h2>
          <p class="section-desc">价格、线路协议、晚高峰SLA与解锁能力直观横向比对</p>
        </div>
        <a href="/compare/" class="section-link">进入专业对比中心 →</a>
      </div>

      <CompareTable />
    </section>

    <!-- 首页常见搜索意图解答 FAQ -->
    <section class="faq-block">
      <h2 class="faq-title">💡 新手选购常见问题解答 (FAQ)</h2>
      
      <div class="faq-list">
        <div class="faq-item">
          <h3 class="faq-q">Q1：2026 年选机场，为什么一定要认准「IEPL / IPLC 专线」？</h3>
          <p class="faq-a">
            普通直连和部分低端中转使用的是公网传输，在晚高峰（20:00-23:00）或敏感时期极易受到 GFW 干扰与运营商 QoS 恶性限速，导致频繁断流、高丢包。而 <strong>IEPL / IPLC 专线</strong> 采用物理层或数据链路层专有光纤内网通信，不过公网防火墙，即使在敏感节点也能保持毫秒级超低延迟与 8K 丝滑秒开。
          </p>
        </div>

        <div class="faq-item">
          <h3 class="faq-q">Q2：为什么不建议轻易购买超低价的“一次性永久/超长大年付”机场？</h3>
          <p class="faq-a">
            每年行业内跑路的机场中，有 90% 以上具有“超低价吸引大额年付后跑路”的特征。专线服务器成本与国际带宽采购是每月刚性支出，任何宣称“99元永久无限流量”的商家在数学模型上都是不可持续的资金盘。建议新手首选 <strong>月付或季付</strong>，主力机场选择运营 3 年以上的老牌服务商。
          </p>
        </div>

        <div class="faq-item">
          <h3 class="faq-q">Q3：ChatGPT 与 Claude 为什么经常提示“Access Denied”或“Region Not Supported”？</h3>
          <p class="faq-a">
            OpenAI 与 Anthropic 部署了极其严格的 IP 纯净度检测机制。若多个用户共用同一个公网数据中心机房 IP，该 IP 就会被标记为风险代理。高质量机场（如飞猫云）配备专属的 <strong>原生住宅 IP (Residential IP)</strong>，伪装为本地真实宽带用户，从而杜绝频繁验证码与封号风险。
          </p>
        </div>
      </div>
    </section>

    <!-- 全局知识图谱组件 -->
    <TopicCluster title="机场推荐首页" />
  </div>
</template>

<script setup lang="ts">
import { airportsData } from '../../../data/airports';
import AirportCard from './AirportCard.vue';
import CompareTable from './CompareTable.vue';
import TopicCluster from './TopicCluster.vue';

const featuredAirports = airportsData.filter(a => a.featured && a.status === 'active');
</script>

<style scoped>
.home-wrapper {
  max-width: 1080px;
  margin: 0 auto;
  padding: 16px 20px 48px;
}

/* 英雄区排版 */
.hero-box {
  text-align: center;
  padding: 40px 16px 36px;
  border-bottom: 1px solid var(--vp-c-border);
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: #FEF3C7;
  color: #92400E;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 700;
  border: 1px solid #FDE68A;
  margin-bottom: 18px;
}

.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #D97706;
  box-shadow: 0 0 8px #D97706;
}

.hero-title {
  font-size: 36px;
  font-weight: 900;
  color: #1C1917;
  line-height: 1.25;
  margin: 0 0 16px;
  letter-spacing: -0.02em;
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 46px;
  }
}

.hero-desc {
  font-size: 16px;
  color: #57534E;
  line-height: 1.7;
  max-width: 780px;
  margin: 0 auto 28px;
}

.hero-btn-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.btn-intel {
  color: #B91C1C !important;
  border-color: #FECACA;
}

.btn-intel:hover {
  background: #FEF2F2 !important;
  border-color: #DC2626 !important;
  color: #991B1B !important;
}

/* 14 专题网格排版 */
.cluster-section {
  margin: 44px 0;
}

.cluster-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.section-title {
  font-size: 22px;
  font-weight: 900;
  color: #1C1917;
  margin: 0;
}

.section-desc {
  font-size: 13px;
  color: #78716C;
  margin: 4px 0 0;
}

.cluster-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
}

@media (max-width: 1024px) {
  .cluster-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 640px) {
  .cluster-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.cluster-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 8px;
  background: #FFFFFF;
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  text-decoration: none !important;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 6px rgba(28, 25, 23, 0.02);
}

.cluster-card:hover {
  transform: translateY(-2px);
  border-color: #D97706;
  background: #FFFDF9;
  box-shadow: 0 6px 16px rgba(217, 119, 6, 0.12);
}

.cluster-card.card-risk:hover {
  border-color: #DC2626;
  background: #FEF2F2;
  box-shadow: 0 6px 16px rgba(220, 38, 38, 0.12);
}

.cluster-num {
  font-family: var(--vp-font-family-mono);
  font-size: 15px;
  font-weight: 800;
  color: #D97706;
  margin-bottom: 4px;
}

.cluster-num.text-blue {
  color: #2563EB;
}

.cluster-num.text-purple {
  color: #7C3AED;
}

.cluster-num.text-emerald {
  color: #059669;
}

.cluster-num.text-rose {
  color: #DC2626;
}

.cluster-name {
  font-size: 13px;
  font-weight: 700;
  color: #1C1917;
}

/* 推荐与横评区块 */
.section-block {
  margin: 48px 0;
}

.section-header-flex {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 20px;
}

.section-link {
  font-size: 13px;
  font-weight: 700;
  color: #B45309;
  text-decoration: none;
}

.section-link:hover {
  text-decoration: underline;
}

/* FAQ 排版 */
.faq-block {
  margin: 48px 0;
  padding: 32px 28px;
  background: #FFFFFF;
  border-radius: 16px;
  border: 1px solid var(--vp-c-border);
  box-shadow: 0 2px 10px rgba(28, 25, 23, 0.03);
}

.faq-title {
  font-size: 22px;
  font-weight: 900;
  color: #1C1917;
  margin: 0 0 24px;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.faq-item {
  padding-bottom: 18px;
  border-bottom: 1px solid #F5F0E8;
}

.faq-item:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.faq-q {
  font-size: 16px;
  font-weight: 800;
  color: #1C1917;
  margin: 0 0 6px;
}

.faq-a {
  font-size: 14px;
  color: #57534E;
  line-height: 1.7;
  margin: 0;
}
</style>
