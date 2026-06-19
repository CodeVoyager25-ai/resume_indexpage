<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import BaseCard from '../ui/BaseCard.vue'
import { heroStats } from '../../config/userProfile.js'

const stats = heroStats
const displayValues = ref(heroStats.map((s) => '0' + s.suffix))

onMounted(() => {
  stats.forEach((stat, index) => {
    const counter = { val: 0 }
    gsap.to(counter, {
      duration: 1.2,
      val: stat.target,
      snap: { val: 1 },
      delay: 0.3 + index * 0.2,
      ease: 'power2.out',
      onUpdate() {
        displayValues.value[index] = Math.round(counter.val) + stat.suffix
      },
      onComplete() {
        displayValues.value[index] = stat.target + stat.suffix
      },
    })
  })
})
</script>

<template>
  <section class="mb-10">
    <!-- Hero Banner with Aurora Video -->
    <div class="w-full h-[200px] md:h-[240px] rounded-2xl overflow-hidden shadow-lg mb-8 relative">
      <!-- Video Background -->
      <video
        class="absolute inset-0 w-full h-full object-cover"
        src="/mp4/aurora.mp4"
        autoplay
        loop
        muted
        playsinline
      />
      <!-- Dark overlay for text readability -->
      <div class="absolute inset-0 bg-[#050a0f]/50" />
      <!-- Subtle gradient overlays -->
      <div class="absolute inset-0" style="background: linear-gradient(135deg, rgba(34,211,238,0.08) 0%, transparent 40%, rgba(167,139,250,0.06) 100%);" />
      <div class="absolute left-0 bottom-0 w-48 h-px opacity-30"
        style="background: linear-gradient(90deg, rgba(34,211,238,0.6), transparent);" />
    </div>

    <!-- Welcome Text -->
    <div class="mb-6">
      <p class="text-xs font-code text-[var(--color-accent-primary)] mb-2 tracking-widest uppercase">&gt; hello_world.hex</p>
      <h1 class="text-2xl md:text-4xl font-bold text-[var(--text-primary)]">
        你好，我是 <span :style="{ color: 'var(--color-accent-primary)' }">wenzheng Li</span>
      </h1>
      <p class="text-sm md:text-base text-[var(--text-secondary)] mt-2 max-w-lg leading-relaxed">
        嵌入式与边缘AI开发者 / 专注于物联网、底层驱动与智能硬件系统
      </p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-3 gap-3 mb-6">
      <BaseCard v-for="(stat, idx) in stats" :key="stat.label" padding="p-4 md:p-5">
        <div class="text-center">
          <span class="text-xl md:text-2xl">{{ stat.icon }}</span>
          <div
            class="text-2xl md:text-3xl font-bold mt-1.5 font-code"
            :style="{ color: 'var(--color-accent-primary)' }"
          >{{ displayValues[idx] }}</div>
          <div class="text-xs text-[var(--text-secondary)] mt-1">{{ stat.label }}</div>
        </div>
      </BaseCard>
    </div>
  </section>
</template>
