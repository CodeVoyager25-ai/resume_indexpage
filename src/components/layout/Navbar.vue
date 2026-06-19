<script setup>
import { useGlobalStore } from '../../store/global.js'
import { useRoute } from 'vue-router'

const store = useGlobalStore()
const route = useRoute()

const navItems = [
  { path: '/', label: '主页' },
  { path: '/projects', label: '项目' },
  { path: '/experience', label: '经历' },
  { path: '/blog', label: '开源' },
  { path: '/gallery', label: '相册' },
]

function closeMenuAndNavigate() {
  store.closeMobileMenu()
}
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 w-full h-16 px-4 md:px-8 flex justify-between items-center backdrop-blur-md"
    :style="{ background: 'var(--color-space-bg)', opacity: '0.85', borderBottom: '1px solid var(--border-glow)' }"
  >
    <!-- Left: Back arrow + Title -->
    <div class="flex items-center gap-3 shrink-0">
      <router-link
        to="/"
        class="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </router-link>
      <span class="text-base font-medium text-[var(--text-primary)] hidden sm:inline">
        个人简历
      </span>
    </div>

    <!-- Right: Nav Links + Theme Toggle -->
    <div class="flex items-center">
      <!-- Desktop Nav Links -->
      <nav class="hidden md:flex items-center gap-8">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          @click="closeMenuAndNavigate"
          class="relative text-sm font-medium transition-colors duration-200 pb-1"
          active-class="text-[var(--text-primary)]"
          inactive-class="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          {{ item.label }}
          <!-- Active indicator -->
          <span
            v-if="route.path === item.path"
            class="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
            style="background: var(--color-accent-primary);"
          />
        </router-link>
      </nav>

      <!-- Theme Toggle -->
      <button
        @click="store.toggleTheme()"
        class="relative ml-6 w-14 h-7 rounded-full transition-all duration-300 flex items-center px-1"
        :class="store.isDark ? 'bg-white/10' : 'bg-gray-200'"
      >
        <!-- Sun icon -->
        <svg
          class="w-4 h-4 absolute left-1.5 transition-all duration-300"
          :class="store.isDark ? 'opacity-30' : 'opacity-100'"
          fill="none" stroke="#F59E0B" stroke-width="2" viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="5"/><path stroke-linecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
        <!-- Moon icon -->
        <svg
          class="w-4 h-4 absolute right-1.5 transition-all duration-300"
          :class="store.isDark ? 'opacity-100' : 'opacity-30'"
          fill="none" stroke="#6366F1" stroke-width="2" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
        </svg>
        <!-- Slider knob -->
        <div
          class="w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 absolute"
          :class="store.isDark ? 'left-1' : 'left-8'"
        />
      </button>

      <!-- Mobile Hamburger -->
      <button
        class="md:hidden flex flex-col gap-1.5 p-2 ml-2"
        @click="store.toggleMobileMenu()"
        aria-label="Toggle menu"
      >
        <span class="block w-5 h-0.5 bg-[var(--text-primary)] transition-all duration-300" :class="{ 'rotate-45 translate-y-[5px]': store.mobileMenuOpen }" />
        <span class="block w-5 h-0.5 bg-[var(--text-primary)] transition-all duration-200" :class="{ 'opacity-0': store.mobileMenuOpen }" />
        <span class="block w-5 h-0.5 bg-[var(--text-primary)] transition-all duration-300" :class="{ '-rotate-45 -translate-y-[5px]': store.mobileMenuOpen }" />
      </button>
    </div>
  </header>

  <!-- Mobile Drawer Menu -->
  <transition name="drawer-slide">
    <nav
      v-if="store.mobileMenuOpen"
      class="md:hidden fixed top-16 left-0 right-0 z-40 py-3 px-4"
      :style="{ background: 'var(--color-space-bg)', borderBottom: '1px solid var(--border-glow)' }"
    >
      <ul class="flex flex-col gap-1">
        <li v-for="item in navItems" :key="item.path">
          <router-link
            :to="item.path"
            @click="closeMenuAndNavigate"
            class="block w-full text-left py-3 px-4 rounded-lg text-base transition-all duration-200"
            active-class="bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] font-semibold"
            inactive-class="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5"
          >
            {{ item.label }}
          </router-link>
        </li>
      </ul>
    </nav>
  </transition>
</template>

<style scoped>
.drawer-slide-enter-active { transition: all 0.3s ease; }
.drawer-slide-leave-active { transition: all 0.2s ease; }
.drawer-slide-enter-from { opacity: 0; transform: translateY(-16px); }
.drawer-slide-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
