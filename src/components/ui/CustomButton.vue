<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'outline', 'ghost'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
  href: { type: String, default: '' },
  to: { type: String, default: '' },
})

defineEmits(['click'])
</script>

<template>
  <component
    :is="href ? 'a' : to ? 'router-link' : 'button'"
    :href="href || undefined"
    :to="to || undefined"
    class="inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 hover:-translate-y-0.5"
    :class="[
      variant === 'primary' ? 'bg-gradient-to-r from-[#00B4D8] to-[#00B4D8]/70 text-white shadow-lg shadow-[#00B4D8]/20 hover:shadow-[#00B4D8]/40' : '',
      variant === 'outline' ? 'border border-[#00B4D8]/40 text-[#00B4D8] hover:bg-[#00B4D8]/10 hover:border-[#00B4D8]' : '',
      variant === 'ghost' ? 'text-[#A0AEC0] hover:text-white hover:bg-white/5' : '',
      size === 'sm' ? 'px-3 py-1.5 text-sm' : '',
      size === 'md' ? 'px-5 py-2.5 text-sm' : '',
      size === 'lg' ? 'px-6 py-3 text-base' : '',
    ]"
    @click="$emit('click')"
  >
    <slot />
  </component>
</template>
