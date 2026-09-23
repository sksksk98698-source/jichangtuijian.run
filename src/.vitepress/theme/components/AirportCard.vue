<template>
  <div
    :class="[
      'cream-card my-6 transition-all duration-300 relative',
      airport.status !== 'active' ? 'card-risk-mode' : 'card-active-mode'
    ]"
  >
    <!-- 顶部角标 Badge 与 价格区 -->
    <div class="card-header-flex">
      <div>
        <div class="badges-wrap">
          <span
            v-if="airport.badge"
            class="badge-tag badge-amber"
          >
            ★ {{ airport.badge }}
          </span>
          <span
            v-for="line in airport.lineTypes"
            :key="line"
            class="badge-tag badge-blue"
          >
            {{ line }}
          </span>
          <span
            v-for="proto in airport.protocols"
            :key="proto"
            class="badge-tag badge-neutral"
          >
            {{ proto }}
          </span>
        </div>

        <h3 class="card-title">
          <span>{{ airport.name }}</span>
          <span class="rating-badge">
            ★ {{ airport.rating.toFixed(1) }} 评分
          </span>
        </h3>
      </div>

      <!-- 价格展示区 -->
      <div class="card-price-box">
        <div class="price-label">起步门槛</div>
        <div class="price-val">
          <span class="price-currency">¥</span>{{ airport.priceStarting.toFixed(1) }}
          <span class="price-cycle">/{{ airport.cycle }}</span>
        </div>
      </div>
    </div>

    <!-- 标语描述 -->
    <p class="card-tagline">
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
    <div class="pros-cons-grid">
      <div class="pro-col">
        <div class="pro-title">
          <svg class="icon-check" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
          </svg>
          核心优势（亮点）
        </div>
        <ul class="bullet-list pro-list">
          <li v-for="pro in airport.pros" :key="pro">{{ pro }}</li>
        </ul>
      </div>

      <div class="con-col">
        <div class="con-title">
          <svg class="icon-warn" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          客观不足与注意事项
        </div>
        <ul class="bullet-list con-list">
          <li v-for="con in airport.cons" :key="con">{{ con }}</li>
        </ul>
      </div>
    </div>

    <!-- 底部操作栏：优惠码 + 评测详情 + 直达购买 -->
    <div class="card-footer-flex">
      <!-- 优惠码 -->
      <div v-if="airport.couponCode && airport.status === 'active'" class="coupon-box">
        <span class="coupon-code">{{ airport.couponCode }}</span>
        <span class="coupon-desc">{{ airport.couponDiscount || '专属折扣码' }}</span>
      </div>
      <div v-else class="established-text">
        已运营 {{ 2026 - airport.establishedYear }} 年 · 原生线路保障
      </div>

      <!-- 按钮操作组 -->
      <div class="actions-group">
        <a
          v-if="airport.reviewPath"
          :href="airport.reviewPath"
          class="btn-outline review-btn"
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

<style scoped>
.card-active-mode:hover {
  border-color: #D97706;
}

.card-risk-mode {
  border-color: #FCA5A5 !important;
  background: #FFF5F5 !important;
}

.card-header-flex {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
}

.badges-wrap {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

.badge-neutral {
  background: #F5F0E8;
  color: #57534E;
  border: 1px solid #E7E2DA;
}

.card-title {
  font-size: 22px;
  font-weight: 800;
  color: #1C1917;
  margin: 8px 0 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.rating-badge {
  font-size: 13px;
  font-weight: 700;
  color: #B45309;
  background: #FFFBEB;
  padding: 2px 8px;
  border-radius: 6px;
  border: 1px solid #FDE68A;
}

.card-price-box {
  text-align: right;
  flex-shrink: 0;
}

.price-label {
  font-size: 11px;
  color: #78716C;
  font-weight: 600;
}

.price-val {
  font-size: 26px;
  font-weight: 900;
  color: #B45309;
  font-family: var(--vp-font-family-mono);
  line-height: 1.1;
  margin-top: 2px;
}

.price-currency {
  font-size: 14px;
  font-weight: 600;
}

.price-cycle {
  font-size: 12px;
  font-weight: 400;
  color: #78716C;
}

.card-tagline {
  font-size: 14px;
  color: #44403C;
  line-height: 1.6;
  margin: 0 0 12px;
}

.pros-cons-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 16px 0;
  padding-top: 14px;
  border-top: 1px solid #EAE4DA;
}

@media (max-width: 640px) {
  .pros-cons-grid {
    grid-template-columns: 1fr;
  }
}

.pro-title {
  font-weight: 800;
  color: #065F46;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}

.con-title {
  font-weight: 800;
  color: #78716C;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}

.icon-check {
  width: 16px;
  height: 16px;
  color: #059669;
}

.icon-warn {
  width: 16px;
  height: 16px;
  color: #A8A29E;
}

.bullet-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  line-height: 1.6;
}

.pro-list {
  color: #44403C;
}

.con-list {
  color: #78716C;
}

.card-footer-flex {
  padding-top: 16px;
  border-top: 1px solid #EAE4DA;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.coupon-code {
  font-family: var(--vp-font-family-mono);
  font-weight: 800;
  color: #92400E;
  background: #FEF3C7;
  padding: 2px 6px;
  border-radius: 4px;
}

.coupon-desc {
  font-size: 12px;
  color: #B45309;
}

.established-text {
  font-size: 12px;
  color: #A8A29E;
}

.actions-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
}

.review-btn {
  font-size: 12px;
  padding: 8px 14px;
  border-radius: 8px;
}
</style>
