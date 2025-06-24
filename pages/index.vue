<template>
  <div class="landing-page">
    <h1>Welcome to Phones Compare</h1>
    <p>Compare phones, see 3D models, and read reviews.</p>
    <nav>
      <NuxtLink to="/compare">Go to Comparison</NuxtLink> |
      <NuxtLink to="/3d-view">3D View</NuxtLink> |
      <NuxtLink to="/reviews">Reviews</NuxtLink>
    </nav>
  </div>
</template>

<script setup>
// No logic needed for a simple landing page
</script>

<style scoped>
.landing-page {
  text-align: center;
  padding: 3rem 1rem;
}
nav {
  margin-top: 2rem;
  font-size: 1.2rem;
}
nav a {
  margin: 0 0.5em;
  color: #2196f3;
  text-decoration: none;
  font-weight: 500;
}
nav a:hover {
  text-decoration: underline;
}
</style> 