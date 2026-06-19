<script setup>
import { ref, onMounted } from 'vue'
import BaseCard from '../ui/BaseCard.vue'
import { timelineItems } from '../../config/userProfile.js'

const visibleItems = ref(new Array(timelineItems.length).fill(false))

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.dataset.index)
          setTimeout(() => { visibleItems.value[index] = true }, index * 150)
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 }
  )
  document.querySelectorAll('.timeline-item').forEach((el) => observer.observe(el))
})
</script>

<template>
  <section>
    <div class="section-divider">
      <span class="divider-title">学习与实践历程</span>
      <span class="dash-line" />
      <span class="seq-num">01</span>
    </div>
    <p class="text-[var(--text-secondary)] mb-6 -mt-3 text-sm">我的学习成长与技术积累之路。</p>

    <div class="relative">
      <div class="absolute left-5 top-0 bottom-0 w-px hidden md:block" :style="{ background: 'linear-gradient(180deg, rgba(34, 211, 238, 0.25), transparent)' }" />

      <div class="flex flex-col gap-4">
        <div
          v-for="(item, index) in timelineItems" :key="index"
          :data-index="index"
          class="timeline-item transition-all duration-500"
          :class="{ 'opacity-100 translate-x-0': visibleItems[index], 'opacity-0 -translate-x-4': !visibleItems[index] }"
        >
          <BaseCard padding="p-5">
            <div class="flex gap-4">
              <div class="hidden md:flex items-start pt-1 flex-shrink-0">
                <div class="w-2.5 h-2.5 rounded-full mt-1.5" :style="{ background: 'var(--color-accent-primary)', boxShadow: '0 0 12px var(--color-accent-primary)' }" />
              </div>
              <div class="flex-1">
                <span class="text-xs font-code px-2 py-0.5 rounded-md inline-block mb-2 border" :style="{ background: 'rgba(34, 211, 238, 0.06)', color: 'var(--color-accent-primary)', borderColor: 'rgba(34, 211, 238, 0.12)' }">{{ item.year }}</span>
                <h3 class="text-base font-bold text-[var(--text-primary)] mb-1">{{ item.title }}</h3>
                <p class="text-sm font-medium mb-2" :style="{ color: 'var(--color-accent-primary)' }">{{ item.company }}</p>
                <p class="text-sm text-[var(--text-secondary)] leading-relaxed">{{ item.desc }}</p>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
  </section>
</template>
