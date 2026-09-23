---
layout: page
title: 安全跳转中转站
head:
  - - meta
    - name: robots
      content: noindex, nofollow, noarchive
---

<script setup>
import { onMounted, ref } from 'vue';
import { useData } from 'vitepress';

const { params } = useData();
const targetUrl = ref(params.value?.targetUrl || '/');
const brandName = ref(params.value?.name || '目标网站');
const isActive = ref(params.value?.active === 'true');

onMounted(() => {
  if (isActive.value && targetUrl.value && targetUrl.value !== '#risk-blocked') {
    setTimeout(() => {
      window.location.replace(targetUrl.value);
    }, 800);
  }
});
</script>

<div class="max-w-xl mx-auto my-16 p-8 bg-white border border-stone-200 rounded-2xl text-center shadow-lg">
  <div v-if="isActive">
    <div class="w-12 h-12 mx-auto mb-4 text-amber-600 animate-spin">
      <svg fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
    </div>
    <h2 class="text-xl font-bold text-stone-900 mb-2">正在前往 {{ brandName }} 官方网站...</h2>
    <p class="text-sm text-stone-600 mb-6">为保障您的账号与资产安全，本站已启用安全中转加密防护，请稍候。</p>
    <div class="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 mb-6">提示：若页面未在 2 秒内自动跳转，请点击下方直达链接：</div>
    <a :href="targetUrl" rel="nofollow sponsored noopener" class="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm">
      <span>立即点击前往官网直达 →</span>
    </a>
  </div>
  <div v-else class="text-left">
    <div class="text-red-600 mb-3 text-2xl font-bold flex items-center gap-2">⚠️ 该机场已被列入风险名单</div>
    <p class="text-sm text-stone-700 leading-relaxed">根据本站【14 风险情报雷达】监测，{{ brandName }} 近期出现跑路、失联或严重断流异常，为保护您的资金安全，本站已永久熔断并封禁其推广跳转通道！</p>
    <div class="mt-6 flex gap-4">
      <a href="/recommend/" class="btn-primary text-xs">前往 2026 稳定机场推荐 →</a>
      <a href="/intel/exit-scam-list" class="btn-outline text-xs">查看跑路曝光黑名单 →</a>
    </div>
  </div>
</div>
