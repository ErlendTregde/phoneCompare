<template>
  <div class="comparison-toolbar">
    <button class="toggle-btn" :class="{ active: showDimensions }" @click="$emit('toggle-dimensions')">
      {{ showDimensions ? 'Hide' : 'Show' }} Dimensions
    </button>
    <div class="size-slider-group">
      <span class="size-label">Size</span>
      <button class="slider-btn" @click="$emit('decrease-size')">-</button>
      <input type="range" min="0" max="200" step="1" :value="sizePercent" @input="$emit('set-size', $event.target.value)" />
      <button class="slider-btn" @click="$emit('increase-size')">+</button>
      <span class="size-value">{{ sizePercent }}%</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  showDimensions: Boolean,
  sizePercent: Number
})
defineEmits(['toggle-dimensions', 'set-size', 'increase-size', 'decrease-size'])
</script>

<style scoped>
.comparison-toolbar {
  width: 100%;
  margin-bottom: 3.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;
  justify-content: center;
}
@media (max-width: 700px) {
  .comparison-toolbar {
    margin-bottom: 5rem;
  }
}
.size-slider-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.size-label {
  color: #aaa;
  font-size: 0.97em;
  margin-right: 0.3em;
}
.slider-btn {
  background: #232a36;
  border: 1px solid #444;
  color: #fff;
  font-size: 1.1em;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.18s, border 0.18s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.slider-btn:hover {
  background: #4a9eff;
  color: #222;
  border-color: #4a9eff;
}
input[type="range"] {
  width: 90px;
  accent-color: #4a9eff;
  background: #444;
  border-radius: 2px;
  height: 2px;
}
.size-value {
  color: #aaa;
  font-size: 0.97em;
  margin-left: 0.3em;
}
</style> 