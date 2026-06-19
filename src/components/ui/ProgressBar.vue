<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  percent: { type: Number, required: true },
  delay: { type: Number, default: 0 },
})

const barRef = ref(null)
const width = ref(0)
const animated = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            animated.value = true
            width.value = props.percent
          }, props.delay)
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 }
  )

  if (barRef.value) {
    observer.observe(barRef.value)
  }
})
</script>

<template>
  <div ref="barRef" class="mb-4">
    <div class="flex justify-between mb-2">
      <span class="text-sm text-[var(--text-secondary)]">{{ label }}</span>
      <span class="text-sm font-code" :style="{ color: 'var(--color-accent-primary)' }">{{ animated ? percent : 0 }}%</span>
    </div>
    <div class="h-2 rounded-full overflow-hidden" style="background: var(--border-glow);">
      <div
        class="h-full rounded-full transition-all duration-[1.5s] ease-out"
        :style="{
          width: animated ? `${width}%` : '0%',
          background: 'linear-gradient(90deg, var(--color-accent-primary), var(--color-accent-green))',
        }"
      />
    </div>
  </div>
</template>
