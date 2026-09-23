import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import Layout from './Layout.vue';
import './style.css';

// 导入核心业务组件
import AirportCard from './components/AirportCard.vue';
import CompareTable from './components/CompareTable.vue';
import BenchmarkBar from './components/BenchmarkBar.vue';
import JumpButton from './components/JumpButton.vue';
import RiskBanner from './components/RiskBanner.vue';
import TopicCluster from './components/TopicCluster.vue';
import HomePage from './components/HomePage.vue';
import Breadcrumb from './components/Breadcrumb.vue';
import RelatedLinks from './components/RelatedLinks.vue';
import TrafficCalculator from './components/TrafficCalculator.vue';

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // 全局注册业务组件，方便在任何 Markdown 文件中无缝使用
    app.component('AirportCard', AirportCard);
    app.component('CompareTable', CompareTable);
    app.component('BenchmarkBar', BenchmarkBar);
    app.component('JumpButton', JumpButton);
    app.component('RiskBanner', RiskBanner);
    app.component('TopicCluster', TopicCluster);
    app.component('HomePage', HomePage);
    app.component('Breadcrumb', Breadcrumb);
    app.component('RelatedLinks', RelatedLinks);
    app.component('TrafficCalculator', TrafficCalculator);
  }
} satisfies Theme;
