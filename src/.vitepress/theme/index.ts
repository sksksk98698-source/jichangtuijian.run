import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import './style.css';

// 导入核心业务组件
import AirportCard from './components/AirportCard.vue';
import CompareTable from './components/CompareTable.vue';
import BenchmarkBar from './components/BenchmarkBar.vue';
import JumpButton from './components/JumpButton.vue';
import RiskBanner from './components/RiskBanner.vue';
import TopicCluster from './components/TopicCluster.vue';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 全局注册业务组件，方便在任何 Markdown 文件中无缝使用
    app.component('AirportCard', AirportCard);
    app.component('CompareTable', CompareTable);
    app.component('BenchmarkBar', BenchmarkBar);
    app.component('JumpButton', JumpButton);
    app.component('RiskBanner', RiskBanner);
    app.component('TopicCluster', TopicCluster);
  }
} satisfies Theme;
