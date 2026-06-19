<script setup>
import { ref, computed } from 'vue'
import BaseCard from '../ui/BaseCard.vue'
import { projectGridItems } from '../../config/userProfile.js'

const activeTag = ref('全部')
const allTags = ['全部', '嵌入式', 'Web', 'IoT', 'AI']

const filteredProjects = computed(() => {
  if (activeTag.value === '全部') return projectGridItems
  return projectGridItems.filter((p) => p.tags.includes(activeTag.value))
})
</script>

<template>
  <section>
    <div class="section-divider">
      <span class="divider-title">项目展示</span>
      <span class="dash-line" />
      <span class="seq-num">02</span>
    </div>
    <p class="text-[var(--text-secondary)] mb-6 -mt-3 text-sm">我参与和独立完成的部分项目作品。</p>

    <div class="flex flex-wrap gap-2 mb-6">
      <button
        v-for="tag in allTags" :key="tag" @click="activeTag = tag"
        class="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
        :class="activeTag === tag
          ? 'bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/20'
          : 'text-[var(--text-secondary)] border border-white/5 hover:text-[var(--text-primary)] hover:border-white/10'"
      >{{ tag }}</button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <BaseCard v-for="project in filteredProjects" :key="project.title" padding="p-5">
        <div class="flex flex-col h-full">
          <div class="flex items-start justify-between mb-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style="background: var(--color-accent-primary)/10;">📁</div>
            <div class="flex items-center gap-1 text-[var(--text-secondary)] text-sm">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              {{ project.stars }}
            </div>
          </div>
          <h3 class="text-base font-bold text-[var(--text-primary)] mb-2">{{ project.title }}</h3>
          <p class="text-sm text-[var(--text-secondary)] leading-relaxed flex-1 mb-4">{{ project.desc }}</p>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="tag in project.tags" :key="tag" class="text-xs px-2 py-0.5 rounded-md border" :style="{ background: 'rgba(34, 211, 238, 0.05)', color: 'var(--color-accent-primary)', borderColor: 'rgba(34, 211, 238, 0.12)' }">{{ tag }}</span>
          </div>
        </div>
      </BaseCard>
    </div>
  </section>
</template>
