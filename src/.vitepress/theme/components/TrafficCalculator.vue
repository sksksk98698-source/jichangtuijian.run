<template>
  <div class="calculator-container cream-card">
    <div class="calculator-header">
      <div class="header-badge">🧮 交互式选机工具</div>
      <h2 class="header-title">2026 智能流量测算与机场套餐推荐器</h2>
      <p class="header-desc">
        根据您的实际网络环境、宽带运营商、每日流媒体与 AI 使用习惯，精准计算每月所需流量，并一键匹配最适合的稳定机场套餐。
      </p>
    </div>

    <div class="calculator-body">
      <!-- 维度一：宽带运营商 -->
      <div class="calc-section">
        <label class="section-label">
          <span class="step-num">1</span>
          您的宽带运营商环境
        </label>
        <div class="options-grid grid-4">
          <button
            v-for="item in ispOptions"
            :key="item.value"
            type="button"
            :class="['option-btn', isp === item.value ? 'option-btn-active' : '']"
            @click="isp = item.value"
          >
            <span class="option-icon">{{ item.icon }}</span>
            <span class="option-text">{{ item.label }}</span>
          </button>
        </div>
      </div>

      <!-- 维度二：每日流媒体视频时长 -->
      <div class="calc-section">
        <label class="section-label">
          <span class="step-num">2</span>
          每日观看 YouTube / Netflix / Disney+ 等海外视频
        </label>
        <div class="options-grid grid-4">
          <button
            v-for="item in videoTimeOptions"
            :key="item.value"
            type="button"
            :class="['option-btn', videoHours === item.value ? 'option-btn-active' : '']"
            @click="videoHours = item.value"
          >
            <span class="option-title">{{ item.label }}</span>
            <span class="option-sub">{{ item.sub }}</span>
          </button>
        </div>

        <!-- 画质细分 -->
        <div v-if="videoHours > 0" class="sub-filter-row">
          <span class="sub-filter-label">主要观看画质：</span>
          <div class="sub-btn-group">
            <button
              v-for="q in qualityOptions"
              :key="q.value"
              type="button"
              :class="['sub-btn', videoQuality === q.value ? 'sub-btn-active' : '']"
              @click="videoQuality = q.value"
            >
              {{ q.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- 维度三：AI 与开发者生产力 -->
      <div class="calc-section">
        <label class="section-label">
          <span class="step-num">3</span>
          ChatGPT / Claude / Cursor 等 AI 与代码工具使用频次
        </label>
        <div class="options-grid grid-3">
          <button
            v-for="item in aiOptions"
            :key="item.value"
            type="button"
            :class="['option-btn', aiLevel === item.value ? 'option-btn-active' : '']"
            @click="aiLevel = item.value"
          >
            <span class="option-icon">{{ item.icon }}</span>
            <span class="option-title">{{ item.label }}</span>
            <span class="option-sub">{{ item.desc }}</span>
          </button>
        </div>
      </div>

      <!-- 维度四：预算偏好与付费模式 -->
      <div class="calc-section">
        <label class="section-label">
          <span class="step-num">4</span>
          预算期望与套餐付费模式偏好
        </label>
        <div class="options-grid grid-4">
          <button
            v-for="item in budgetOptions"
            :key="item.value"
            type="button"
            :class="['option-btn', budgetTier === item.value ? 'option-btn-active' : '']"
            @click="budgetTier = item.value"
          >
            <span class="option-title">{{ item.label }}</span>
            <span class="option-sub">{{ item.sub }}</span>
          </button>
        </div>
      </div>

      <!-- 测算评估报告区 -->
      <div class="calc-result-box">
        <div class="result-header">
          <div class="result-tag">💡 测算评估结论</div>
          <div class="traffic-highlight">
            建议月流量档位：
            <span class="traffic-num">{{ estimatedTrafficRange }}</span>
          </div>
        </div>

        <div class="isp-tip-card">
          <div class="tip-icon">🌐</div>
          <div class="tip-content">
            <strong class="tip-title">{{ currentIspInfo.title }}</strong>
            <p class="tip-desc">{{ currentIspInfo.advice }}</p>
          </div>
        </div>
      </div>

      <!-- 匹配推荐结果 -->
      <div class="matched-section">
        <h3 class="matched-title">
          <span>🏆 为您量身匹配的最优推荐机场方案</span>
          <span class="matched-badge">匹配度 98%+</span>
        </h3>

        <div class="matched-cards-grid">
          <div
            v-for="(ap, index) in matchedAirports"
            :key="ap.id"
            class="matched-card"
          >
            <div class="matched-card-top">
              <div class="matched-rank-badge">推荐方案 0{{ index + 1 }}</div>
              <div class="matched-rating">★ {{ ap.rating.toFixed(1) }}</div>
            </div>

            <h4 class="matched-name">{{ ap.name }}</h4>
            <p class="matched-tagline">{{ ap.tagline }}</p>

            <div class="matched-meta-row">
              <span class="meta-tag">{{ ap.lineTypes.join(' / ') }}</span>
              <span class="meta-tag meta-tag-amber">{{ ap.trafficStarting }}</span>
            </div>

            <div class="matched-price-box">
              <div class="price-text">
                <span class="price-sym">¥</span>
                <span class="price-val">{{ ap.priceStarting.toFixed(1) }}</span>
                <span class="price-unit">起 / {{ ap.cycle }}</span>
              </div>
              <div v-if="ap.couponCode" class="coupon-chip">
                码: <code>{{ ap.couponCode }}</code>
              </div>
            </div>

            <div class="matched-actions">
              <a
                :href="ap.reviewPath"
                class="btn-detail"
              >
                查看万字实测
              </a>
              <a
                :href="getJumpUrl(ap.id)"
                target="_blank"
                rel="nofollow sponsored noopener"
                class="btn-buy"
              >
                直达官网开通 →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { airportsData, type Airport } from '../../../data/airports';
import { affiliatesMap } from '../../../data/affiliates';

function getJumpUrl(airportId: string): string {
  const aff = affiliatesMap[airportId];
  if (aff && aff.targetUrl && aff.active && aff.targetUrl !== '#risk-blocked') {
    return aff.targetUrl;
  }
  return '/recommend/2026';
}

// 1. 宽带运营商
const isp = ref<'telecom' | 'mobile' | 'unicom' | 'other'>('telecom');
const ispOptions = [
  { value: 'telecom', label: '中国电信', icon: '📶' },
  { value: 'mobile', label: '中国移动', icon: '📱' },
  { value: 'unicom', label: '中国联通', icon: '⚡' },
  { value: 'other', label: '校园网/广电/其他', icon: '🏫' }
];

// 2. 流媒体时长
const videoHours = ref<number>(1);
const videoTimeOptions = [
  { value: 0, label: '很少观看', sub: '仅网页图文' },
  { value: 1, label: '每日 1 小时', sub: '日常追剧看片' },
  { value: 2, label: '每日 2-3 小时', sub: '中度影音娱乐' },
  { value: 4, label: '每日 4 小时+', sub: '重度长视频' }
];

// 画质
const videoQuality = ref<'1080p' | '4k' | '8k'>('4k');
const qualityOptions = [
  { value: '1080p', label: '1080P 高清 (约 1.5G/小时)' },
  { value: '4k', label: '4K 超高清 (约 7G/小时)' },
  { value: '8k', label: '8K 原画 (约 15G/小时)' }
];

// 3. AI 生产力
const aiLevel = ref<'none' | 'light' | 'heavy'>('light');
const aiOptions = [
  { value: 'none', label: '不用 AI', icon: '⚪', desc: '纯日常查资料与社交通信' },
  { value: 'light', label: '日常对话 (ChatGPT)', icon: '🟢', desc: '每天数十次网页对话交流' },
  { value: 'heavy', label: '重度开发 (Cursor/Claude)', icon: '🔥', desc: '全天候代码补全与长上下文' }
];

// 4. 预算模式
const budgetTier = ref<'all' | 'budget' | 'standard' | 'pay_as_you_go'>('all');
const budgetOptions = [
  { value: 'all', label: '综合推荐', sub: '兼顾稳定与性能' },
  { value: 'budget', label: '高性价比 (15元内)', sub: '入门学生与轻量日常' },
  { value: 'standard', label: '旗舰专线 (20-30元)', sub: '追求晚高峰极致流畅' },
  { value: 'pay_as_you_go', label: '不限时按量包', sub: '常备防失联应急备用' }
];

// 流量计算逻辑
const estimatedTrafficRange = computed(() => {
  let dailyGb = 0.5; // 基础网页/Telegram/查资料消耗

  // 视频消耗
  if (videoHours.value > 0) {
    if (videoQuality.value === '1080p') dailyGb += videoHours.value * 1.5;
    else if (videoQuality.value === '4k') dailyGb += videoHours.value * 7;
    else if (videoQuality.value === '8k') dailyGb += videoHours.value * 15;
  }

  // AI 消耗
  if (aiLevel.value === 'light') dailyGb += 0.5;
  else if (aiLevel.value === 'heavy') dailyGb += 2.0;

  const monthlyBase = dailyGb * 30;
  const minGb = Math.max(30, Math.round(monthlyBase * 0.9));
  const maxGb = Math.round(monthlyBase * 1.25);

  if (minGb >= 300) {
    return `300 GB 以上 (建议 500G~1TB 大流量套餐)`;
  }
  return `${minGb} GB ~ ${maxGb} GB / 月`;
});

// 宽带提示
const currentIspInfo = computed(() => {
  switch (isp.value) {
    case 'telecom':
      return {
        title: '中国电信宽带网络特性建议：',
        advice: '电信 163 国际骨干网晚高峰拥堵显著，普通公网中转极易出现卡顿丢包。强烈建议选择具备“上海或广州入口的企业级 IEPL 物理专线”，晚高峰才能稳定秒开 4K。'
      };
    case 'mobile':
      return {
        title: '中国移动宽带网络特性建议：',
        advice: '移动出海阻断策略较严格，跨网连接电信入口容易触发严重限速。建议优先选择具备“深圳/广州 CMIN2 专线”或“原生 BGP 三网智能入口”的机场，延迟低且丢包率在 0.1% 以下。'
      };
    case 'unicom':
      return {
        title: '中国联通宽带网络特性建议：',
        advice: '联通出海互联基础素质优良，但在晚高峰单线程测试偶有抖动。建议配置具备“联通 9929 骨干网”或“多路由故障转移”的高可用服务商，体验极为平稳顺滑。'
      };
    default:
      return {
        title: '校园网 / 广电 / 二级宽带特性建议：',
        advice: '此类宽带通常存在多重 NAT 嵌套且对境外 UDP 协议有严格限制。强烈建议选择配备“全物理 IEPL 专线”且支持多协议抗封锁的成熟老牌机场。'
      };
  }
});

// 机场匹配算法
const matchedAirports = computed<Airport[]>(() => {
  const active = airportsData.filter(a => a.status === 'active');

  // 按量不限时
  if (budgetTier.value === 'pay_as_you_go') {
    return active.filter(a => a.id === 'xingdaomeng' || a.id === 'yuzhouyun');
  }

  // 15元以下平价
  if (budgetTier.value === 'budget') {
    return active.filter(a => a.id === 'breezenet' || a.id === 'feimaoyun' || a.id === 'xingdaomeng');
  }

  // 20-30元旗舰专线
  if (budgetTier.value === 'standard') {
    return active.filter(a => a.id === 'guangsucloud' || a.id === 'feimaoyun' || a.id === 'breezenet');
  }

  // 综合模式（默认）：根据 AI 与流媒体需求细化
  if (aiLevel.value === 'heavy') {
    return active.filter(a => a.id === 'guangsucloud' || a.id === 'feimaoyun' || a.id === 'xingdaomeng');
  }

  // 默认推荐黄金三剑客
  return active.filter(a => a.id === 'guangsucloud' || a.id === 'feimaoyun' || a.id === 'breezenet');
});
</script>

<style scoped>
.calculator-container {
  padding: 2rem;
  border-radius: 16px;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-border);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  margin: 2rem 0;
}

.calculator-header {
  text-align: center;
  margin-bottom: 2rem;
  border-bottom: 1px dashed var(--vp-c-border);
  padding-bottom: 1.5rem;
}

.header-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border-radius: 20px;
  margin-bottom: 0.75rem;
}

