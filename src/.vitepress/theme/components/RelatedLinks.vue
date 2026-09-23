<template>
  <div v-if="relatedItems.length > 0" class="related-container">
    <div class="related-header">
      <h3 class="related-title">📖 延伸阅读与关联专题矩阵</h3>
      <span class="related-tag">Topical Cluster</span>
    </div>
    <div class="related-grid">
      <a
        v-for="item in relatedItems"
        :key="item.path"
        :href="item.path"
        class="related-card"
      >
        <span class="card-badge">{{ item.category }}</span>
        <h4 class="card-title">{{ item.title }}</h4>
        <p class="card-desc">{{ item.desc }}</p>
        <span class="card-arrow">深入了解 →</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vitepress';
import { topicClusters } from '../../../data/navigation';
import { airportsData } from '../../../data/airports';

const route = useRoute();

interface RelatedItem {
  title: string;
  path: string;
  category: string;
  desc: string;
}

const relatedItems = computed<RelatedItem[]>(() => {
  const path = route.path.replace(/\/$/, '') || '/';
  if (path === '/' || path.startsWith('/go/')) {
    return [];
  }

  const list: RelatedItem[] = [];
  const segments = path.replace(/^\//, '').split('/');
  const section = segments[0];

  // Specific contextual mappings for strong internal linking
  if (section === 'reviews' || section === 'brands') {
    list.push(
      { title: '2026年度稳定机场排行榜前十名', path: '/ranking/stability', category: '02 机场排行', desc: '基于30天自动化连续测速的稳定性SLA天梯榜' },
      { title: '光速云 vs 飞猫云：旗舰对决横评', path: '/compare/guangsu-vs-feimao', category: '05 机场对比', desc: '老牌专线旗舰与新锐高性价比专线深度对照' },
      { title: 'Clash Verge Rev 客户端配置与分流教程', path: '/clients/clash-verge', category: '10 客户端指南', desc: '新一代内核订阅导入、TUN虚拟网卡与DNS防泄露' },
      { title: 'IEPL 企业级跨境内网专线原理全解析', path: '/lines/iepl', category: '07 线路节点', desc: '为什么物理专线不经GFW，晚高峰零断流抗封锁' }
    );
  } else if (section === 'compare') {
    list.push(
      { title: '光速云 2026 万字级深度实机评测', path: '/reviews/guangsucloud', category: '04 深度评测', desc: '2020年老牌IEPL专线晚高峰与AI解锁全指标实测' },
      { title: '飞猫云 2026 全面实机使用报告', path: '/reviews/feimaoyun', category: '04 深度评测', desc: '新锐黑马IEPL专线、自研客户端与性价比拆解' },
      { title: '按月付费 vs 一次性年付：哪种划算？', path: '/compare/monthly-vs-annual', category: '05 机场对比', desc: '精算长期持有成本与防跑路资金安全法则' },
      { title: '微风网络 vs 星岛梦：低价年付与不限时之争', path: '/compare/breeze-vs-xingdao', category: '05 机场对比', desc: '月均7元小流量专线 vs 永久不过期不限时横评' }
    );
  } else if (section === 'clients' || section === 'guides' || section === 'troubleshooting') {
    list.push(
      { title: '节点全部超时与连不上五步排查指南', path: '/troubleshooting/connection-failed', category: '12 网络排障', desc: '快速定位本地时间偏差、分流规则错误与入口故障' },
      { title: 'Shadowrocket (小火箭) 完整配置教程', path: '/clients/shadowrocket', category: '10 客户端指南', desc: 'iOS苹果手机规则集导入、URL-Test与测速分流' },
      { title: '2026年最新稳定高性价比机场推荐', path: '/recommend/2026', category: '01 机场推荐', desc: '通过本站严格晚高峰实机压测的核心精选服务商' },
      { title: '流量永不过期：不限时按量付费精选', path: '/pricing/never-expire', category: '06 价格套餐', desc: '适合低频办公与备用防断网的长效解决方案' }
    );
  } else if (section === 'pricing') {
    list.push(
      { title: '10元以下极便宜实用专线清单', path: '/pricing/under-10-yuan', category: '06 价格套餐', desc: '学生党、文献查阅与轻度上网超低门槛方案' },
      { title: '跑路与失联风险情报黑名单曝光台', path: '/intel/exit-scam-list', category: '14 风险情报', desc: '警惕超低价年付卷款跑路套路与跑路征兆自查' },
      { title: '光速云 2026 深度评测（年付折算7.5元）', path: '/reviews/guangsucloud', category: '04 深度评测', desc: '兼顾极低年付折算价与企业级专线稳定性的标杆' },
      { title: '宇宙云 15元档极致性价比深度报告', path: '/reviews/yuzhouyun', category: '04 深度评测', desc: '14.9元真实月付配比100GB VLESS专线实测' }
    );
  } else {
    // Default fallback pulls key cross-cluster pillars
    list.push(
      { title: '2026 稳定机场推荐总纲', path: '/recommend/2026', category: '01 机场推荐', desc: '本站年度核心推荐梯队与选机参数对比' },
      { title: '光速云 2026 深度实机使用报告', path: '/reviews/guangsucloud', category: '04 深度评测', desc: '2020年老牌首推·晚高峰800M秒开与AI全解锁' },
      { title: '晚高峰 21点 拥堵度实机抽测报告', path: '/reviews/peak-stress-test', category: '04 深度评测', desc: '黄金拥堵时段丢包率与8K流媒体缓冲实测' },
      { title: '纯原生 IP (Native IP) 解锁合集', path: '/lines/native-ip', category: '07 线路节点', desc: '专破 ChatGPT 4o、Claude 与海外流媒体风控' }
    );
  }

  // Filter out current page
  return list.filter(item => item.path !== path);
});
</script>

<style scoped>
.related-container {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(229, 222, 210, 0.8);
}

.related-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.related-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 700;
  color: #1c1917;
}

.related-tag {
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #92400e;
  background-color: #fef3c7;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.related-card {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #FDFBF7;
  border: 1px solid rgba(229, 222, 210, 0.6);
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.related-card:hover {
  transform: translateY(-2px);
  border-color: #f59e0b;
  box-shadow: 0 4px 12px rgba(180, 83, 9, 0.08);
}

.card-badge {
  font-size: 0.6875rem;
  font-weight: 600;
  color: #78716c;
  margin-bottom: 0.35rem;
}

.card-title {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  font-weight: 700;
  color: #292524;
  line-height: 1.35;
}

.related-card:hover .card-title {
  color: #b45309;
}

.card-desc {
  margin: 0;
  font-size: 0.75rem;
  color: #57534e;
  line-height: 1.45;
  flex: 1;
}

.card-arrow {
  margin-top: 0.75rem;
  font-size: 0.6875rem;
  font-weight: 600;
  color: #d97706;
}
</style>
