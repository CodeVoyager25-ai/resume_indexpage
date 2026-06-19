<script setup>
import BaseCard from '../ui/BaseCard.vue'
import { abilities } from '../../config/userProfile.js'
</script>

<template>
  <section class="mb-12">
    <!-- Section Divider -->
    <div class="section-divider">
      <span class="divider-title">我的能力</span>
      <span class="dash-line" />
      <span class="seq-num">03</span>
    </div>

    <!-- 2-Column Card Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      <BaseCard
        v-for="ability in abilities"
        :key="ability.title"
        padding="p-7"
        class="flex flex-col justify-between min-h-[240px]"
      >
        <!-- Icon -->
        <div class="mb-5">
          <svg class="w-9 h-9 mb-5" style="color: var(--color-accent-primary);" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 13a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z"/>
          </svg>

          <!-- Title + Desc -->
          <h3 class="text-lg font-bold text-[var(--text-primary)] mb-3">{{ ability.title }}</h3>
          <p class="text-sm text-[var(--text-secondary)] mb-5 leading-relaxed">{{ ability.desc }}</p>

          <!-- Tech List -->
          <div class="flex flex-col gap-2 text-sm text-[var(--text-secondary)]">
            <span v-for="item in ability.list" :key="item" class="flex items-center gap-2">
              <span class="w-1 h-1 rounded-full" style="background: var(--color-accent-primary);" />
              {{ item }}
            </span>
          </div>
        </div>

        <!-- 了解更多 -->
        <a
          href="#"
          class="text-xs font-bold tracking-wider uppercase mt-5 flex items-center gap-1.5 hover:underline cursor-pointer transition-all duration-200"
          :style="{ color: 'var(--color-accent-primary)' }"
        >
          了解更多
          <svg class="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </a>
      </BaseCard>
    </div>
  </section>
</template>