.header-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0.25rem 0 0.5rem 0;
}

.header-desc {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.6;
}

.calc-section {
  margin-bottom: 1.75rem;
}

.section-label {
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.85rem;
}

.step-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  background: var(--vp-c-brand-1);
  color: #fff;
  border-radius: 50%;
  font-size: 0.78rem;
  margin-right: 0.5rem;
}

.options-grid {
  display: grid;
  gap: 0.75rem;
}

.grid-4 {
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
}

.grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

.option-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 0.6rem;
  border-radius: 10px;
  background: var(--vp-c-bg-alt);
  border: 1.5px solid var(--vp-c-border);
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.option-btn:hover {
  border-color: var(--vp-c-brand-2);
  transform: translateY(-1px);
}

.option-btn-active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 2px rgba(180, 83, 9, 0.15);
}

.option-icon {
  font-size: 1.3rem;
  margin-bottom: 0.25rem;
}

.option-text, .option-title {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.option-sub {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
  margin-top: 0.25rem;
}

.sub-filter-row {
  display: flex;
  align-items: center;
  margin-top: 0.85rem;
  padding: 0.6rem 0.85rem;
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
  font-size: 0.88rem;
}

.sub-filter-label {
  color: var(--vp-c-text-2);
  margin-right: 0.75rem;
  font-weight: 500;
}

.sub-btn-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.sub-btn {
  padding: 0.25rem 0.65rem;
  font-size: 0.82rem;
  border-radius: 6px;
  background: #fff;
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-2);
  cursor: pointer;
}

