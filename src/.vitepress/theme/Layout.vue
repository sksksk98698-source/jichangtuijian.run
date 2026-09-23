<template>
  <Layout>
    <template #doc-before>
      <Breadcrumb />
    </template>
    <template #doc-after>
      <RelatedLinks />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme';
import Breadcrumb from './components/Breadcrumb.vue';
import RelatedLinks from './components/RelatedLinks.vue';

const { Layout } = DefaultTheme;
</script>
