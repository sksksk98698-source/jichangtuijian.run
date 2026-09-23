<template>
  <nav v-if="items.length > 1" aria-label="面包屑导航" class="breadcrumb-container">
    <ol class="breadcrumb-list" itemscope itemtype="https://schema.org/BreadcrumbList">
      <template v-for="(item, idx) in items" :key="item.url || idx">
        <li
          class="breadcrumb-item"
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <a
            v-if="idx < items.length - 1"
            :href="item.url"
            class="breadcrumb-link"
            itemprop="item"
          >
            <span itemprop="name">{{ item.name }}</span>
          </a>
          <span v-else class="breadcrumb-current" itemprop="name">{{ item.name }}</span>
          <meta itemprop="position" :content="String(idx + 1)" />
        </li>
        <li v-if="idx < items.length - 1" class="breadcrumb-separator" aria-hidden="true">/</li>
      </template>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useData } from 'vitepress';
import { topicClusters } from '../../../data/navigation';

const route = useRoute();
const { page, frontmatter } = useData();

const items = computed(() => {
  const path = route.path.replace(/\/$/, '') || '/';
  if (path === '/' || path.startsWith('/go/')) {
    return [];
  }

  const list = [{ name: '首页', url: '/' }];
  const segments = path.replace(/^\//, '').split('/');

  if (segments.length > 0) {
    const cluster = topicClusters.find(c => c.id === segments[0]);
    if (cluster) {
      list.push({
        name: `${cluster.num} ${cluster.title}`,
        url: cluster.path
      });
      if (segments.length > 1) {
        const title = frontmatter.value.title || page.value.title || '当前页面';
        list.push({
          name: title.split('：')[0].split(' - ')[0],
          url: route.path
        });
      }
    } else {
      const title = frontmatter.value.title || page.value.title || '当前页面';
      list.push({
        name: title.split('：')[0].split(' - ')[0],
        url: route.path
      });
    }
  }

  return list;
});
</script>

<style scoped>
.breadcrumb-container {
  margin-bottom: 1.25rem;
  padding: 0.5rem 0.75rem;
  background-color: #FBF9F4;
  border: 1px solid rgba(229, 222, 210, 0.6);
  border-radius: 8px;
  font-size: 0.75rem;
  line-height: 1.25rem;
}

.breadcrumb-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
}

.breadcrumb-item {
  display: inline-flex;
  align-items: center;
}

.breadcrumb-link {
  color: #78716c;
  text-decoration: none;
  transition: color 0.15s ease;
}

.breadcrumb-link:hover {
  color: #b45309;
  text-decoration: underline;
}

.breadcrumb-separator {
  margin: 0 0.5rem;
  color: #d6d3d1;
  user-select: none;
}

.breadcrumb-current {
  color: #292524;
  font-weight: 600;
}
</style>
