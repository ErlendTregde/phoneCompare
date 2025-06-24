<template>
  <div>
    <div class="phones-row">
      <PhoneShape v-for="id in selectedPhones" :key="id" :phone="phoneData[id]" :color="colorMap[id]" :view="viewMode"
        :scale="scaleMode" :show-dimensions="showDimensions" />
    </div>
  </div>
</template>

<script setup>
import PhoneShape from './PhoneShape.vue'
const props = defineProps({
  phoneData: Object,
  selectedPhones: Array,
  viewMode: String,
  scaleMode: String,
  showDimensions: Boolean,
  colorMap: Object
})
</script>

<style scoped>
.phones-row {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}
@media (max-width: 900px) {
  .phones-row {
    gap: 1.5rem;
    padding: 1rem 0.5rem;
  }
}
@media (max-width: 700px) {
  .phones-row {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem 0.5rem;
    align-items: center;
  }
}
</style> 