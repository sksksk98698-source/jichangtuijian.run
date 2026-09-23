<template>
  <div
    :class="[
      'cream-card my-6 transition-all duration-300 relative',
      airport.status !== 'active' ? 'border-red-300 bg-red-50/20' : 'hover:border-amber-400'
    ]"
  >
    <!-- 顶部角标 Badge -->
    <div class="flex items-start justify-between gap-4 mb-3">
      <div>
        <div class="flex items-center gap-2 flex-wrap">
          <span
            v-if="airport.badge"
            class="badge-tag badge-amber font-bold tracking-wide uppercase text-xs"
          >
            ★ {{ airport.badge }}
          </span>
          <span
            v-for="line in airport.lineTypes"
            :key="line"
            class="badge-tag badge-blue font-medium text-xs"
          >
            {{ line }}
          </span>
          <span
            v-for="proto in airport.protocols"
            :key="proto"
            class="badge-tag bg-stone-100 text-stone-700 text-xs border border-stone-200"
          >
            {{ proto }}
          </span>
        </div>

        <h3 class="text-xl sm:text-2xl font-extrabold text-stone-900 mt-2 flex items-center gap-2">
          <span>{{ airport.name }}</span>
          <span class="text-sm font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            ★ {{ airport.rating.toFixed(1) }} 评分
          </span>
        </h3>
      </div>

      <!-- 价格展示区 -->
      <div class="text-right flex-shrink-0">
        <div class="text-xs text-stone-500 font-medium">起步门槛</div>
        <div class="text-2xl sm:text-3xl font-black text-amber-700 font-mono tracking-tight">
          <span class="text-base font-normal">¥</span>{{ airport.priceStarting.toFixed(1) }}
          <span class="text-xs font-normal text-stone-500">/{{ airport.cycle }}</span>
        </div>
      </div>
    </div>

    <!-- 标语描述 -->
    <p class="text-sm text-stone-700 leading-relaxed font-normal mb-3">
      {{ airport.tagline }}
    </p>

    <!-- 风险预警横幅（当有风险时触发） -->
    <RiskBanner v-if="airport.status !== 'active'" :notice="airport.statusNotice" />

    <!-- 测速与解锁仪表组件 -->
    <BenchmarkBar
      :speed-score="airport.speedScore"
      :stability-score="airport.stabilityScore"
      :nodes-count="airport.nodesCount"
      :bandwidth="airport.bandwidth"
      :streaming="airport.streamingUnlock"
      :ai="airport.aiUnlock"
    />

    <!-- 优缺点对比清单 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 pt-3 border-t border-stone-200/80 text-sm">
      <div class="space-y-1.5">
        <div class="font-bold text-emerald-800 flex items-center gap-1.5 text-xs">
          <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
          </svg>
          核心优势（亮点）
        </div>
        <ul class="m-0 pl-5 text-stone-600 space-y-1 list-disc text-xs leading-normal">
          <li v-for="pro in airport.pros" :key="pro">{{ pro }}</li>
        </ul>
      </div>

      <div class="space-y-1.5">
        <div class="font-bold text-stone-700 flex items-center gap-1.5 text-xs">
          <svg class="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          客观不足与注意事项
        </div>
        <ul class="m-0 pl-5 text-stone-500 space-y-1 list-disc text-xs leading-normal">
          <li v-for="con in airport.cons" :key="con">{{ con }}</li>
        </ul>
      </div>
    </div>

    <!-- 底部操作栏：优惠码 + 评测详情 + 直达购买 -->
    <div class="pt-4 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-3">
      <!-- 优惠码 -->
      <div v-if="airport.couponCode && airport.status === 'active'" class="coupon-box">
        <span class="font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">{{ airport.couponCode }}</span>
        <span class="text-xs text-amber-700">{{ airport.couponDiscount || '专属折扣码' }}</span>
      </div>
      <div v-else class="text-xs text-stone-400">
        已运营 {{ 2026 - airport.establishedYear }} 年 · 原生线路保障
      </div>

      <!-- 按钮操作组 -->
      <div class="flex items-center gap-3 ml-auto">
        <a
          v-if="airport.reviewPath"
          :href="airport.reviewPath"
          class="btn-outline text-xs px-3.5 py-2 rounded-lg font-semibold"
        >
          查看完整深度评测 →
        </a>

        <!-- 安全跳板按钮 -->
        <JumpButton
          :airport-id="airport.id"
          :name="airport.name"
          :status="airport.status"
          label="直达官网购买"
          variant="primary"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Airport } from '../../../data/airports';
import BenchmarkBar from './BenchmarkBar.vue';
import JumpButton from './JumpButton.vue';
import RiskBanner from './RiskBanner.vue';

defineProps<{
  airport: Airport;
}>();
</script>
