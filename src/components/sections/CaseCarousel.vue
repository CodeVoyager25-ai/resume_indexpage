<script setup>
import BaseCard from '../ui/BaseCard.vue'
import { cases } from '../../config/userProfile.js'
</script>

<template>
  <section class="mb-10">
    <!-- Section Divider -->
    <div class="section-divider">
      <span class="divider-title">最近案例</span>
      <span class="dash-line" />
      <span class="seq-num">04</span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <BaseCard
        v-for="item in cases"
        :key="item.title"
        padding="p-5"
      >
        <div class="flex items-start gap-4">
          <div
            class="w-1 h-full min-h-[80px] rounded-full flex-shrink-0 mt-1"
            :style="{ background: 'linear-gradient(180deg, var(--color-accent-primary), rgba(34,211,238,0.06))' }"
          />
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <h3 class="text-base font-bold text-[var(--text-primary)]">{{ item.title }}</h3>
              <span
                v-if="item.tag"
                class="text-xs px-2 py-0.5 rounded-md border"
                :style="{ background: 'rgba(34, 211, 238, 0.06)', color: 'var(--color-accent-primary)', borderColor: 'rgba(34, 211, 238, 0.12)' }"
              >{{ item.tag }}</span>
            </div>
            <p class="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">{{ item.desc }}</p>
            <span class="text-xs font-code text-slate-500">{{ item.tech }}</span>
          </div>
        </div>
      </BaseCard>
    </div>

    <div class="mt-4 text-center">
      <router-link
        to="/projects"
        class="text-sm hover:underline transition-colors"
        :style="{ color: 'var(--color-accent-primary)' }"
      >
        查看全部案例 →
      </router-link>
    </div>
  </section>
</template>
