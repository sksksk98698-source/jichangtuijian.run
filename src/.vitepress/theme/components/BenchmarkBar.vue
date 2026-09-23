<template>
  <div class="benchmark-box">
    <div class="benchmark-grid">
      <!-- 速度评分 -->
      <div class="stat-card">
        <div class="stat-label">实测速度评分</div>
        <div class="stat-value text-amber">{{ speedScore }}<span class="stat-unit">/100</span></div>
        <div class="stat-progress">
          <div class="progress-bar bar-amber" :style="{ width: `${speedScore}%` }"></div>
        </div>
      </div>

      <!-- 稳定性 -->
      <div class="stat-card">
        <div class="stat-label">晚高峰稳定性</div>
        <div class="stat-value text-emerald">{{ stabilityScore }}<span class="stat-unit">/100</span></div>
        <div class="stat-progress">
          <div class="progress-bar bar-emerald" :style="{ width: `${stabilityScore}%` }"></div>
        </div>
      </div>

      <!-- 节点规模 -->
      <div class="stat-card">
        <div class="stat-label">全球节点数</div>
        <div class="stat-value-text">{{ nodesCount || '70+ 节点' }}</div>
        <div class="stat-sub">港/台/日/新/美/英</div>
      </div>

      <!-- 带宽规格 -->
      <div class="stat-card">
        <div class="stat-label">专线带宽峰值</div>
        <div class="stat-value-text">{{ bandwidth || '1Gbps 峰值' }}</div>
        <div class="stat-sub">低延迟双向保障</div>
      </div>
    </div>

    <!-- 解锁状态标签组 -->
    <div v-if="streaming || ai" class="unlock-strip">
      <span class="unlock-title">实测解锁：</span>
      
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

<style scoped>
.benchmark-box {
  margin: 14px 0;
  padding: 14px;
  background: #FDFBF7;
  border-radius: 12px;
  border: 1px solid var(--vp-c-border);
}

.benchmark-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  text-align: center;
}

@media (max-width: 640px) {
  .benchmark-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stat-card {
  padding: 10px 8px;
  background: #FFFFFF;
  border-radius: 8px;
  border: 1px solid #ECE7DE;
  box-shadow: 0 1px 3px rgba(28, 25, 23, 0.03);
}

.stat-label {
  font-size: 11px;
  color: #78716C;
  font-weight: 600;
}

.stat-value {
  font-size: 18px;
  font-weight: 800;
  font-family: var(--vp-font-family-mono);
  margin-top: 2px;
}

.stat-unit {
  font-size: 11px;
  font-weight: 400;
  color: #A8A29E;
}

.text-amber {
  color: #B45309;
}

.text-emerald {
  color: #047857;
}

.stat-value-text {
  font-size: 13px;
  font-weight: 800;
  color: #1C1917;
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stat-sub {
  font-size: 11px;
  color: #A8A29E;
  margin-top: 2px;
}

.stat-progress {
  width: 100%;
  height: 5px;
  background: #F3EFEA;
  border-radius: 9999px;
  margin-top: 6px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  border-radius: 9999px;
}

.bar-amber {
  background: #D97706;
}

.bar-emerald {
  background: #059669;
}

.unlock-strip {
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid #EAE4DA;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.unlock-title {
  font-size: 11px;
  font-weight: 700;
  color: #78716C;
}
</style>
