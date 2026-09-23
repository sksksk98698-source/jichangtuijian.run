<template>
  <div v-if="notice" class="risk-banner-card my-4 p-4 rounded-xl border border-red-200 bg-red-50/90 text-red-900 flex items-start gap-3 shadow-sm">
    <div class="flex-shrink-0 text-red-600 mt-0.5">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
    </div>
    <div class="flex-1 text-sm leading-relaxed">
      <div class="font-bold text-red-800 flex items-center gap-2 mb-1">
        <span>情报监控中心 · 风险警示</span>
        <span class="text-xs bg-red-200 text-red-800 px-2 py-0.5 rounded font-mono font-medium">HIGH RISK</span>
      </div>
      <p class="m-0 text-red-700">{{ notice }}</p>
      <div class="mt-2 text-xs text-red-600 flex items-center gap-4">
        <span>建议方案：建议立即迁移至全站高分 IEPL 专线</span>
        <a href="/recommend/" class="font-semibold underline hover:text-red-900">查看 2026 稳定机场推荐 →</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  notice?: string;
}>();
</script>