.sub-btn-active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}

/* 结论区 */
.calc-result-box {
  background: linear-gradient(135deg, rgba(254, 243, 199, 0.4), rgba(250, 248, 245, 0.9));
  border: 1.5px solid var(--vp-c-brand-2);
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  margin: 2rem 0;
}

.result-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  border-bottom: 1px solid rgba(180, 83, 9, 0.15);
  padding-bottom: 0.85rem;
  margin-bottom: 0.85rem;
}

.result-tag {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.traffic-highlight {
  font-size: 1rem;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.traffic-num {
  font-size: 1.35rem;
  color: var(--vp-c-brand-1);
  font-weight: 800;
}

.isp-tip-card {
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
}

.tip-icon {
  font-size: 1.5rem;
  line-height: 1;
}

.tip-title {
  color: var(--vp-c-text-1);
  font-size: 0.92rem;
}

.tip-desc {
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
  line-height: 1.55;
  margin-top: 0.2rem;
}

/* 匹配卡片 */
.matched-section {
  margin-top: 2rem;
}

.matched-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 1.25rem;
}

.matched-badge {
  font-size: 0.78rem;
  background: #15803D;
  color: #fff;
  padding: 0.2rem 0.55rem;
  border-radius: 12px;
}

.matched-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
}

.matched-card {
  background: #fff;
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  transition: all 0.25s ease;
}

