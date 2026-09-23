<template>
  <div class="benchmark-bar-container my-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200/80">
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
      <!-- 速度评分 -->
      <div class="p-2 bg-white rounded-lg border border-stone-200/60 shadow-2xs">
        <div class="text-xs text-stone-500 font-medium">实测速度评分</div>
        <div class="text-lg font-bold text-amber-700 mt-0.5 font-mono">{{ speedScore }}<span class="text-xs font-normal text-stone-400">/100</span></div>
        <div class="w-full bg-stone-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
          <div class="bg-amber-600 h-full rounded-full" :style="{ width: `${speedScore}%` }"></div>
        </div>
      </div>

      <!-- 稳定性 -->
      <div class="p-2 bg-white rounded-lg border border-stone-200/60 shadow-2xs">
        <div class="text-xs text-stone-500 font-medium">晚高峰稳定性</div>
        <div class="text-lg font-bold text-emerald-700 mt-0.5 font-mono">{{ stabilityScore }}<span class="text-xs font-normal text-stone-400">/100</span></div>
        <div class="w-full bg-stone-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
          <div class="bg-emerald-600 h-full rounded-full" :style="{ width: `${stabilityScore}%` }"></div>
        </div>
      </div>

      <!-- 节点规模 -->
      <div class="p-2 bg-white rounded-lg border border-stone-200/60 shadow-2xs">
        <div class="text-xs text-stone-500 font-medium">全球节点数</div>
        <div class="text-sm font-bold text-stone-800 mt-1 font-mono truncate">{{ nodesCount || '70+ 节点' }}</div>
        <div class="text-[11px] text-stone-400 mt-1">港/台/日/新/美/英</div>
      </div>

      <!-- 带宽规格 -->
      <div class="p-2 bg-white rounded-lg border border-stone-200/60 shadow-2xs">
        <div class="text-xs text-stone-500 font-medium">专线带宽峰值</div>
        <div class="text-sm font-bold text-stone-800 mt-1 font-mono truncate">{{ bandwidth || '1Gbps 峰值' }}</div>
        <div class="text-[11px] text-stone-400 mt-1">低延迟双向保障</div>
      </div>
    </div>

    <!-- 解锁状态标签组 -->
    <div v-if="streaming || ai" class="mt-3 pt-2.5 border-t border-stone-200/70 flex flex-wrap items-center gap-2 text-xs">
      <span class="text-stone-500 font-medium text-[11px]">实测解锁：</span>
      
      <span v-if="streaming?.netflix" class="badge-tag badge-green">Netflix 4K</span>
      <span v-if="streaming?.youtube4k" class="badge-tag badge-green">YouTube 8K</span>
      <span v-if="streaming?.disney" class="badge-tag badge-green">Disney+</span>
      <span v-if="streaming?.tiktok" class="badge-tag badge-blue">TikTok</span>
      
      <span v-if="ai?.chatgpt" class="badge-tag badge-amber">ChatGPT-4o</span>
      <span v-if="ai?.claude" class="badge-tag badge-amber">Claude 3.5</span>
      <span v-if="ai?.gemini" class="badge-tag badge-blue">Gemini</span>
      <span v-if="ai?.cursor" class="badge-tag badge-blue">Cursor</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  speedScore: number;
  stabilityScore: number;
  nodesCount?: string;
  bandwidth?: string;
  streaming?: {
    netflix?: boolean;
    youtube4k?: boolean;
    disney?: boolean;
    tiktok?: boolean;
    spotify?: boolean;
  };
  ai?: {
    chatgpt?: boolean;
    claude?: boolean;
    gemini?: boolean;
    cursor?: boolean;
  };
}>();
</script>
