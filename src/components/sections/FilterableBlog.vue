<script setup>
import { ref, computed } from 'vue'
import BaseCard from '../ui/BaseCard.vue'
import { githubRepos } from '../../config/userProfile.js'

const activeTag = ref('全部')
const filterTags = ['全部', 'C & Embedded', 'Web & Fullstack', 'IoT']

const filteredRepos = computed(() => {
  if (activeTag.value === '全部') return githubRepos
  return githubRepos.filter((r) => r.tags.includes(activeTag.value))
})
</script>

<template>
  <section>
    <div class="section-divider">
      <span class="divider-title">GitHub 开源视窗</span>
      <span class="dash-line" />
      <span class="seq-num">05</span>
    </div>
    <p class="text-[var(--text-secondary)] mb-6 -mt-3 text-sm">我的开源项目仓库集锦，持续更新中。</p>

    <div class="flex flex-wrap gap-2 mb-6">
      <button
        v-for="tag in filterTags" :key="tag" @click="activeTag = tag"
        class="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
        :class="activeTag === tag
          ? 'bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/20'
          : 'text-[var(--text-secondary)] border border-white/5 hover:text-[var(--text-primary)] hover:border-white/10'"
      >{{ tag === '全部' ? '全部' : tag }}</button>
    </div>

    <div class="flex flex-col gap-4">
      <BaseCard v-for="repo in filteredRepos" :key="repo.name" padding="p-5">
        <article>
          <div class="flex items-center gap-3 mb-2">
            <div class="flex items-center gap-1.5">
              <svg class="w-4 h-4 text-[var(--text-secondary)]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
              </svg>
              <a
                :href="`https://github.com/aishaliwen99/${repo.name}`"
                target="_blank"
                class="text-base font-bold text-[var(--text-primary)] hover:text-[var(--color-accent-primary)] transition-colors"
              >{{ repo.name }}</a>
            </div>
            <span class="text-xs px-2 py-0.5 rounded-full font-medium border border-white/10 text-[var(--text-secondary)]">Public</span>
          </div>
          <p class="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">{{ repo.desc }}</p>
          <div class="flex items-center gap-3 flex-wrap">
            <span class="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
              <span class="w-2.5 h-2.5 rounded-full inline-block" :style="{ background: repo.langColor }" />
              {{ repo.lang }}
            </span>
            <span class="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              {{ repo.stars }}
            </span>
            <span class="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
              {{ repo.forks }}
            </span>
          </div>
        </article>
      </BaseCard>
    </div>
  </section>
</template>
