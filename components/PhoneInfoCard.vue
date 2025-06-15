<template>
  <div class="phone-info-card-inner">
    <div class="phone-name">
      <span class="color-indicator" :style="{ backgroundColor: color }"></span>
      {{ phone.brand }} {{ phone.model }}
      <span class="remove-x" @click="onRemove && onRemove()" title="Remove">×</span>
    </div>
    <div class="phone-specs">
      {{ phone.dimensions.height_mm }} × {{ phone.dimensions.width_mm }} × {{ phone.dimensions.depth_mm }} mm • {{ phone.dimensions.weight_g }}g
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  phone: { type: Object, required: true },
  color: { type: String, required: true },
  onRemove: { type: Function, default: null }
})
</script>

<style scoped>
.phone-info-card-inner {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  white-space: nowrap;
  z-index: 10;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  box-shadow: 0 2px 8px var(--shadow-color);
}
.phone-name {
  font-weight: bold;
  color: var(--text-primary) !important;
  text-shadow: none;
  display: flex;
  align-items: center;
  gap: 0.5em;
}
.remove-x {
  color: var(--text-tertiary);
  font-size: 1.2em;
  margin-left: 0.5em;
  cursor: pointer;
  transition: color 0.2s;
  opacity: 0.5;
}
.phone-name:hover .remove-x {
  color: #ff4a4a;
  opacity: 1;
}
.color-indicator {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 10px;
  display: inline-block;
  box-shadow: 0 1px 4px rgba(0,0,0,0.25);
  vertical-align: middle;
}
.phone-specs {
  color: var(--text-tertiary);
  font-size: 0.8rem;
}
</style> 