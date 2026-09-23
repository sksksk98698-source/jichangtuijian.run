<template>
  <div class="topic-cluster-nav my-10 p-6 rounded-2xl border border-stone-200 bg-stone-50/70 shadow-sm">
    <div class="flex items-center justify-between mb-4 pb-3 border-b border-stone-200">
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
        <h3 class="text-base font-bold text-stone-900 m-0">机场推荐知识图谱 · 关联专题导航</h3>
      </div>
      <span class="text-xs text-stone-500 font-mono">14 TOPIC CLUSTERS</span>
    </div>

    <p class="text-xs text-stone-600 mb-4 leading-relaxed">
      本文为【{{ title || '机场推荐知识库' }}】专栏节点。建议结合下方横评、客户端配置、实测数据与排障指南构建完整的科学上网知识链条：
    </p>

    <!-- 5 大核心分类网格 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
      <!-- 推荐与排行 -->
      <div class="p-3 bg-white rounded-xl border border-stone-200/80">
        <div class="font-bold text-stone-900 mb-2 flex items-center gap-1.5">
          <span class="text-amber-600 font-mono font-bold">01-02</span>
          <span>推荐与综合排行榜</span>
        </div>
        <ul class="space-y-1.5 m-0 pl-3 list-disc text-stone-600">
          <li><a href="/recommend/2026" class="hover:text-amber-700">2026 稳定机场推荐首选清单 →</a></li>
          <li><a href="/ranking/peak-hours" class="hover:text-amber-700">晚高峰 21点 不卡顿抗拥堵排行榜 →</a></li>
          <li><a href="/recommend/budget" class="hover:text-amber-700">高性价比平价大流量机场推荐 →</a></li>
        </ul>
      </div>

      <!-- 线路与选机 -->
      <div class="p-3 bg-white rounded-xl border border-stone-200/80">
        <div class="font-bold text-stone-900 mb-2 flex items-center gap-1.5">
          <span class="text-blue-600 font-mono font-bold">05-07</span>
          <span>线路节点与对比横评</span>
        </div>
        <ul class="space-y-1.5 m-0 pl-3 list-disc text-stone-600">
          <li><a href="/lines/iepl" class="hover:text-blue-700">IEPL 企业级内网专线机场精选 →</a></li>
          <li><a href="/compare/feimao-vs-yuzhou" class="hover:text-blue-700">飞猫云 vs 宇宙云：高端专线横评 →</a></li>
          <li><a href="/lines/native-ip" class="hover:text-blue-700">美国/香港原生 IP (Native IP) 节点 →</a></li>
        </ul>
      </div>

      <!-- 场景与AI流媒体 -->
      <div class="p-3 bg-white rounded-xl border border-stone-200/80">
        <div class="font-bold text-stone-900 mb-2 flex items-center gap-1.5">
          <span class="text-emerald-600 font-mono font-bold">08-13</span>
          <span>ChatGPT 与流媒体解锁</span>
        </div>
        <ul class="space-y-1.5 m-0 pl-3 list-disc text-stone-600">
          <li><a href="/use-cases/chatgpt" class="hover:text-emerald-700">ChatGPT 4o & Claude 3.5 专属节点 →</a></li>
          <li><a href="/unlock/netflix-guide" class="hover:text-emerald-700">Netflix 奈飞非自制剧全区解锁指引 →</a></li>
          <li><a href="/use-cases/gaming" class="hover:text-emerald-700">外服网游低延迟加速专属机场 →</a></li>
        </ul>
      </div>

      <!-- 客户端与教程 -->
      <div class="p-3 bg-white rounded-xl border border-stone-200/80">
        <div class="font-bold text-stone-900 mb-2 flex items-center gap-1.5">
          <span class="text-purple-600 font-mono font-bold">10-11</span>
          <span>客户端下载与订阅导入</span>
        </div>
        <ul class="space-y-1.5 m-0 pl-3 list-disc text-stone-600">
          <li><a href="/clients/clash-verge" class="hover:text-purple-700">Clash Verge Rev 电脑端新手保姆教程 →</a></li>
          <li><a href="/clients/shadowrocket" class="hover:text-purple-700">Shadowrocket 小火箭 iOS 快速扫码导入 →</a></li>
          <li><a href="/guides/import-subscription" class="hover:text-purple-700">订阅更新失败与链接转换技巧 →</a></li>
        </ul>
      </div>

      <!-- 排障与避坑 -->
      <div class="p-3 bg-white rounded-xl border border-stone-200/80">
        <div class="font-bold text-stone-900 mb-2 flex items-center gap-1.5">
          <span class="text-rose-600 font-mono font-bold">12-14</span>
          <span>网络排障与跑路防坑雷达</span>
        </div>
        <ul class="space-y-1.5 m-0 pl-3 list-disc text-stone-600">
          <li><a href="/troubleshooting/connection-failed" class="hover:text-rose-700">节点突然全部超时？自查速修手册 →</a></li>
          <li><a href="/intel/exit-scam-list" class="hover:text-rose-700">2026 近期跑路与失联机场曝光黑名单 →</a></li>
          <li><a href="/intel/mirror-domains" class="hover:text-rose-700">主流机场最新官方备用防失联域名 →</a></li>
        </ul>
      </div>

      <!-- 实测中心 -->
      <div class="p-3 bg-white rounded-xl border border-stone-200/80">
        <div class="font-bold text-stone-900 mb-2 flex items-center gap-1.5">
          <span class="text-amber-700 font-mono font-bold">09</span>
          <span>实机测速与跑分中心</span>
        </div>
        <ul class="space-y-1.5 m-0 pl-3 list-disc text-stone-600">
          <li><a href="/benchmarks/speed-ladder" class="hover:text-amber-700">2026 全机场峰值带宽实机测速天梯 →</a></li>
          <li><a href="/benchmarks/evening-rush" class="hover:text-amber-700">晚高峰 20:00-23:00 连续压测记录 →</a></li>
          <li><a href="/benchmarks/monthly-retest" class="hover:text-amber-700">每月例行复测与线路变动红黑榜 →</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>

<style scoped>
.topic-cluster-nav a {
  text-decoration: none;
  font-weight: 500;
}
.topic-cluster-nav a:hover {
  text-decoration: underline;
}
</style>
