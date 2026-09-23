<template>
  <div class="jump-button-container inline-block">
    <!-- 熔断状态：停止推荐 -->
    <button
      v-if="status && status !== 'active'"
      type="button"
      class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-xs text-red-800 bg-red-100 border border-red-300 cursor-not-allowed opacity-80"
      disabled
    >
      <span class="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
      ⚠️ 风险预警 · 已停用直达通道
    </button>

    <!-- 正常可点击安全跳板 -->
    <a
      v-else
      :href="jumpUrl"
      target="_blank"
      rel="nofollow sponsored noopener"
      :class="[
        'btn-jump inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer shadow-sm',
        variant === 'primary'
          ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-900/10 hover:-translate-y-0.5'
          : 'bg-stone-900 hover:bg-amber-700 text-white hover:-translate-y-0.5'
      ]"
      :title="`前往 ${name || '官网'} 购买与注册`"
    >
      <span>{{ label || '前往官网直达选购' }}</span>
      <svg class="w-4 h-4 ml-0.5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    airportId: string;
    name?: string;
    label?: string;
    variant?: 'primary' | 'secondary' | 'dark';
    status?: 'active' | 'warning' | 'dead';
  }>(),
  {
    variant: 'primary',
    status: 'active'
  }
);

const jumpUrl = computed(() => {
  return `/go/${props.airportId}`;
});
</script>

<style scoped>
.btn-jump {
  text-decoration: none !important;
}
</style>
