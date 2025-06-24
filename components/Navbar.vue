<template>
  <header class="header" ref="headerRef">
    <div class="logo">📱 Dimensio Compare</div>
    <div :class="['nav-container', { active: isMenuOpen }]">
      <nav class="nav">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/compare">Compare</NuxtLink>
        <NuxtLink to="/3d-view">3D View</NuxtLink>
        <NuxtLink to="/reviews">Reviews</NuxtLink>
        <!-- <NuxtLink to="/database">Database</NuxtLink> -->
        <!-- <NuxtLink to="/contact">Contact</NuxtLink> -->
      </nav>
      <button class="theme-toggle" @click="toggleTheme" :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
        {{ isDark ? '☀️' : '🌙' }}
      </button>
    </div>
    <button class="hamburger" @click="toggleMenu">☰</button>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import useTheme from '~/composables/useTheme';

const { isDark, toggleTheme } = useTheme();
const isMenuOpen = ref(false);
const headerRef = ref(null);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleClickOutside = (event) => {
  if (headerRef.value && !headerRef.value.contains(event.target)) {
    isMenuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg-secondary);
  box-shadow: 0 2px 8px var(--shadow-color);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--accent-color);
}

.nav-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.theme-toggle {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s;
  min-width: 48px;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  background: var(--hover-bg);
}

.hamburger {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-secondary);
  cursor: pointer;
  min-width: 48px;
  min-height: 48px;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav a {
  color: var(--text-secondary);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background 0.2s;
}

.nav a:hover {
  background: var(--hover-bg);
}

@media (max-width: 768px) {
  .hamburger {
    display: block;
  }
  .nav-container {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--bg-secondary);
    padding: 1rem;
    flex-direction: column;
    align-items: stretch;
    z-index: 200;
  }
  .nav-container.active {
    display: flex;
  }
  .nav {
    flex-direction: column;
    gap: 0.5rem;
  }
  .theme-toggle {
    align-self: center;
    margin-top: 1rem;
  }
}
</style> 