.matched-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  border-color: var(--vp-c-brand-2);
}

.matched-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.matched-rank-badge {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.matched-rating {
  font-size: 0.82rem;
  font-weight: 700;
  color: #D97706;
}

.matched-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0.25rem 0;
}

.matched-tagline {
  font-size: 0.82rem;
  color: var(--vp-c-text-3);
  line-height: 1.45;
  margin-bottom: 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.matched-meta-row {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-bottom: 0.85rem;
}

.meta-tag {
  font-size: 0.75rem;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

.meta-tag-amber {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.matched-price-box {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 0.85rem;
  border-top: 1px solid var(--vp-c-divider);
  margin-bottom: 0.85rem;
}

.price-sym {
  font-size: 0.85rem;
  color: #DC2626;
  font-weight: 700;
}

.price-val {
  font-size: 1.35rem;
  font-weight: 800;
  color: #DC2626;
}

.price-unit {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
  margin-left: 0.2rem;
}

.coupon-chip {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.coupon-chip code {
  color: var(--vp-c-brand-1);
  font-weight: 700;
}

.matched-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.btn-detail {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.45rem 0.5rem;
  font-size: 0.82rem;
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-border);
  text-decoration: none;
  font-weight: 500;
}

.btn-detail:hover {
  background: var(--vp-c-bg-soft);
}

.btn-buy {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.45rem 0.5rem;
  font-size: 0.82rem;
  border-radius: 6px;
  background: var(--vp-c-brand-1);
  color: #fff !important;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s;
}

.btn-buy:hover {
  background: var(--vp-c-brand-2);
}

@media (max-width: 640px) {
  .calculator-container {
    padding: 1.25rem 1rem;
  }
  .grid-4, .grid-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
