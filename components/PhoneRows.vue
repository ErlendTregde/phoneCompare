<template>
  <div>
    <div class="phones-row">
      <PhoneShape v-for="id in topRow" :key="id" :phone="phoneData[id]" :color="colorMap[id]" :view="viewMode"
        :scale="scaleMode" :show-dimensions="showDimensions" />
    </div>
    <div v-if="bottomRow.length" class="phones-row bottom-row">
      <PhoneShape v-for="id in bottomRow" :key="id" :phone="phoneData[id]" :color="colorMap[id]" :view="viewMode"
        :scale="scaleMode" :show-dimensions="showDimensions" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PhoneShape from './PhoneShape.vue'
const props = defineProps({
  phoneData: Object,
  selectedPhones: Array,
  viewMode: String,
  scaleMode: String,
  showDimensions: Boolean,
  colorMap: Object
})
const topRow = computed(() => props.selectedPhones.slice(0, 3))
const bottomRow = computed(() => props.selectedPhones.slice(3, 6))
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
.bottom-row {
  margin-top: 2.7rem;
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