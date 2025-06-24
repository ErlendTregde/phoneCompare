<template>
  <div class="reviews-page">
    <h1>Reviews</h1>
    <p>Phone reviews coming soon!</p>
    <nav>
      <NuxtLink to="/compare">Go to Comparison</NuxtLink> |
      <NuxtLink to="/">Home</NuxtLink>
    </nav>
  </div>
</template>

<script setup>
// Placeholder only
</script>

<style scoped>
.reviews-page {
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