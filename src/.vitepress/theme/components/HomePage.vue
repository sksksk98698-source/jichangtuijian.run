<template>
  <div class="home-wrapper max-w-5xl mx-auto px-4 py-8">
    <!-- 顶部主标题英雄区 Hero -->
    <header class="text-center py-10 border-b border-stone-200">
      <div class="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-semibold mb-4 border border-amber-200">
        <span class="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
        <span>2026年度实测更新 · 99.9% 晚高峰连续压测基准</span>
      </div>
      
      <h1 class="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
        2026 稳定机场推荐与深度评测知识库
      </h1>
      
      <p class="text-base sm:text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed font-normal">
        拒绝虚标与虚假推广。聚焦 <strong>IEPL 企业级专线</strong>、<strong>高性价比中转</strong>、<strong>ChatGPT/Claude 专属解锁</strong> 与 <strong>4K/8K 晚高峰不卡顿</strong> 真实网络体验，提供全维度数据指标与跑路风险雷达。
      </p>

      <!-- 首页搜索与快速直达 -->
      <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a href="/recommend/2026" class="btn-primary text-sm px-5 py-2.5">
          🔥 2026 综合首选推荐 →
        </a>
        <a href="/ranking/peak-hours" class="btn-outline text-sm px-5 py-2.5">
          ⚡ 晚高峰抗拥堵排行榜
        </a>
        <a href="/pricing/under-10-yuan" class="btn-outline text-sm px-5 py-2.5">
          💰 平价高性价比选机
        </a>
        <a href="/intel/exit-scam-list" class="btn-outline text-sm px-5 py-2.5 text-rose-700 hover:text-rose-800">
          🛡️ 风险情报曝光台
        </a>
      </div>
    </header>

    <!-- 14 个 Topic Cluster 核心专题导航矩阵 -->
    <section class="my-10">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-xl sm:text-2xl font-black text-stone-900 m-0">14 大核心专题集群 (Topic Authority)</h2>
          <p class="text-xs sm:text-sm text-stone-500 mt-1 m-0">覆盖“选机、评测、对比、教程、排障、风控”完整科学上网搜索意图</p>
        </div>
        <span class="badge-tag badge-amber text-xs">140+ 二级专题</span>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 text-center text-xs">
        <a href="/recommend/" class="p-3 bg-white rounded-xl border border-stone-200 hover:border-amber-500 hover:shadow-sm transition-all text-stone-800 font-semibold no-underline">
          <div class="text-amber-600 text-base mb-1 font-bold font-mono">01</div>
          <div>机场推荐</div>
        </a>
        <a href="/ranking/" class="p-3 bg-white rounded-xl border border-stone-200 hover:border-amber-500 hover:shadow-sm transition-all text-stone-800 font-semibold no-underline">
          <div class="text-amber-600 text-base mb-1 font-bold font-mono">02</div>
          <div>机场排行</div>
        </a>
        <a href="/brands/" class="p-3 bg-white rounded-xl border border-stone-200 hover:border-amber-500 hover:shadow-sm transition-all text-stone-800 font-semibold no-underline">
          <div class="text-amber-600 text-base mb-1 font-bold font-mono">03</div>
          <div>机场品牌库</div>
        </a>
        <a href="/reviews/" class="p-3 bg-white rounded-xl border border-stone-200 hover:border-amber-500 hover:shadow-sm transition-all text-stone-800 font-semibold no-underline">
          <div class="text-amber-600 text-base mb-1 font-bold font-mono">04</div>
          <div>深度评测</div>
        </a>
        <a href="/compare/" class="p-3 bg-white rounded-xl border border-stone-200 hover:border-amber-500 hover:shadow-sm transition-all text-stone-800 font-semibold no-underline">
          <div class="text-amber-600 text-base mb-1 font-bold font-mono">05</div>
          <div>机场对比</div>
        </a>
        <a href="/pricing/" class="p-3 bg-white rounded-xl border border-stone-200 hover:border-amber-500 hover:shadow-sm transition-all text-stone-800 font-semibold no-underline">
          <div class="text-amber-600 text-base mb-1 font-bold font-mono">06</div>
          <div>价格套餐</div>
        </a>
        <a href="/lines/" class="p-3 bg-white rounded-xl border border-stone-200 hover:border-amber-500 hover:shadow-sm transition-all text-stone-800 font-semibold no-underline">
          <div class="text-amber-600 text-base mb-1 font-bold font-mono">07</div>
          <div>线路节点</div>
        </a>
        <a href="/use-cases/" class="p-3 bg-white rounded-xl border border-stone-200 hover:border-amber-500 hover:shadow-sm transition-all text-stone-800 font-semibold no-underline">
          <div class="text-blue-600 text-base mb-1 font-bold font-mono">08</div>
          <div>用途推荐</div>
        </a>
        <a href="/benchmarks/" class="p-3 bg-white rounded-xl border border-stone-200 hover:border-amber-500 hover:shadow-sm transition-all text-stone-800 font-semibold no-underline">
          <div class="text-blue-600 text-base mb-1 font-bold font-mono">09</div>
          <div>实测中心</div>
        </a>
        <a href="/clients/" class="p-3 bg-white rounded-xl border border-stone-200 hover:border-amber-500 hover:shadow-sm transition-all text-stone-800 font-semibold no-underline">
          <div class="text-blue-600 text-base mb-1 font-bold font-mono">10</div>
          <div>客户端</div>
        </a>
        <a href="/guides/" class="p-3 bg-white rounded-xl border border-stone-200 hover:border-amber-500 hover:shadow-sm transition-all text-stone-800 font-semibold no-underline">
          <div class="text-purple-600 text-base mb-1 font-bold font-mono">11</div>
          <div>教程中心</div>
        </a>
        <a href="/troubleshooting/" class="p-3 bg-white rounded-xl border border-stone-200 hover:border-amber-500 hover:shadow-sm transition-all text-stone-800 font-semibold no-underline">
          <div class="text-purple-600 text-base mb-1 font-bold font-mono">12</div>
          <div>网络排障</div>
        </a>
        <a href="/unlock/" class="p-3 bg-white rounded-xl border border-stone-200 hover:border-amber-500 hover:shadow-sm transition-all text-stone-800 font-semibold no-underline">
          <div class="text-emerald-600 text-base mb-1 font-bold font-mono">13</div>
          <div>AI与流媒体</div>
        </a>
        <a href="/intel/" class="p-3 bg-white rounded-xl border border-stone-200 hover:border-red-500 hover:shadow-sm transition-all text-stone-800 font-semibold no-underline">
          <div class="text-rose-600 text-base mb-1 font-bold font-mono">14</div>
          <div>风险情报</div>
        </a>
      </div>
    </section>

    <!-- 2026 精选梯队推荐卡片展示 -->
    <section class="my-12">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-2xl font-black text-stone-900 m-0">🔥 2026 年度编辑精选推荐梯队</h2>
          <p class="text-sm text-stone-500 mt-1 m-0">经过 30 天 24 小时真实晚高峰连续网络监控与综合考量</p>
        </div>
        <a href="/recommend/" class="text-xs font-semibold text-amber-700 hover:underline">查看全部 10 大梯队推荐 →</a>
      </div>

      <div v-for="airport in featuredAirports" :key="airport.id">
        <AirportCard :airport="airport" />
      </div>
    </section>

    <!-- 核心机场多维参数横向对比矩阵 -->
    <section class="my-14">
      <div class="flex items-center justify-between mb-2">
        <div>
          <h2 class="text-2xl font-black text-stone-900 m-0">📊 核心机场参数横向横评大盘</h2>
          <p class="text-sm text-stone-500 mt-1 m-0">价格、线路协议、晚高峰SLA与解锁能力直观横向比对</p>
        </div>
        <a href="/compare/" class="text-xs font-semibold text-amber-700 hover:underline">进入专业对比中心 →</a>
      </div>

      <CompareTable />
    </section>

    <!-- 首页常见搜索意图解答 FAQ -->
    <section class="my-14 p-6 bg-white rounded-2xl border border-stone-200">
      <h2 class="text-2xl font-black text-stone-900 mb-6">💡 新手选购常见问题解答 (FAQ)</h2>
      
      <div class="space-y-6 text-sm text-stone-700">
        <div>
          <h3 class="text-base font-bold text-stone-900 mb-1">Q1：2026 年选机场，为什么一定要认准「IEPL / IPLC 专线」？</h3>
          <p class="leading-relaxed text-stone-600 m-0">
            普通直连和部分低端中转使用的是公网传输，在晚高峰（20:00-23:00）或敏感时期极易受到 GFW 干扰与运营商 QoS 恶性限速，导致频繁断流、高丢包。而 <strong>IEPL / IPLC 专线</strong> 采用物理层或数据链路层专有光纤内网通信，不过公网防火墙，即使在敏感节点也能保持毫秒级超低延迟与 8K 丝滑秒开。
          </p>
        </div>

        <div>
          <h3 class="text-base font-bold text-stone-900 mb-1">Q2：为什么不建议轻易购买超低价的“一次性永久/超长大年付”机场？</h3>
          <p class="leading-relaxed text-stone-600 m-0">
            每年行业内跑路的机场中，有 90% 以上具有“超低价吸引大额年付后跑路”的特征。专线服务器成本与国际带宽采购是每月刚性支出，任何宣称“99元永久无限流量”的商家在数学模型上都是不可持续的资金盘。建议新手首选 <strong>月付或季付</strong>，主力机场选择运营 3 年以上的老牌服务商。
          </p>
        </div>

        <div>
          <h3 class="text-base font-bold text-stone-900 mb-1">Q3：ChatGPT 与 Claude 为什么经常提示“Access Denied”或“Region Not Supported”？</h3>
          <p class="leading-relaxed text-stone-600 m-0">
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
