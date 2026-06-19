<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useGlobalStore } from './store/global.js'
import CustomCanvasBg from './components/layout/CustomCanvasBg.vue'
import Navbar from './components/layout/Navbar.vue'
import SidebarProfile from './components/layout/SidebarProfile.vue'

const store = useGlobalStore()

function handleResize() {
  store.checkMobile()
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div
    class="min-h-screen relative transition-colors duration-400"
    :style="{ backgroundColor: 'var(--color-space-bg)', color: 'var(--text-primary)' }"
  >
    <!-- Particle Background -->
    <CustomCanvasBg />

    <!-- Content Layer -->
    <div class="relative z-10 flex flex-col md:flex-row min-h-screen">
      <!-- Top Navbar -->
      <Navbar />

      <!-- Left Sidebar + Right Content (flex row with gap) -->
      <div class="flex w-full md:flex-row gap-8 md:pl-8 lg:pl-12" style="padding-top: 7rem;">
        <!-- Left Sidebar -->
        <SidebarProfile />

        <!-- Right Content Area -->
        <main class="flex-1 main-content overflow-y-auto" style="padding-bottom: 3rem;">
          <router-view v-slot="{ Component }">
            <transition name="page-fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </main>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <transition name="overlay-fade">
      <div
        v-if="store.mobileMenuOpen"
        class="fixed inset-0 bg-black/60 z-30 md:hidden"
        @click="store.closeMobileMenu()"
      />
    </transition>
  </div>
</template>

<style scoped>
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.page-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.25s ease;
}
.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}

/* Responsive main content padding */
.main-content {
  padding-left: 1rem;
  padding-right: 1rem;
}
@media (min-width: 768px) {
  .main-content {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>
