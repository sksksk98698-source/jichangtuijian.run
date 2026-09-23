<template>
  <div class="compare-table-wrapper my-6 overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
    <table class="compare-table w-full text-left border-collapse text-sm">
      <thead>
        <tr class="bg-stone-100/70 border-b border-stone-200 text-stone-900">
          <th class="p-3.5 font-bold">机场品牌</th>
          <th class="p-3.5 font-bold">综合评分</th>
          <th class="p-3.5 font-bold">起步月付</th>
          <th class="p-3.5 font-bold">线路特性</th>
          <th class="p-3.5 font-bold">晚高峰稳定性</th>
          <th class="p-3.5 font-bold">AI 解锁</th>
          <th class="p-3.5 font-bold">流媒体4K</th>
          <th class="p-3.5 font-bold text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in displayList"
          :key="item.id"
          :class="[
            'border-b border-stone-100 hover:bg-stone-50/70 transition-colors',
            item.status !== 'active' ? 'bg-red-50/30' : ''
          ]"
        >
          <td class="p-3.5 font-bold text-stone-900 whitespace-nowrap">
            <div class="flex items-center gap-1.5">
              <span>{{ item.name }}</span>
              <span v-if="item.badge" class="badge-tag badge-amber text-[10px]">{{ item.badge }}</span>
            </div>
            <div class="text-[11px] font-normal text-stone-500 mt-0.5">{{ item.bandwidth }}</div>
          </td>

          <td class="p-3.5 whitespace-nowrap">
            <span class="font-bold text-amber-700 font-mono">★ {{ item.rating.toFixed(1) }}</span>
          </td>

          <td class="p-3.5 whitespace-nowrap">
            <span class="font-bold text-stone-900 font-mono">¥{{ item.priceStarting.toFixed(1) }}</span>
            <span class="text-xs text-stone-400">/{{ item.cycle }}</span>
          </td>

          <td class="p-3.5">
            <div class="flex flex-wrap gap-1">
              <span v-for="l in item.lineTypes" :key="l" class="badge-tag badge-blue text-[11px]">{{ l }}</span>
            </div>
          </td>

          <td class="p-3.5 whitespace-nowrap font-mono">
            <span :class="item.stabilityScore >= 95 ? 'text-emerald-700 font-bold' : 'text-amber-700'">
              {{ item.stabilityScore }}% SLA
            </span>
          </td>

          <td class="p-3.5 whitespace-nowrap">
            <span v-if="item.aiUnlock.chatgpt && item.aiUnlock.claude" class="text-emerald-700 font-medium text-xs">
              ✓ GPT+Claude
            </span>
            <span v-else-if="item.aiUnlock.chatgpt" class="text-blue-700 font-medium text-xs">
              ✓ 仅ChatGPT
            </span>
            <span v-else class="text-stone-400 text-xs">✕ 需自行代理</span>
          </td>

          <td class="p-3.5 whitespace-nowrap">
            <span v-if="item.streamingUnlock.netflix" class="text-emerald-700 font-medium text-xs">
              ✓ 奈飞全区
            </span>
            <span v-else class="text-stone-400 text-xs">✕ 仅自制剧</span>
          </td>

          <td class="p-3.5 text-center whitespace-nowrap">
            <JumpButton
              :airport-id="item.id"
              :name="item.name"
              :status="item.status"
              label="直达"
              variant="primary"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { airportsData, type Airport } from '../../../data/airports';
import JumpButton from './JumpButton.vue';

const props = defineProps<{
  airports?: Airport[];
  ids?: string[];
}>();

const displayList = computed(() => {
  if (props.airports && props.airports.length > 0) {
    return props.airports;
  }
  if (props.ids && props.ids.length > 0) {
    return airportsData.filter((a) => props.ids?.includes(a.id));
  }
  return airportsData;
});
</script>
