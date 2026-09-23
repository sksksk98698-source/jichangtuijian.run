---
layout: page
title: 官方安全跳转通道
head:
  - - meta
    - name: robots
      content: noindex, nofollow, noarchive
---

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useData, useRoute } from 'vitepress';
import { affiliatesMap } from '../data/affiliates';

const { params, page } = useData();
const route = useRoute();

// 自动识别当前品牌 ID
const brandKey = computed(() => {
  if (params.value?.brand) return params.value.brand;
  const p = route.path || page.value.relativePath || '';
  return p.replace(/^go\//, '').replace(/^\/go\//, '').replace(/\.html$/, '').replace(/\.md$/, '').replace(/\/$/, '');
});

const aff = computed(() => {
  return affiliatesMap[brandKey.value] || {};
});

const targetUrl = computed(() => {
  return aff.value.targetUrl || params.value?.targetUrl || '/';
});

const brandName = computed(() => {
  return aff.value.name || params.value?.name || '目标机场';
});

const couponCode = computed(() => {
  return aff.value.couponCode || params.value?.couponCode || '';
});

const couponDiscount = computed(() => {
  return aff.value.couponDiscount || params.value?.couponDiscount || '';
});

const isActive = computed(() => {
  if (aff.value.active === false) return false;
  if (targetUrl.value === '#risk-blocked') return false;
  return targetUrl.value.startsWith('http://') || targetUrl.value.startsWith('https://');
});

onMounted(() => {
  if (isActive.value && targetUrl.value.startsWith('http')) {
    setTimeout(() => {
      window.location.replace(targetUrl.value);
    }, 400);
  }
});
</script>

<div class="max-w-xl mx-auto my-16 p-8 bg-white border border-stone-200 rounded-2xl text-center shadow-lg">
  <div v-if="isActive">
    <div class="w-12 h-12 mx-auto mb-4 text-amber-600 animate-spin">
      <svg fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
    </div>
    <h1 class="text-xl font-bold text-stone-900 mb-2">正在前往 {{ brandName }} 官方注册页面...</h1>
    <p class="text-sm text-stone-600 mb-4">为保障您的账号与资金安全，已启用官方直达加密链路，正在自动为您接入：</p>
    
    <div v-if="couponCode" class="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 mb-6 flex items-center justify-center gap-2">
      <span>专属注册优惠码：</span>
      <span class="font-mono font-bold text-sm bg-white px-2 py-0.5 rounded border border-amber-300 text-amber-700">{{ couponCode }}</span>
      <span v-if="couponDiscount" class="text-stone-500">({{ couponDiscount }})</span>
    </div>

    <div class="space-y-3">
      <a :href="targetUrl" rel="nofollow sponsored noopener" class="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm w-full shadow-md">
        <span>立即前往官网购买与注册 →</span>
      </a>
      <div class="text-[11px] text-stone-400">若浏览器未自动跳转，请直接点击上方按钮</div>
    </div>
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
