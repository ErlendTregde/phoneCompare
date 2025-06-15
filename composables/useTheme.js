import { ref, watch } from 'vue'

export default function useTheme() {
  const isDark = ref(true)
  
  // Initialize theme from localStorage if available
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    }
  }

  // Watch for theme changes and update localStorage and document class
  watch(isDark, (newValue) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newValue ? 'dark' : 'light')
      document.documentElement.classList.toggle('light-theme', !newValue)
    }
  }, { immediate: true })

  function toggleTheme() {
    isDark.value = !isDark.value
  }

  return {
    isDark,
    toggleTheme
  }
} 