import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useGlobalStore = defineStore('global', () => {
  const mobileMenuOpen = ref(false)
  const isMobile = ref(window.innerWidth < 768)
  const isDark = ref(true)

  // Apply theme to document
  function applyTheme() {
    if (isDark.value) {
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    }
  }

  // Init theme
  applyTheme()
  watch(isDark, applyTheme)

  function toggleTheme() {
    isDark.value = !isDark.value
  }

  function toggleMobileMenu() {
    mobileMenuOpen.value = !mobileMenuOpen.value
  }

  function closeMobileMenu() {
    mobileMenuOpen.value = false
  }

  function checkMobile() {
    isMobile.value = window.innerWidth < 768
    if (!isMobile.value) {
      mobileMenuOpen.value = false
    }
  }

  return {
    mobileMenuOpen,
    isMobile,
    isDark,
    toggleTheme,
    toggleMobileMenu,
    closeMobileMenu,
    checkMobile,
  }
})
