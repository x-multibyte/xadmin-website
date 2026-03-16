<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import VPHomeHero from 'vitepress/theme/components/VPHomeHero.vue'

const { page } = useData()

const isZh = computed(() => page.value.relativePath.startsWith('zh/'))

const features = computed(() => isZh.value ? [
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    title: 'Livewire v4 驱动',
    details: '使用纯 PHP 构建响应式界面，无需编写 JavaScript'
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
    title: 'Tailwind CSS',
    details: '现代化 UI 设计，完美集成 Laravel 生态系统'
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    title: '类型安全',
    details: 'PHP 8.3+ 严格类型检查，PHPStan Level 9'
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M8 11h8"/><path d="M12 7v8"/></svg>`,
    title: '测试优先',
    details: 'Pest + Testbench，全面的测试覆盖'
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    title: 'Laravel 12',
    details: '完全兼容最新版本的 Laravel'
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
    title: '开箱即用',
    details: 'Grid、Form、Auth，快速构建 CRUD 操作'
  }
] : [
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    title: 'Livewire v4 Powered',
    details: 'Build responsive interfaces with pure PHP, no JavaScript required'
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
    title: 'Tailwind CSS',
    details: 'Modern UI design, perfectly integrated with Laravel ecosystem'
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    title: 'Type Safe',
    details: 'PHP 8.3+ strict type checking, PHPStan Level 9'
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M8 11h8"/><path d="M12 7v8"/></svg>`,
    title: 'Testing First',
    details: 'Pest + Testbench, comprehensive test coverage'
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    title: 'Laravel 12',
    details: 'Fully compatible with the latest Laravel version'
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
    title: 'Out of the Box',
    details: 'Grid, Form, Auth, quickly build CRUD operations'
  }
])
</script>

<template>
  <div class="vp-home">
    <VPHomeHero />
    <div class="custom-features">
      <div class="container">
        <div class="items">
          <div v-for="feature in features" :key="feature.title" class="item">
            <div class="icon" v-html="feature.icon"></div>
            <h2 class="title">{{ feature.title }}</h2>
            <p class="details">{{ feature.details }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-features {
  padding: 4rem 0;
}

.custom-features .container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px;
}

.custom-features .items {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

@media (max-width: 960px) {
  .custom-features .items {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .custom-features .items {
    grid-template-columns: 1fr;
  }
}

.custom-features .item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  border-radius: 12px;
  background: var(--vp-c-bg-alt);
  transition: all 0.3s ease;
  border: 1px solid var(--vp-c-divider);
}

.custom-features .item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(255, 45, 32, 0.15);
  border-color: var(--vp-c-brand-1);
}

.custom-features .icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: var(--vp-c-brand-1);
}

.custom-features .icon svg {
  width: 48px;
  height: 48px;
}

.custom-features .title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.5rem;
}

.custom-features .details {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
}
</style>
