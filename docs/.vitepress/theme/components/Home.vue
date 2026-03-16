<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

// Heroicons
import { BoltIcon, SwatchIcon, ShieldCheckIcon, BeakerIcon, RocketLaunchIcon, CubeIcon } from '@heroicons/vue/24/solid'

const { page, site } = useData()

const isZh = computed(() => page.value.relativePath.startsWith('zh/'))

const features = computed(() => isZh.value ? [
  {
    icon: BoltIcon,
    title: 'Livewire v4 驱动',
    details: '使用纯 PHP 构建响应式界面，无需编写 JavaScript'
  },
  {
    icon: SwatchIcon,
    title: 'Tailwind CSS',
    details: '现代化 UI 设计，完美集成 Laravel 生态系统'
  },
  {
    icon: ShieldCheckIcon,
    title: '类型安全',
    details: 'PHP 8.3+ 严格类型检查，PHPStan Level 9'
  },
  {
    icon: BeakerIcon,
    title: '测试优先',
    details: 'Pest + Testbench，全面的测试覆盖'
  },
  {
    icon: RocketLaunchIcon,
    title: 'Laravel 12',
    details: '完全兼容最新版本的 Laravel'
  },
  {
    icon: CubeIcon,
    title: '开箱即用',
    details: 'Grid、Form、Auth，快速构建 CRUD 操作'
  }
] : [
  {
    icon: BoltIcon,
    title: 'Livewire v4 Powered',
    details: 'Build responsive interfaces with pure PHP, no JavaScript required'
  },
  {
    icon: SwatchIcon,
    title: 'Tailwind CSS',
    details: 'Modern UI design, perfectly integrated with Laravel ecosystem'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Type Safe',
    details: 'PHP 8.3+ strict type checking, PHPStan Level 9'
  },
  {
    icon: BeakerIcon,
    title: 'Testing First',
    details: 'Pest + Testbench, comprehensive test coverage'
  },
  {
    icon: RocketLaunchIcon,
    title: 'Laravel 12',
    details: 'Fully compatible with the latest Laravel version'
  },
  {
    icon: CubeIcon,
    title: 'Out of the Box',
    details: 'Grid, Form, Auth, quickly build CRUD operations'
  }
])
</script>

<template>
  <div class="vp-home">
    <!-- Hero Section -->
    <section class="vp-hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-name">
            {{ site.title }}
          </h1>
          <p class="hero-text">
            {{ site.description }}
          </p>
          <div class="hero-actions">
            <a :href="isZh ? '/zh/guide/installation' : '/guide/installation'" class="btn btn-primary">
              {{ isZh ? '快速开始' : 'Quick Start' }}
            </a>
            <a href="https://github.com/x-multibyte/xadmin" class="btn btn-secondary" target="_blank">
              {{ isZh ? '在 GitHub 上查看' : 'View on GitHub' }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="custom-features">
      <div class="container">
        <div class="items">
          <div v-for="feature in features" :key="feature.title" class="item">
            <component :is="feature.icon" class="icon" />
            <h2 class="title">{{ feature.title }}</h2>
            <p class="details">{{ feature.details }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.vp-home {
  width: 100%;
}

/* Hero Section */
.vp-hero {
  padding: 6rem 0 4rem;
  text-align: center;
}

.vp-hero .container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px;
}

.hero-name {
  font-size: 3rem;
  font-weight: 800;
  color: var(--vp-c-brand-1);
  margin-bottom: 1rem;
}

.hero-text {
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.875rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-primary {
  background: var(--vp-c-brand-1);
  color: white;
}

.btn-primary:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 45, 32, 0.3);
}

.btn-secondary {
  background: transparent;
  color: var(--vp-c-text-1);
  border: 2px solid var(--vp-c-divider);
}

.btn-secondary:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

/* Features Section */
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
  color: var(--vp-c-brand-1);
  margin-bottom: 1rem;
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
