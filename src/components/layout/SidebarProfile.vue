<script setup>
import { profile, infoItems, socialLinks } from '../../config/userProfile.js'
</script>

<template>
  <aside class="hidden md:block w-[320px] flex-shrink-0">
    <div class="glass-card p-8 flex flex-col items-center rounded-2xl sticky top-24">
      <!-- Avatar -->
      <div class="w-24 h-24 rounded-full border-2 mb-4 overflow-hidden" :style="{ borderColor: 'var(--border-glow)' }">
        <img
          :src="profile.avatar"
          :alt="profile.avatarAlt"
          class="w-full h-full rounded-full object-cover"
        />
      </div>

      <!-- Name & Signature -->
      <h2 class="text-xl font-bold tracking-wide mb-2 cursor-blink" :style="{ color: 'var(--text-primary)' }">{{ profile.username }}</h2>
      <p class="text-xs text-[var(--text-secondary)] font-mono mb-6">{{ profile.signature }}</p>

      <!-- Dashed Divider -->
      <div class="w-full border-t border-dashed my-4" :style="{ borderColor: 'var(--border-glow)' }" />

      <!-- Social Icons -->
      <div class="flex justify-center gap-5 text-[var(--text-secondary)] my-2">
        <a
          v-for="link in socialLinks"
          :key="link.name"
          :href="link.url"
          :title="link.name"
          target="_blank"
          class="w-9 h-9 rounded-lg flex items-center justify-center hover:text-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary)]/10 transition-all duration-200"
          v-html="link.svg"
        />
      </div>

      <!-- Dashed Divider -->
      <div class="w-full border-t border-dashed my-4" :style="{ borderColor: 'var(--border-glow)' }" />

      <!-- Information Grid -->
      <div class="w-full flex flex-col gap-3 text-sm px-2">
        <div
          v-for="item in infoItems"
          :key="item.label"
          class="flex justify-between items-center w-full"
        >
          <span class="text-[var(--text-secondary)] text-left">{{ item.label }}</span>
          <span class="text-right" :style="{ color: 'var(--text-primary)' }">{{ item.value }}</span>
        </div>
      </div>

      <!-- CTA Button -->
      <a
        :href="`mailto:${profile.email}`"
        class="w-[85%] mt-6 py-3 px-6 rounded-full text-center font-medium shadow-md transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
        style="background: var(--color-accent-primary); box-shadow: 0 4px 20px rgba(34, 211, 238, 0.25); color: white;"
      >
        联系我
      </a>

      <!-- Footer -->
      <p class="text-xs mt-4" :style="{ color: 'var(--text-secondary)' }">
        &copy; 2026 {{ profile.copyright }}
      </p>
    </div>
  </aside>
</template>
