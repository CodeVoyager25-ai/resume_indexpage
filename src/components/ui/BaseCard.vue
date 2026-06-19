<script setup>
defineProps({
  hoverable: {
    type: Boolean,
    default: true,
  },
  padding: {
    type: String,
    default: 'p-6',
  },
})
</script>

<template>
  <div
    class="glass-card"
    :class="[padding, { 'cursor-pointer': hoverable }]"
  >
    <slot />
  </div>
</template>
